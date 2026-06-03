import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/users/user-repository.interface';
import { User } from '../../domain/users/user.model';
import { UserRole } from '../../domain/users/user-role.enum';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(data: { id: string; email: string; password: string; firstName: string; lastName: string; role: string }): User {
    const user = new User();
    user.id = data.id;
    user.email = data.email;
    user.password = data.password;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.role = data.role as UserRole;
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({ where: { id } });
    return data ? this.toDomain(data) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.prisma.user.findUnique({ where: { email } });
    return data ? this.toDomain(data) : null;
  }

  async findAll(): Promise<User[]> {
    const data = await this.prisma.user.findMany();
    return data.map((d) => this.toDomain(d));
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const data = await this.prisma.user.create({ data: user });
    return this.toDomain(data);
  }

  async update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
    const result = await this.prisma.user.update({ where: { id }, data });
    return this.toDomain(result);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
