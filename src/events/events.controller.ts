import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { request } from 'http';
import { Logger } from 'nestjs-pino';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CategoryFiltersDto } from './dto/categoryFilter.dto';
import { CreateEventsDto } from './dto/create.events.dto';
import { UpdateStatusEventsDto } from './dto/edit.events.dto';
// import { UpdateEventsDto } from './dto/edit.events.dto';
import { GetEventsFilterDto } from './dto/eventFilter.dto';
import { KategoriDto } from './dto/kategori.dto';
import { UlasanDto } from './dto/ulasan.events.dto';
import { EventService } from './events.service';

@Controller('event')
export class EventController {
    constructor(
        private readonly eventService: EventService
        ) {}

    // get semua data events
    @Get ()
    getAllEvents () {
        return this.eventService.getAllEvents();
    }

    @Get('count/all') 
    countAllEvents(@Query() id_events: string) {
        return this.eventService.countAllEvents();
    }

    // @Get('count/')
    
    
    // get dataevent by nama events
    @Get('/:nama_event')
    getEvent(@Param('nama_event') nama_event: string) {
        return this.eventService.getEvent(nama_event);
    }

    @Get('get/:id_events')
    getEventByIdEvent(
        @Param('id_events', ParseUUIDPipe) id_events: string,
        ) {
        return this.eventService.getEventByIdEvent(id_events)
    }

    // @Get()
    // getEventByIdUsers(
    //     @Param('id_users', ParseUUIDPipe) id_users: string,
    // ) {
        
    // }

    // get riwayat event 
    @Get('aaa/riwayat_event')
    async getRiwayatEvent(@Query('status_event') status_event: string) {
        return this.eventService.getRiwayatEvent();
    }


    @Get('')
    async test(@Query('harga_tiket') harga_tiket: number){
        return this.eventService
    }

    @Get('hapis/excel/:id_users')
    async excel(@Param("id_users", ParseUUIDPipe) id_users: string){
        return this.eventService.excel(id_users)
    }

    @Get('download/excel/:id_users')
    async download(
        @Param("id_users", ParseUUIDPipe) id_users: string,
        @Res() res
        ){
        return res.download(
            `./uploads/excel/${await this.excel(id_users)}`,
            'events.xlsx',
        );
    }

    @Get('download/excel/admin/aaa')
    async downloadexcel(@Res() res) {
        return res.downloadexcel(
            `./uploads/excel/${await this.eventService.excelAdmin()}`,
            'admin.xlsx'
        )
    }

    @Get('get/aktif')
    async waiting(){
        return this.eventService.waiting()
    }

    @Get('table/test/:id_users')
    async table(@Param('id_users', ParseUUIDPipe) id_users: string){
        return this.eventService.table(id_users)
    }

    //get list event aktif
    @Get('list/aktif')
    async getEventAktif(@Query('status_event') status_event: string) {
        return this.eventService.getEventAktif();
    }

    @Get('getby/:id_users')
    getAllEventByIdUsers(@Param('id_users') id_users: string) {
        
        return this.eventService.getAllEventByIdUsers(id_users);
        
    }

    @Get('ulasan/all/:id_events')
    UlasanByIdEvents(@Param('id_events', ParseUUIDPipe) id_events: string){
        return this.eventService.UlasanByIdEvents(id_events)
    }

    @Get('kategori/by/:id_events')
    async kategoriByIdEvents(@Param('id_events', ParseUUIDPipe) id_events: string) {
        return this.eventService.kategoriByIdEvents(id_events)
    }

    // create data events
    @UseGuards(JwtAuthGuard)
    @Post ('create/:id_users')
    async createEvent (
        @Param('id_users', ParseUUIDPipe) id_users: string,
        @Body() request: CreateEventsDto
        ) {
            try{
                await this.eventService.createEvent(id_users,request);
                
                return {
                    statusCode: 200,
                    message: 'berhasil membuat event'
                }
            }catch(error){
                return {
                    message: 'error di ', error
                }
            }
        }


        @Post('kategori/:id_events')
        async kategori(
            @Param('id_events', ParseUUIDPipe) id_events: string,
            @Body() kategoriDto: KategoriDto
            ){
            return this.eventService.kategori(id_events, kategoriDto)
        }
        

    @Post('ulasan/:id_order')
    async addUlasan(
        @Param('id_order') id_order: string,
        @Body() request: UlasanDto
        ) {
        try {
            await this.eventService.addUlasan(id_order, request);

            return {
                statusCode: 200,
                message: 'berhasil'
            }
        }catch(error) {
            return {
                message: 'error',
                error
            }
        }
    }

    @Post('category/filter/:id')
    filterCategory(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() categoryFiltersDto: CategoryFiltersDto
    ) {
        return this.eventService.categoryFilters(id, categoryFiltersDto)
    }

    @Get('ulasan/get/by/:id_orders')
    async ulasanByIdEvents(
        @Param('id_orders') id_orders: string,
    ) {
        return this.eventService.UlasanByIdEvents(id_orders)
    }

    @Get('all/ulasan')
    async ulasanAll(){
        return this.eventService.ulasanAll()
    }

    @Get('rating/events/:id')
    rating(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        return this.eventService.rating(id)
    }
    // edit data events by id events
    // @UseGuards(JwtAuthGuard)
    @Put('/:id_events')
    async updateEvent(
            @Param('id_events', ParseUUIDPipe) id_events: string,
            @Body() createEventsDto: CreateEventsDto,
        ) {
            return {
                data: await this.eventService.updateEvent(id_events, createEventsDto),
                statusCode: HttpStatus.OK,
                message: 'success'
            };
    }
    // // delete events by id
    // @UseGuards(JwtAuthGuard)
    // @Delete('/:id') 
    // deleteEvent(@Param('id') id: string){
    //     return this.eventService.deleteEvent(id);
    // }

    @Put('updateStatusEvents/:id_events')
    async updateStatusEvents(
        @Param('id_events', ParseUUIDPipe) id_events: string,
        @Body() updateStatusEventsDto: UpdateStatusEventsDto,
    ) {
        return this.eventService.updateStatusEvents(id_events, updateStatusEventsDto)
    }


    @Delete('delete/:id_events')
    async deleteEventsById(
        @Param('id_events', ParseUUIDPipe) id_events: string,
    ){
        return this.eventService.deleteEventsById(id_events);
    }

    @Get('export/pdf')
    exportPdf(){
        return this.eventService.exportPdf()
    }
}
