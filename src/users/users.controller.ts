import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Users } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { EditPasswordDto } from './dto/edit-password.dto';
import { Cron } from '@nestjs/schedule';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  // create users
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      data: await this.usersService.create(createUserDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  // mencari semua user
  @Get()
  async findAll() {
    const [data, count] = await this.usersService.findAll();

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  // get user by id
  @Get('/:id_users')
  async findOne(@Param('id_users', ParseUUIDPipe) id_users: string) {
    return {
      data: await this.usersService.findOne(id_users),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get('count/all')
  countAllUsers(@Query() id_users: string) {
    return this.usersService.countAllUsers();
  }

  // edit user by id
  @UseGuards(JwtAuthGuard)
  @Put(':id_users')
  async update(
    @Param('id_users', ParseUUIDPipe) id_users: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return {
      data: await this.usersService.update(id_users, updateUserDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  // @UseGuards(JwtAuthGuard)
  @Put('update/Password/:id_users')
  async updatePassword(
    @Param('id_users', ParseUUIDPipe) id_users: string,
    @Body() editPasswordDto: EditPasswordDto,
  ) {
    return {
      data: await this.usersService.updatePassword(id_users, editPasswordDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
  

  // hapus user by id
  @Delete(':id_users')
  async remove(@Param('id_users', ParseUUIDPipe) id_users: string) {
    await this.usersService.remove(id_users);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

}




