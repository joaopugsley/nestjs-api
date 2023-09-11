import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const hashSalt: number = 10;
    const hashedPassword = await hash(createUserDTO.password, hashSalt);
    return this.userRepository.save({
      ...createUserDTO,
      password: hashedPassword,
    });
  }
}
