import { BadGatewayException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
// private readonly logger = new Logger(LoggingInterceptor.name)

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next
        .handle()
        .pipe(map(data => {}))
    }
}