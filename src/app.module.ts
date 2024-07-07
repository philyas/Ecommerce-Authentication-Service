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
    host: 'dpg-cq592beehbks73bl9ll0-a.frankfurt-postgres.render.com',
    port: 5432,
    username: 'user_db_c7go_user',
    password: '6GXG2JQSA8k52XF4WNH9kygqe8GqqBLq',
    database: "user_db_c7go",
    entities: [User],
    ssl:true,
    synchronize: true,
  }),
  TypeOrmModule.forFeature([User]),
    UserModule
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}
