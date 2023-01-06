import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { string } from "joi";
import { RejectedStatusDto } from "./dto/rejected.status.dto";
import { PaymentService } from "./payment.service";

@Injectable()
export class CronPaymentService {
    constructor(
        private paymentService: PaymentService,
    ) {
    }
        @Cron('0 */2 * * *', {name: 'deleteDataOrders'})
        async deleteDataOrders() {
            await this.paymentService.deleteDataOrders()
            .then(() => console.timeEnd('Data di hapus'))
        }
} 