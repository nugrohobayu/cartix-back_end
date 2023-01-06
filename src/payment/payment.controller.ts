import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { request } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApprovedDto } from './dto/approved.orders.dto';
import { BankPenyelenggaraDto } from './dto/bankPenyelenggara.dto';
import { OrdersDto } from './dto/orders.dto';
import { PembayaranDto } from './dto/pembayaran.dto';
import { RejectedStatusDto } from './dto/rejected.status.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    // post Pembayaran
    @UseGuards(JwtAuthGuard)
    @Post('pembayaran/:id_orders')
    async addPembayaran(
        // @Param('id_bankPenyelenggara', ParseUUIDPipe) id_bankPenyelenggara: string,
        @Param('id_orders') id_orders: string,
        @Body() request: PembayaranDto) 
        {
        try{
            await this.paymentService.addPembayaran(id_orders, request);

            return {
                statusCode: 200,
                message: 'berhasil'
            }
        }catch(error){
            return {
                message: 'error di ',
                error
            }
        }
    }

    @Post('cart/:id_users/:id_orders')
    cart(
        @Param('id_users', ParseUUIDPipe) id_users: string,
        @Param('id_orders', ParseUUIDPipe) id_orders: string
    ) {
        return this.paymentService.cart(id_users, id_orders)
    }

    @Get('cart/:id_users')
    idCart(
        @Param('id_users',ParseUUIDPipe) id_users: string
    ) {
        return this.paymentService.idCart(id_users)
    }

    @Get('order/:id')
    ordersId(
        @Param('id') id: string
    ) {
        return this.paymentService.ordersId(id)
    }


    @Get('total/price/:id')
    totalPrice(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        return this.paymentService.totalPrice(id)
    }



    @Get('all/pembayaran/events/:id_events')
    pembayaranByIdEvents(@Param('id_events', ParseUUIDPipe) id_events: string){
        return this.paymentService.pembayaranByIdEvents(id_events)
    }

    //add bank penyelenggara
    @UseGuards(JwtAuthGuard)
    @Post('bankPenyelenggara/:id_users')
    async addBankPenyelenggara(
        @Param('id_users', ParseUUIDPipe) id_users: string,
        @Body() request: BankPenyelenggaraDto
        ) {
        try{
        await this.paymentService.addBankPenyelenggara(id_users, request);
         return {
            statusCode: 200,
            message: 'berhasil menambahkan bank penyelenggara',
         }
        }catch (error) {
            return {
                essage: 'error di ',
                error
            }
        }
    }

    // post orders by id event and id users ------------------------------------------------------------
    @UseGuards(JwtAuthGuard)
    @Post('orders/:id_users/:id_events/:id_kategori')
    async addOrders(
        @Param('id_users', ParseUUIDPipe) id_users: string,
        @Param('id_events', ParseUUIDPipe) id_events: string,
        @Param('id_kategori', ParseUUIDPipe) id_kategori: string,
        @Body() request: OrdersDto
        ) {
        try{
            await this.paymentService.addOrders(id_kategori, id_events, id_users, request)

            return {
                statusCode: 200,
                message: 'Berhasil menambahkan pemesanan'
            }
        }catch(error){
            return{
                message: 'error',
                error
            }
        }
    }

    @Get('get/orders/:id_users')
    orderByIdUsers(@Param('id_users', ParseUUIDPipe) id_users: string){
        return this.paymentService.orderByIdUsers(id_users);
    }

    // get all pembayaran----------------------------------------------------------------------
    @Get('pembayaran')
    getAllPembayaran() {
        return this.paymentService.getAllPembayaran();
    }

    @Get('')
    PembayaranByIdOrders(@Param('id_orders') id_orders) {
        
    }

    // get pembayaran by id-----------------------------------------------------------------------
    @Get('get/pembayaran/:id_bank_penyelenggara')
    getPembayaranById(
        @Param('id_bank_penyelenggara', ParseUUIDPipe) id_bank_penyelenggara: string,
    ) {
        return this.paymentService.getPembayaranById(id_bank_penyelenggara)
    }


    @Get('tiket/terjual')
    async tiketTerjual(){
        return this.paymentService.tiketTerjual()
    }

    @Get('pembayaran/by/:id_events')
    pembayaranIdEvent(
        @Param('id_events', ParseUUIDPipe) id_events: string
    ){
        return this.paymentService.pembayaranIdEvents(id_events)
    }

    //  get bank penyelenggara by id--------------------------------------------------------------
    @Get('bankPenyelenggara/:id_bankPenyelenggara')
    getBankPenyelenggaraById(@Param('id_bankPenyelenggara', ParseUUIDPipe) id_bankPenelenggara: string) {
        return this.paymentService.getBankPenyelenggaraById(id_bankPenelenggara);
    }

    // get bank penyelenggara by id users -------------------------------------------------------------
    @Get('getby/:id_users')
    getBankPenyelenggaraByIdUsers(
        @Param('id_users', ParseUUIDPipe) id_users: string,
    ){
        return this.paymentService.getBankPenyelenggaraByIdUsers(id_users);
    }


    //get all bankPenyelenggara-----------------------------------------------------
    @Get('all/bankPenyelenggara')
    getAllBankPenyelenggara(@Query() id_bankPenyelenggara: string) {
        return this.paymentService.getAllBankPenyelenggara();
    }


    // get all order--------------------------------------------------------------
    @Get('all/orders/:id_users')
    getAllOrders(@Param('id_users', ParseUUIDPipe) id_users: string) {
        return this.paymentService.getAllOrders(id_users);
    }

    @Get('orders/:id_events')
    orderByIdEvents(@Param('id_events', ParseUUIDPipe) id_events: string){
        return this.paymentService.orderByIdEvents(id_events)
    }

    @Get('orders/events/:id_events')
    orderIdEvents(@Param('id_events', ParseUUIDPipe) id_events: string){
        return this.paymentService.orderIdEvents(id_events)
    }

    @Get('find/pembayaran/:id_orders')
    async getDataPembayaranByIdOrder(
        @Param('id_orders') id_orders: string,
    ){
        return await this.paymentService.getDataPembayaranByIdOrder(id_orders)
    }
    @Get('jumlah/pembayaran')
    async jumlahPembayaran(){
        return this.paymentService.jumlahPembayaran()
    }

    @Put('edit/status/approved/:id_orders/:id_kategori')
    async approved(
        @Param('id_orders') id_orders: string,
        @Param('id_kategori', ParseUUIDPipe) id_kategori: string,
        @Body() approvedDto: ApprovedDto,
    ){
        // await this.paymentService.penguranganStok(id_orders, id_kategori)
        return this.paymentService.approved(id_orders, id_kategori, approvedDto)
    }
    @Put('status/rejected/:id_orders')
    async rejectedStatus(
        @Param('id_orders') id_orders: string,
        @Body() rejectedStatusDto: RejectedStatusDto,
    ){
        return this.paymentService.rejectedStatus(id_orders, rejectedStatusDto)
    }

    @Get('total/harga/order/:id_orders')
    async totalHargaByIdOrders(@Param('id_orders') id_orders: string){
        return this.paymentService.totalHargaByIdOrders(id_orders)
    }
    
    @Delete('bankPenyelenggara/delete/:id_bankPenyelenggara')
    deleteBankPenyelenggara(@Param('id_bankPenyelenggara', ParseUUIDPipe) id_bankPenyelenggara: string,
    ){
        return this.paymentService.deleteBankPenyelenggara(id_bankPenyelenggara);
    }
    
}
