import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({where:{id}});
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, username } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = this.userRepository.create({ email, password: hashedPassword, username });
    return this.userRepository.save(user);
  }
}
