import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Post()
  async createUser(@Body() userBody: CreateUserDTO) {
    return this.userService.createUser(userBody);
  }
}
