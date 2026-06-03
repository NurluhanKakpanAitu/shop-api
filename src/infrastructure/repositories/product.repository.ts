import { Injectable } from '@nestjs/common';
import { IProductRepository, FindPaginatedParams, PaginatedResult } from '../../domain/products/product-repository.interface';
import { Product } from '../../domain/products/product.model';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(data: {
    id: string;
    nameKz: string;
    nameEn: string;
    nameRu: string;
    descriptionKz: string;
    descriptionEn: string;
    descriptionRu: string;
    price: number;
    imageUrl: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
  }): Product {
    const product = new Product();
    product.id = data.id;
    product.name = { Kz: data.nameKz, En: data.nameEn, Ru: data.nameRu };
    product.description = { Kz: data.descriptionKz, En: data.descriptionEn, Ru: data.descriptionRu };
    product.price = data.price;
    product.imageUrl = data.imageUrl;
    product.ownerId = data.ownerId;
    product.createdAt = data.createdAt;
    product.updatedAt = data.updatedAt;
    return product;
  }

  private toDb(product: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>) {
    const data: Record<string, unknown> = {};
    if (product.name) {
      data.nameKz = product.name.Kz;
      data.nameEn = product.name.En;
      data.nameRu = product.name.Ru;
    }
    if (product.description) {
      data.descriptionKz = product.description.Kz;
      data.descriptionEn = product.description.En;
      data.descriptionRu = product.description.Ru;
    }
    if (product.price !== undefined) data.price = product.price;
    if (product.imageUrl !== undefined) data.imageUrl = product.imageUrl;
    if (product.ownerId !== undefined) data.ownerId = product.ownerId;
    return data;
  }

  async findById(id: string): Promise<Product | null> {
    const data = await this.prisma.product.findUnique({ where: { id } });
    return data ? this.toDomain(data) : null;
  }

  async findAll(): Promise<Product[]> {
    const data = await this.prisma.product.findMany();
    return data.map((d) => this.toDomain(d));
  }

  async findByOwnerId(ownerId: string): Promise<Product[]> {
    const data = await this.prisma.product.findMany({ where: { ownerId } });
    return data.map((d) => this.toDomain(d));
  }

  async findPaginated(params: FindPaginatedParams): Promise<PaginatedResult<Product>> {
    const { page, limit, search, sortOrder = 'asc' } = params;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { nameKz: { contains: search, mode: 'insensitive' as const } },
            { nameEn: { contains: search, mode: 'insensitive' as const } },
            { nameRu: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { price: sortOrder },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: data.map((d) => this.toDomain(d)),
      total,
      page,
      limit,
    };
  }

  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const data = await this.prisma.product.create({
      data: {
        nameKz: product.name.Kz,
        nameEn: product.name.En,
        nameRu: product.name.Ru,
        descriptionKz: product.description.Kz,
        descriptionEn: product.description.En,
        descriptionRu: product.description.Ru,
        price: product.price,
        imageUrl: product.imageUrl,
        ownerId: product.ownerId,
      },
    });
    return this.toDomain(data);
  }

  async update(id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    const result = await this.prisma.product.update({ where: { id }, data: this.toDb(data) });
    return this.toDomain(result);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
