import { AuthModule } from "@api/v1/auth/Auth.module";
import { MemberModule } from "@api/v1/member/Member.module";
import { winstonTransports } from "@global/config/logger/Winston.config";
import { TokenModule } from "@global/jwt/Token.module";
import { MailModule } from "@infra/mail/Mail.module";
import { RedisModule } from "@infra/redis/Redis.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import Joi from "joi";
import { WinstonModule } from "nest-winston";
import { DaoModule } from "prisma/dao.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [".env"],
            validationSchema: Joi.object({
                SERVER_PORT: Joi.number().optional().default(3000),
                DATABASE_URL: Joi.string().required(),
                SECRET: Joi.string().required(),
                ENV: Joi.string().required(),
                MAIL_USER: Joi.string().required(),
                MAIL_PASSWORD: Joi.string().required(),
                MAIL_SIGNUP_ALERT_USER: Joi.string().required(),
                REDIS_URL: Joi.string().required(),
            }),
        }),
        WinstonModule.forRoot({
            transports: winstonTransports,
        }),
        DaoModule,
        AuthModule,
        MemberModule,
        MailModule,
        RedisModule,
        TokenModule,
    ],
    controllers: [],
})
export class AppModule {}
