import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, EditUserDTO } from './dtos';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getMany() {
    return await this.userRepository.find();
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User does not exists');

    return user;
  }

  async createOne(dto: CreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findOne({
      email: dto.email,
    });

    if (userAlreadyExists)
      throw new BadRequestException('User already registered with email');

    const newUser = this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async editOne(id: number, dto: EditUserDTO) {
    const user = await this.getOne(id);
    const editedUser = Object.assign(user, dto);
    return await this.userRepository.save(editedUser);
  }

  async deleteOne(id: number) {
    const user = await this.getOne(id);

    return await this.userRepository.remove(user);
  }
}