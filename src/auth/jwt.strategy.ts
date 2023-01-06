import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
    ){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'topSecret20',
    });
    }


    async validate(payload: any) {
        
        const existUserData = await this.userRepository.find({
            relations: {
                role: true
            },
            where: {
                email: payload.email,
                // role: payload.role
            }
        });
        console.log(payload);
        
        if (!existUserData) {
            throw new HttpException({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'UNAUTHORIZED',
                data: 'Token is invalid'
            },
            HttpStatus.UNAUTHORIZED);
        }
        
        return existUserData;
    }
}