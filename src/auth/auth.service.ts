import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      console.log('Correct Credentials')
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  
  async login(username: string, password:string) {
    const result = await this.validateUser(username, password)

    if (!result) {
      return null
    }
    return { access_token: { username, password} }
  }


  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
