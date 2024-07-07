import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  
  async login(username:string, password:string, email:string): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    const JWT_SECRET = 'JWT_TEST'

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {privateKey:JWT_SECRET});

    return { accessToken };
  }


  async register(createUserDto: CreateUserDto):Promise<any> {
    return this.usersService.create(createUserDto);
  }
}
