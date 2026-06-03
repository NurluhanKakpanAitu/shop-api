import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { AuthModule } from './application/auth/auth.module';
import { ProductsModule } from './application/products/products.module';
import { UsersModule } from './application/users/users.module';

@Module({
  imports: [PrismaModule, AuthModule, ProductsModule, UsersModule],
})
export class AppModule {}
