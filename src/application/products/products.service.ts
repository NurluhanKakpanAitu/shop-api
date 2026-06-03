import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(dto: CreateProductDto, ownerId: string) {
    return this.productRepository.create({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      imageUrl: dto.imageUrl,
      ownerId,
    });
  }

  async findById(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findPaginated(query: ProductQueryDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    return this.productRepository.findPaginated({
      page,
      limit,
      search: query.search,
      sortOrder: query.sortOrder,
    });
  }

  async update(id: string, dto: UpdateProductDto, userId: string) {
    const product = await this.findById(id);
    if (product.ownerId !== userId) {
      throw new ForbiddenException('You can only edit your own products');
    }
    return this.productRepository.update(id, dto);
  }

  async delete(id: string, userId: string) {
    const product = await this.findById(id);
    if (product.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own products');
    }
    await this.productRepository.delete(id);
  }
}
