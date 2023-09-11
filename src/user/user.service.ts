import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async createUser(user: User): Promise<User> {
    const hashSalt: number = 10;
    const hashedPassword: string = await hash(user.password, hashSalt);
    return await this.userModel.create({
      ...user,
      password: hashedPassword,
    });
  }

  async updateUserPasswordById(id: string, data: UpdatePasswordDto) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    const match = await compare(data.lastPassword, user.password);

    if (!match) {
      throw new BadRequestException("Last password doesn't match.");
    }

    const hashSalt: number = 10;
    const hashedPassword: string = await hash(data.newPassword, hashSalt);

    return await this.userModel.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async deleteUserById(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
