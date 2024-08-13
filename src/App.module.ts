import { AuthModule } from "@domain/auth/Auth.module";
import { MemberModule } from "@domain/member/Member.module";
import { PaymentModule } from "@domain/payment/Payment.module";
import { SubscribeModule } from "@domain/subscribe/Subscribe.module";
import { TransactionModule } from "@domain/transaction/Transaction.module";
import { winstonTransports } from "@global/logger/Winston.config";
import { MailModule } from "@infra/mail/Mail.module";
import { RedisModule } from "@infra/redis/redis.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import Joi from "joi";
import { WinstonModule } from "nest-winston";
import { PrismaModule } from "prisma/prisma.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [".env"],
            validationSchema: Joi.object({
                DATABASE_URL: Joi.string().required(),
                SECRET: Joi.string().required(),
                ENV: Joi.string().required(),
                MAIL_USER: Joi.string().required(),
                MAIL_PASSWORD: Joi.string().required(),
                REDIS_URL: Joi.string().required(),
            }),
        }),
        WinstonModule.forRoot({
            transports: winstonTransports,
        }),
        PrismaModule,
        AuthModule,
        MemberModule,
        SubscribeModule,
        PaymentModule,
        TransactionModule,
        MailModule,
        RedisModule,
    ],
    controllers: [],
})
export class AppModule {}
