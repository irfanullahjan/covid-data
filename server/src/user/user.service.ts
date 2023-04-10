import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { getUserFromRequest } from '../common/auth/jwt-utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    createUserDto.password = await hash(password, 10);
    return this.userRepository.save(new User(createUserDto));
  }

  findOne(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto, req) {
    const currentUser = getUserFromRequest(req);
    if (currentUser.sub !== id) {
      throw new Error('Unauthorized');
    }
    return this.userRepository.update(id, updateUserDto);
  }
}
