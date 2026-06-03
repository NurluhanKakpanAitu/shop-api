import { Product } from './product.model';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface FindPaginatedParams {
  page: number;
  limit: number;
  search?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByOwnerId(ownerId: string): Promise<Product[]>;
  findPaginated(params: FindPaginatedParams): Promise<PaginatedResult<Product>>;
  create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>;
  update(id: string, data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product>;
  delete(id: string): Promise<void>;
}
