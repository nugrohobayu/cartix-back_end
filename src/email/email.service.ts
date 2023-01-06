import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { options } from 'joi';
import { Orders } from 'src/payment/entity/order.entity';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service: 'gmail'
})

@Injectable()
export class EmailService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Orders) private  ordersRepository: Repository<Orders>,

        private mailerService: MailerService,
        ) {}
        async email(id_users: string, id_orders: string) {
            const namaPembeli = await this.ordersRepository.find({
                relations: {events: true, users: true, kategori: true, pembayaran: true},
                where: {id_orders}})
            const arrNamaPembeli = []
            namaPembeli.map(result => arrNamaPembeli.push(result.users.username))
            console.log(`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ${arrNamaPembeli[0]}`);
            const nomortelepon = await this.ordersRepository.find({
                relations: {events: true, users: true, kategori: true, pembayaran: true},
                where: {id_orders: id_orders}})
            const arrNomorTelepon = []
            nomortelepon.map(result => arrNomorTelepon.push(result.users.no_telepon))
            console.log(`nomortelepon: ${arrNomorTelepon}`);
            const namaPenyelenggara = await this.ordersRepository.find({
                relations: {events: true, users: true, kategori: true, pembayaran: true},
                where: {id_orders: id_orders}})
            const arrNamaPenyelenggara = []
            namaPenyelenggara.map(result => arrNamaPenyelenggara.push(result.events.nama_penyelenggara))
            console.log(`namaPenyelenggara: ${arrNamaPenyelenggara}`);
            
            const tanggal = await this.ordersRepository.find({
                relations: {events: true, users: true, kategori: true, pembayaran: true},
                where: {id_orders: id_orders}})
            const arrTanggal = []
            tanggal.map(result => arrTanggal.push(result.events.tanggal_event))
            console.log(`tanggal: ${arrTanggal[0]}`);
            
            const alamat = await this.ordersRepository.find({
                relations: {events: true, users: true, kategori: true, pembayaran: true},
                where: {id_orders: id_orders}})
            const arrAlamat = []
            alamat.map(result => arrAlamat.push(result.events.alamat))
            console.log(`alamat: ${arrAlamat}`);
            
            const nama_event = await this.ordersRepository.find({
                relations: {events: true, users: true, kategori: true, pembayaran: true},
                where: {id_orders: id_orders}})
            const arrNamaEvents = []
            nama_event.map(result => arrNamaEvents.push(result.events.nama_event))
            console.log(`namaEvent: ${arrNamaEvents}`);
            
            const gambar = await this.ordersRepository.find({
                relations: {events: true, users: true, kategori: true, pembayaran: true},
                where: {id_orders: id_orders}})
            const arrGambar = []
            gambar.map(result => arrGambar.push(result.events.banner_event))
            console.log(`arrGambar: ${arrGambar}`);
            
            const kategori = await this.ordersRepository.find({
                relations: {events: true, users: true, kategori: true, pembayaran: true},
                where: {id_orders: id_orders}})
            const arrKategori = []
            kategori.map(result => arrKategori.push(result.kategori.kategori))
            console.log(`kategori: ${arrKategori}`);
            
            const kuantitas = await this.ordersRepository.find({
                relations: {events: true, users: true, kategori: true, pembayaran: true},
                where: {id_orders: id_orders}})
            const arrKuantitas = []
            kuantitas.map(result => arrKuantitas.push(result.kuantitas))
            console.log(`kuantitas: ${arrKuantitas}`);
            
        const account = await this.usersRepository.find({
            where: {id_users: id_users}
        })
        
        const arr = []
        account.map(result => arr.push(result.email)) 
        console.log(arr);
        
        this.mailerService.sendMail({
            to: arr,
            from: '"Cartix" <cartixofficial@hotmail.com>',
            subject: 'Ticket',
            text: 'tiket masuk',
            html: `<Row>
            <Col ref={componentRef} span={12} offset={6}>
              <div className="pt-14">
                <div
                  className="border-t-8 border-sky-500 "
                  style={{backgroundImage: ' url(../../img/dimension.png)'}}>
                  <div className="flex flex-row pl-2">
                    <div className="basis-1/4 flex flex-col">
                      <div>Nama Pembeli</div>
                      <div>Email</div>
                      <div>veryandika</div>
                    </div>
                    <div className="flex flex-col w-80  font-bold">
                      <div>: ${arrNamaPembeli[0]}</div>
                      <div>: ${arr[0]}</div>
                      <div>: ${arrNomorTelepon[0]}</div>
                    </div>
    
                    <div className="basis-1/2 flex flex-col pl-10">
                      <img
                        style={{
                          width: 60,
                          paddingTop: 4,
                          // paddingLeft: 8,
                        }}
                        src={}
                      />
                      <div>{datas?.namaEvents}</div>
                    </div>
                  </div>
    
                  <div className="flex flex-row pb-2 border-b-8 border-sky-500">
                    <div className="basis-1/4 flex flex-col pl-2 ">
                      <div>Nama Creator</div>
                      <div>Tanggal Event</div>
                      <div>Venue</div>
                    </div>
                    <div className="w-80 flex flex-col font-bold">
                      <div>: {datas?.namaPenyelenggara}</div>
                      <div>: {datas?.tanggalEvents}</div>
                      <div>: {datas?.alamatEvents}</div>
                    </div>
                    <div className="basis-1/2 flex flex-col pl-10">
                      <div className="pl-4 font-semibold">
                        {validasi.slice(24, 30)}
                      </div>
    
                      <div>
                        {datas?.kategori} <span>({datas?.kuantitas} Tiket)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
    `,
            
        }).then((success) => {
            console.log(success);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}



