import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { generateString, InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'helper/hash_password';
import { async, from, Observable, switchMap } from 'rxjs';
import { diskStorage } from 'multer';
import path from 'path';
import { string } from 'joi';
import { EditPasswordDto } from './dto/edit-password.dto';

@Injectable()
export class UsersService {

  // updateOne(id_users: string, users: Users) {
  //   return from(this.usersRepository.update(id_users,users)).pipe(
  //     switchMap(() => this.findOne(id_users))
  //   );
  // }
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const result = await this.usersRepository.insert(createUserDto);

    return this.usersRepository.findOneOrFail({
      where: {
        id_users: result.identifiers[0].id_users,
      },
    });
  }



  async findAll() {
    const data = await this.usersRepository.createQueryBuilder('users').leftJoinAndSelect('users.role', 'role').getManyAndCount()
    return data
  }

  async findOne(id_users: string) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          id_users,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  countAllUsers(){
    return this.usersRepository.count();
  }

  async findImage(id_users: string) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          id_users,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  async update(id_users: string, updateUserDto: UpdateUserDto) {
      await this.usersRepository.update({id_users}, updateUserDto);
      return await this.usersRepository.findOneOrFail({where: {id_users}});
    }

    
  async updatePassword(id_users: string, editPasswordDto: EditPasswordDto) {
      await this.usersRepository.findOneOrFail({where: {
        id_users: id_users
      },
    });
    
    // await this.usersRepository.update()
    
    if(editPasswordDto.password === editPasswordDto.confirm_password) {
      const hash = generateString();
      const passwordBaru = await hashPassword(editPasswordDto.password, hash);
      // const data = new Users()
      const data = await this.usersRepository.findOneOrFail({
        where: {
          id_users: id_users
        },
      });
      data.hash = hash;
      data.password = passwordBaru;
          
      await this.usersRepository.update({id_users}, data );
      return await this.usersRepository.findOneOrFail({where: {id_users,}});
    } else {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Data Harus Sama',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    }


  async remove(id_users: string) {
    try {
      await this.usersRepository.findOneOrFail({
        where: {
          id_users,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.usersRepository.softDelete(id_users);
  }
}


function uuidv4() {
  throw new Error('Function not implemented.');
}

