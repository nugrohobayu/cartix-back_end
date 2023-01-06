import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from 'src/events/entity/events.entity';
import { Kategori } from 'src/events/entity/kategori.entity';
import { Users } from 'src/users/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ApprovedDto } from './dto/approved.orders.dto';
import { BankPenyelenggaraDto } from './dto/bankPenyelenggara.dto';
import { OrdersDto } from './dto/orders.dto';
import { PembayaranDto } from './dto/pembayaran.dto';
import { RejectedStatusDto } from './dto/rejected.status.dto';
import { BankPenyelenggara } from './entity/bankPenyelenggara.entity';
import { Carts } from './entity/cart.entity';
import { Orders } from './entity/order.entity';
import { Pembayaran } from './entity/pembayaran.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Pembayaran) private pembayaranRepository: Repository<Pembayaran>,
        @InjectRepository(BankPenyelenggara) private bankPenyelenggara: Repository<BankPenyelenggara>,
        @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
        @InjectRepository(Events) private eventRepository: Repository<Events>,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Kategori) private kategoriRepository: Repository<Kategori>,
        @InjectRepository(Carts) private cartsRepository: Repository<Carts>
    ) {}

    async addPembayaran(id_orders: string, pembayaranDto: PembayaranDto) {
        const order = await this.ordersRepository.findOneOrFail({
            where: {
                id_orders: id_orders
            }
        })
        const hasil = new Pembayaran()
        hasil.nama_pengirim = pembayaranDto.nama_pengirim
        hasil.nominal = pembayaranDto.nominal
        hasil.bukti_pembayaran = pembayaranDto.bukti_pembayaran
        hasil.orders = order
        await this.pembayaranRepository.insert(hasil)
        return this.pembayaranRepository.findOneOrFail({
            where: {
                id_pembayaran: hasil.id_pembayaran
            }
        })

    }

    async addBankPenyelenggara(id_users: string, bankPenyelenggaraDto: BankPenyelenggaraDto) {
        const user = await this.usersRepository.findOneOrFail({
            where: {
                id_users: id_users
            }
        });
        const hasil = new BankPenyelenggara()
        hasil.nama_bank = bankPenyelenggaraDto.nama_bank
        hasil.bank_akun = bankPenyelenggaraDto.bank_akun
        hasil.atas_nama = bankPenyelenggaraDto.atas_nama
        hasil.users = user
        await this.bankPenyelenggara.insert(hasil)
        return this.bankPenyelenggara.findOneOrFail({
            where: {
                id_bank_penyelenggara: hasil.id_bank_penyelenggara
            }
        })
        }

        idCart(id_users: string) {
            return this.cartsRepository.findAndCount({
                where: {
                    user: {id_users}
                }
            })
        }
    

        async totalPrice(id: string) {
            const total = await this.ordersRepository.find({
                where: [{status: 'Dipesan'}, {users: {id_users: id}}]
            })
            const arr = []
            total.map(result => arr.push(result.total_harga))
            const totalPrice = await arr.reduce((a, b) => a + b)
            return totalPrice
        }

        async cart(id_users: string, id_orders: string) {
            try{
                const user = await this.usersRepository.findOneOrFail({
                    where: {id_users}
                })
                const order = await this.ordersRepository.findOneOrFail({
                    where: {id_orders}
                })
                const result = new Carts()
                result.user = user
                result.order = order
                await this.cartsRepository.insert(result)
                return "Berhasil"
            }catch(err){
                throw new err
            }
        }
    
    
    

    async pembayaranByIdEvents(id_events: string){
        return this.pembayaranRepository.find({
            relations: {orders: {events: true}},
            where: {orders: {events: {
                id_events: id_events
            }}}
        })
    }

        // async pembayaranByIdOrders

    async addOrders(id_kategori: string, id_events: string, id_users: string, ordersDto: OrdersDto) {
        const event = await this.eventRepository.findOne({
            where: {
                id_events: id_events
            }
        })
        const user = await this.usersRepository.findOne({
            where: {
                id_users: id_users
            }
        })
        const kategori = await this.kategoriRepository.findOne({
            where: {
                id_kategori: id_kategori
            }
        })
        const arr = []
        const hargaTiket = await this.kategoriRepository.find({
            where: {id_kategori: id_kategori}
        })
        hargaTiket.map(hasil => arr.push(hasil.harga_tiket))
        const result = new Orders()
        result.status = ordersDto.status
        result.waktu_pemesanan = ordersDto.waktu_pemesanan
        result.kuantitas = ordersDto.kuantitas
        const hitung = arr[0] * result.kuantitas
        result.total_harga = hitung
        result.events = event
        result.users = user
        result.kategori = kategori
        await this.ordersRepository.insert(result)
        return this.ordersRepository.findOneOrFail({
            where: {
                id_orders: result.id_orders
            }
        });
    }

    async totalHargaByIdOrders(id_orders: string) {
        const totalHarga = await this.ordersRepository.find({
            where: {id_orders: id_orders}
        })

        const arr = []
        totalHarga.map(hasil => arr.push({hargaTiket: hasil.total_harga}))

        return arr
    }

    async getAllPembayaran() {
        return this.pembayaranRepository.findAndCount({
            relations: {orders: {kategori: true}}
        });
    }

    async pembayaranIdEvents(id_events: string){
        return this.pembayaranRepository.find({
            relations: {orders: {events: true}},
            where: {orders: {events: {id_events: id_events}}}
        })
    }

    async getAllBankPenyelenggara() {
        return this.bankPenyelenggara.findAndCount();
    }

    async getAllOrders(id_users) {
        return this.ordersRepository.find({
            relations: {events: true},
            where: {users: {
                id_users: id_users,
            },
            status: 'Approved'
        }
        });
    }

    async tiketTerjual(){
        const tiket = await this.ordersRepository.find()
        const arr = []
        tiket.map(jumlah => arr.push(jumlah.kuantitas))
        
        const jumlah = await arr.reduce((a, b) => a + b)
        
        return jumlah
    }

    async orderByIdEvents(id_events) {
        return this.ordersRepository.findAndCount({
            relations: {
                events: true
            },
            where: {
                events: {
                    id_events: id_events
                }
            }
        })
    }

    async orderIdEvents(id_events: string) {
        const order = await this.ordersRepository.find({
            relations: {events: true, users: true, kategori: true, pembayaran: true},
            where: {events: {id_events: id_events}}
        })
        console.log(order);
        // const pembayaran = []
        
        const arr = []

        order.map(hasil=> {
            const validasi = []
            hasil.pembayaran.map(result=> validasi.push(result.id_pembayaran))
            arr.push({
            
            namaPembeli: hasil.users.username,
            emailPembeli: hasil.users.email,
            nomorTlp: hasil.users.no_telepon,
            namaPenyelenggara: hasil.events.nama_penyelenggara,
            namaEvents: hasil.events.nama_event,
            fotoEvents: hasil.events.banner_event,
            alamatEvents: hasil.events.alamat,
            tanggalEvents: hasil.events.tanggal_event,
            totalHarga: hasil.total_harga,
            kategori: hasil.kategori.kategori,
            validasi: validasi,
            kuantitas: hasil.kuantitas
        })})

        return arr
    }

    ordersId(id: string) {
        return this.ordersRepository.findOneOrFail({
            where: {id_orders: id}
        })
    }


    async orderByIdUsers(id_users: string) {
        return this.ordersRepository.findAndCount({
            relations: {users: true},
            where: {users: {
                id_users: id_users
            }}
        })
    }

    

    async getPembayaranById(id_bank_penyelenggara: string) {
        try{
            const pembayaran = await this.pembayaranRepository.find({
                relations: {bankPenyelenggara: true, orders: {kategori: true}},
                where: {bankPenyelenggara: {
                    id_bank_penyelenggara: id_bank_penyelenggara
                }}
            })
            const arr = []
            pembayaran.map(hasil => arr.push({
                id_kategori: hasil.orders.kategori.id_kategori,
                id_pembayaran: hasil.id_pembayaran,
                id_orders: hasil.orders.id_orders,
                namaPengirim: hasil.nama_pengirim,
                nominal: hasil.nominal,
                buktiPembayaran: hasil.bukti_pembayaran,
                status: hasil.orders.status
            }))     
            return arr
        }catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: 'Data Not Found',
                    },
                    HttpStatus.NOT_FOUND,
                );
            } else {
                throw error;
            }
        }
    }

    async getDataPembayaranByIdOrder(id_orders: string){
        return await this.pembayaranRepository.findAndCount({
            relations: {
                orders: true
            },
            where: {
                orders: {
                    id_orders: id_orders
                }
            }
        })
    }

    async getBankPenyelenggaraById (id_bank_penyelenggara) {
        try {
            return await this.bankPenyelenggara.findOneOrFail({
                where: {
                    id_bank_penyelenggara,
                },
            });
        }catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: 'data not found',
                    },
                    HttpStatus.NOT_FOUND,
                );
            } else {
                throw error;
            }
        }
    }

    async getBankPenyelenggaraByIdUsers(id_users: string) {
        return await this.bankPenyelenggara.findAndCount({
            relations: {
                users: true
            },
            where: {
                users: {
                    id_users: id_users
                }
            }
        })
    }

    

    async jumlahPembayaran(){
        const jumlah = await this.ordersRepository.find()
        const arr = []
        jumlah.map(sum => arr.push(sum.total_harga))
        // console.log(arr);
        function penjumlahan(total, value){
            return total + value
        }
        // console.log(total);
        const hasil = arr.reduce(penjumlahan)

        return hasil

        // const summation = await arr.reduce((accumulator, currentValue) => accumulator + currentValue);
        // return summation
        
        
    }



    async approved(id_orders: any, id_kategori: string, approvedDto: ApprovedDto){
        await this.ordersRepository.findOneOrFail({
            where: {id_orders: id_orders}
        })
        const approved = approvedDto.status
        const hasil = await this.ordersRepository.findOneOrFail({
            where: {id_orders}
        })
        const jumlahTiket = await this.kategoriRepository.find({
            where: {id_kategori: id_kategori}
        })
        const arr = []
        const tiket = await jumlahTiket.map(hasil => arr.push(
            hasil.jumlah_tiket
        ))
        const kuantitas = await this.ordersRepository.find({
            where: {id_orders: id_orders}
        })
        const arrKuantitas = []
        const usertiket = await kuantitas.map(result => arrKuantitas.push(result.kuantitas))
        const pengurangan = await arr[0] - arrKuantitas[0]
        const result = await this.kategoriRepository.findOneOrFail({where: {id_kategori}})
        result.jumlah_tiket = pengurangan
        hasil.status = approved
        await this.kategoriRepository.update({id_kategori}, result)
        await this.ordersRepository.update({id_orders}, hasil)
        return this.ordersRepository.findOneOrFail({
            where: {id_orders}
        })
    }

    async rejectedStatus(id_orders: any, rejectedStatusDto: RejectedStatusDto){
        await this.ordersRepository.findOneOrFail({
            where: {id_orders: id_orders}
        })
        await this.pembayaranRepository.findOneOrFail({
            where: {orders: {id_orders: id_orders}}
        })
        const rejected = rejectedStatusDto.status
        const hasil = await this.ordersRepository.findOneOrFail({
            where: {id_orders}
        })
        hasil.status = rejected
        await this.ordersRepository.update({id_orders}, hasil)
        await this.ordersRepository.softDelete({id_orders})
        await this.pembayaranRepository.softDelete({orders: {id_orders}})
        return this.ordersRepository.findOneOrFail({
            where: {id_orders},
            withDeleted: true
        })
    }

    deleteBankPenyelenggara(id_bankPenyeleggara: string){
        return this.bankPenyelenggara.softDelete(id_bankPenyeleggara);
    }

    async deleteDataOrders(){
        return this.ordersRepository.softDelete({status: 'Dipesan'})
    }
}
