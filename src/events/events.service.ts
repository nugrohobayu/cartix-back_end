import { HttpException, HttpStatus, Injectable, NotFoundException, PipeTransform, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateExcel } from 'helper/export_excel';
import { Logger } from 'nestjs-pino';
import { async, map } from 'rxjs';
import { Orders } from 'src/payment/entity/order.entity';
import { Users } from 'src/users/entities/user.entity';
import { EntityNotFoundError, Like, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'
import { CreateEventsDto } from './dto/create.events.dto';
import { UpdateStatusEventsDto } from './dto/edit.events.dto';
import { GetEventsFilterDto } from './dto/eventFilter.dto';
import { KategoriDto } from './dto/kategori.dto';
import { UlasanDto } from './dto/ulasan.events.dto';
import { Events } from './entity/events.entity';
import { Kategori } from './entity/kategori.entity';
import { Ulasan } from './entity/ulasan.entity';
import *as puppeteer from 'puppeteer'
import *as path from 'path'
import *as fs from 'fs'
import { CategoryFiltersDto } from './dto/categoryFilter.dto';
import { CategoryFilters } from './entity/categoryFilter.entity';
@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Events) private eventRepository: Repository<Events>,
        @InjectRepository(Ulasan) private ulasanRepository: Repository<Ulasan>,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Orders) private orderRepository: Repository<Orders>,
        @InjectRepository(Kategori) private kategoriRepository: Repository<Kategori>,
        @InjectRepository(CategoryFilters) private categoryFiltersRepository: Repository<CategoryFilters>
        ) { }
        
        async createEvent(id_users: string, createEvent: CreateEventsDto) {
            const user = await this.usersRepository.findOneOrFail({
                where: {
                    id_users: id_users
                }
            });
            const result = new Events()
            result.nama_event = createEvent.nama_event
            result.nama_penyelenggara = createEvent.nama_penyelenggara
            result.alamat = createEvent.alamat
            result.deskripsi = createEvent.deskripsi
            result.detail = createEvent.detail
            result.banner_event = createEvent.banner_event
            result.tanggal_event = createEvent.tanggal_event
            result.waktu_event = createEvent.waktu_event
            result.users = user
            await this.eventRepository.insert(result)
            return this.eventRepository.findOneOrFail({
                where: {
                    id_events: result.id_events
                }
            })
        }

        async kategori(id_events: string, kategoriDto: KategoriDto) {
            const event = await this.eventRepository.findOneOrFail({where: {id_events}})
            const hasil = new Kategori()
            hasil.kategori = kategoriDto.kategori
            hasil.harga_tiket = kategoriDto.harga_tiket
            hasil.jumlah_tiket = kategoriDto.jumlah_tiket
            hasil.events = event
            await this.kategoriRepository.insert(hasil)
            return this.kategoriRepository.findOneOrFail({where: {id_kategori: hasil.id_kategori}})
        };

        async kategoriByIdEvents(id_events: string){
            return this.kategoriRepository.findAndCount({
                relations: {events: true},
                where: {events: {id_events: id_events}}
            })
        }

        async test() {
            return this.kategoriRepository.findOne({
                where: {}
            })
        }


        async addUlasan(id_orders: string, ulasanDto: UlasanDto) {
            const order = await this.orderRepository.findOneOrFail({
                where: {
                    id_orders,
                }
            })
            const hasil = new Ulasan()
            hasil.komentar = ulasanDto.komentar
            hasil.rating = ulasanDto.rating
            hasil.orders = order
            await this.ulasanRepository.insert(hasil)
            return this.ulasanRepository.findOneOrFail({
                where: {
                    id_ulasan: hasil.id_ulasan
                }
            })
        }
        

        async UlasanByIdEvents(id_events: string){
            await this.ulasanRepository.find({
                relations: {orders: {
                    kategori: {
                        events: true
                    }
                }},
                where: {
                    orders: {events: {id_events}}
                }
            })
            return this.ulasanRepository.find({
                relations: {orders: {
                    users: true
                }},
                where: {
                    orders: {events: {id_events}}
                }
            })
        }

        async categoryFilters(id:string, categoryFiltersDto: CategoryFiltersDto) {
            const event = await this.eventRepository.findOneOrFail({
                where: {id_events: id}
            })
            const result = new CategoryFilters()
            result.namaCategory = categoryFiltersDto.namaCategory
            result.event = event
            await this.categoryFiltersRepository.insert(result)
            return this.categoryFiltersRepository.findOneOrFail({where: {event: {id_events: id}}})
        }

        ulasanAll(){
            return this.ulasanRepository.findAndCount({
                relations: {orders: {events: true}}
            })
        }

        async rating(id: string) {
            const rating = await this.ulasanRepository.find({
                where: {
                    events: {id_events: id}
                },
                relations: {
                    events: true
                }
            })
            const arr = []
            rating.map(result => arr.push(result.rating))
            const average = arr.reduce((a, b) => a + b, 0)
            return `average: ${average}`
        }
        
        
        getAllEvents() {
        return this.eventRepository.findAndCount({
            relations: {kategori: true}
        });
        }

        getEventByIdEvent(id_events: string) {
            try{
            return this.eventRepository.findOne({
                where: {
                    id_events: id_events
                }
            })
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



        async getRiwayatEvent(){
            try{
                return await this.eventRepository.find({
                    relations: {orders: true},
                    where: {status_event: 'Selesai'}
                    // where: {
                    //     status_event
                    // }
                })
            }catch(error) {
                if (error instanceof EntityNotFoundError) {
                    throw new HttpException(
                        {
                            statusCode: HttpStatus.NOT_FOUND,
                            error: 'Data not found',
                        },
                        HttpStatus.NOT_FOUND,
                        );
                    } else {
                        throw error;
                    }
            }
        }


        getEventAktif(){
            return this.eventRepository.find({
                where: {status_event: 'Aktif'}
            })
        }

        countAllEvents(){
            return this.eventRepository.count()
        }

        getAllEventByIdUsers(id_users: string){
            return this.eventRepository.find({
                relations: {
                    users: true
                },
                where: {
                    users: {
                        id_users: id_users
                    }
                },
            })
        }

    async getEvent(nama_event: string) {
        try{
            return this.eventRepository.findBy({nama_event: Like(`%${nama_event}%`)});
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: 'Data not found',
                    },
                    HttpStatus.NOT_FOUND,
                    );
                } else {
                    throw error;
                }
            }
        }        

        eventsFilter(eventsFilterDto: GetEventsFilterDto){
            const { nama_event } = eventsFilterDto
            
        }


        getEventByIdUsers(id_users: string){
            return this.eventRepository.find({
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

        
    async updateEvent(id_events: string,request: CreateEventsDto){
        await this.eventRepository.update({id_events}, request);
        return await this.eventRepository.findOneOrFail({where: {id_events}});
    }

    async updateStatusEvents(id_events: string, request: UpdateStatusEventsDto){
        await this.eventRepository.findOneOrFail({
            where: {
                id_events,
            }
        });
        const status = request.status_event;
        const result = await this.eventRepository.findOneOrFail({
            where: {
                id_events
            }
        });
        result.status_event = status
        await this.eventRepository.update({id_events}, result)
        return await this.eventRepository.findOneOrFail({
            where: {
                id_events
            }
        })
    }

    async deleteEvent(id_events: string){
        try {
            await this.eventRepository.findOneOrFail({
                where: {
                    id_events,
                },
            });
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.NOT_FOUND,
                        error: 'Data not Found',
                    },
                    HttpStatus.NOT_FOUND,
                );
            } else {
                throw error;
            }
        }

        await this.eventRepository.softDelete(id_events);
    }

    deleteEventsById(id_events: string){
        // try{
        return this.eventRepository.softDelete(id_events);
    }

    async excel(id_users: string) {
        const events = await this.eventRepository.find({
            relations: ['orders'],
            where: {users: {id_users: id_users}}})
        const arr = []


        events.map(hasil => {
            const order = []
            hasil.orders.map(result => {
                order.push(result.kuantitas)
            })
            const jumlah = order.reduce((x, y) => x + y, 0)
            
            arr.push({
            nama: hasil.nama_event,
            tanggalEvent: hasil.tanggal_event,
            alamat: hasil.alamat,
            totalTiketTerjual: jumlah,
            status: hasil.status_event
        })
    })
        // console.log(arr,'oi');
        return generateExcel(arr, 'events')
    }

    async excelAdmin(){
        const events = await this.eventRepository.find()
        const arr = []
        events.map(hasil=> arr.push({
            namaEvent: hasil.nama_event,
            tanggalEvent: hasil.tanggal_event,
            alamat: hasil.alamat
        }))
        return generateExcel(arr, 'admin')
    }

    

    async waiting(){
        const event = await this.eventRepository.find()
        console.log(event);
        
        // const arr = []
        // event.map(hasil => arr.push({
        //     namaEvents: hasil.nama_event,
        //     tanggalEvents: hasil.tanggal_event,
        // }))
    }

    async table(id_users: string){
        const event = await this.eventRepository.find({
            relations: ['orders', 'kategori'],
            where: {users: {
                id_users: id_users
            }}
        })
        const arr = []
        
        event.map(hasil =>  {
            const categori = []
            const order= []
            if(hasil.kategori.length >= 1 || hasil.orders.length >= 1){
                hasil.kategori.map((result)=> {
                    categori.push(result.kategori)
                })
                hasil.orders.map((orderss)=>
                order.push(orderss.kuantitas))
            }
            let sum = order.reduce((x, y) => x + y, 0);

            // function penjumlahan (total, value){
            //     return total + value 
            // }
            arr.push({
                id_events: hasil.id_events,
                namaEvents: hasil.nama_event,
                tanggalEvents: hasil.tanggal_event,
                lokasi: hasil.alamat,
                status: hasil.status_event,
                kuantitas: sum,
                namaKategori: categori,
            })
        })
        console.log(arr);
        
        return arr
    }
    
    async exportPdf() { 
        // const data = await this.orderRepository.find({
        //     relations: {
        //         users: true,
        //         events: true,
        //         kategori: true
        //     },
        //     where: {
        //         users: {id_users: id_users}
        //     }
        // })
        // const compile = await function(templateName, data) {
        //     const filePath =  path.join(process.cwd(), 'src/events/tikethtml', `${templateName}.html`)
        //     const html = fs.readFile(filePath, 'utf-8')
        //     return 
        // }

        const html = fs.readFileSync(`src/events/tikethtml/test.html`, 'utf-8')
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        await page.setContent(html, {
            waitUntil: 'domcontentloaded'
        })
        await page.pdf({
            path: 'src/events/tiket/tiket.pdf',
            format: 'A4',
            printBackground: false,
        });

        await browser.close()
    }
    
}
