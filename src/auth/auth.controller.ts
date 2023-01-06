import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // register
    @Post('/register')
    async register(@Body() request: RegisterDto) {
        try {
            
        await this.authService.register(request);

        return {
            statusCode: 200,
            message: 'Success'
        }
    }catch(error){
        return {
            message: "error di", 
            error
        }
        
    }
}
        

    // login
    @Post('/login')
    async Login(@Body() request: LoginDto) {
            const res = await this.authService.login(request);
        return {
            statusCode: 200,
            message: 'Success',
            accessToken: res
        }
        

    }

    @Get()
    @UseGuards(AuthGuard())
    async testAuth(@Req() req) {
        console.log(req.user)
    }
}