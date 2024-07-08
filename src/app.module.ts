import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({
      type: "postgres",
      host: String(process.env.HOST),
      port: +process.env.PORT,
      username: String(process.env.USER),
      password: String(process.env.PASSWORD),
      database: String(process.env.DB),
      entities: [User],
      ssl:true,
      synchronize: true,
    }),
  TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService, UserService, ],
})
export class AppModule {}
