import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PaymentService } from "src/payment/payment.service";
import { EventService } from "./events.service";

    @Injectable()
export class CronService {
    constructor(
        private eventService: EventService,
        // private paymentService: PaymentService,
    ) {
    }

    // @Cron('*/5 * * * * *', { name: 'deleteDataCustomer' })
    // async deleteDataCustomer() {

    //     console.log('jalan');
        
    //     // await this.accountService.deleteDataCustomer()
    //     //     .then(() => console.timeEnd('Start Sync'))
    //     //     .catch((err) => {
                // console.timeEnd('Start Sync');
                // console.log(err, 'Sync Error');
            // });
            
    // }
    // @Cron('* * * * * *', { name: 'deleteOrder'})
    // async deleteOrders() {
    //     await this.eventService.dele
    // }
}