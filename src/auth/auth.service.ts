import { HttpException, Injectable } from '@nestjs/common';
import { generateString, InjectRepository } from '@nestjs/typeorm';
import { generate } from 'rxjs';
import { hashPassword } from 'helper/hash_password';
import { IsNull, Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { Role } from 'src/users/entities/role.entity';
import { query } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        // @InjectRepository(Role) private roleRepository: Repository<Role>,
        private jwtService: JwtService,
    ) {
        
    }

    async register(request: RegisterDto) {
        try {
            // const role = await this.roleRepository.findOneOrFail({
            //     where: {
            //         id_role: 
            //     }
            // })
            const hash = generateString();
            const password = await hashPassword(request.password, hash);
            const data = new Users()
            data.username = request.username;
            data.email = request.email;
            data.hash = hash;
            data.password = password;
            data.tanggal_lahir = request.tanggal_lahir;
            data.jenis_kelamin = request.jenis_kelamin;
            // data.gambar = request.gambar;
            data.role = 1
            data.no_telepon=request.no_telepon
            
            await this.userRepository.insert(data)
        } catch (e) {
            throw e;
        }
    }

    async login(request: LoginDto) {
        try {
            const existUser = await this.userRepository.findOne({
                relations: {
                    role: true
                },
                where: {
                    username: request.username,
                    deletedAt: IsNull()
                }
            });
            const { username, password, hash, ...query} = existUser;

            const accessToken = this.jwtService.sign({
                query
            });


            if (existUser && existUser.password === await hashPassword(request.password, existUser.hash)) {
                return accessToken;
            } else {
                throw new HttpException ({
                    statusCode : 400,
                    message: 'Bad Request',
                    data: 'Username or password is wrong'                   
                }, 400)

            }
        } catch (e){
            throw e
        }
    }
}