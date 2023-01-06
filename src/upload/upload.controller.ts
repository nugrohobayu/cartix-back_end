import { Controller, Post, UploadedFile, UseInterceptors, Request, UseGuards, Get, Param, Res, HttpException, HttpStatus} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Events } from 'src/events/entity/events.entity';
import { Users } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
// import { editFileName } from 'helper/file-handler';
import { FileService } from './file.service';
import { UsersService } from 'src/users/users.service';
import { join } from 'path';

const path = require('path');



export const storage = {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
          const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;
        cb (null, `${filename}${extension}`)
    }
      
})

}
export const storageBuktiPembayaran = {
  storage: diskStorage({
    destination: './uploads/buktiPembayaran',
    filename: (req, file, cb) => {
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb (null, `${filename}${extension}`)
    }
  })
}

@Controller('upload')
export class UploadController {
  // constructor(private readonly fileService: FileService) {}
  constructor(private readonly userService: UsersService) {}

  //   @Post('photo_profile')
  //   @UseInterceptors(FileInterceptor('file', storage,))
//   uploadFile(@UploadedFile() file, @Request() req): Observable<object>{
//     const users: Users = req.users;
//     // console.log(users);
    
//     // return this.usersService.update(users.id_users, {gambar: file.filename}).
//     return of({imagePath: file.filename});

// }

  // @UseGuards(JwtAuthGuard)
  @Post('add/banerevents')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFileEvents(@UploadedFile()file, @Request() req): Observable<object>{
    const events: Events = req.events;
    return of({imagePath: file.filename});
  }

  @Post('add/buktiPembayaran')
  @UseInterceptors(FileInterceptor('file', storageBuktiPembayaran))
  uploadBuktiPembayaran(@UploadedFile()file, @Request() req): Observable<object>{
    const events: Events = req.events;

    // return this.userService.update(user.id_users, {profileImage: file.filename}).pipe
    return of({imagePath: file.filename});
  }


  // get bukti pembayaran------------------------------------------------------
  @Get('get/image/:imagename')
  findimage(@Param('imagename') imagename, @Res() res): Observable<object> {

    return of(res.sendFile(join(process.cwd(), 'uploads/buktiPembayaran/' + imagename)))
  }



  // get baner events--------------------------------------------------------------
  @Get('get/imageevent/:imagename')
  findimageevent(@Param('imagename') imagename, @Res() res): Observable<object> {

    return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)))
  }

}
