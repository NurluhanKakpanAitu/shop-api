import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProductQueryDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  page?: number;

  @ApiPropertyOptional({ example: 10, default: 10 })
  limit?: number;

  @ApiPropertyOptional({ example: 'phone' })
  search?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'asc' })
  sortOrder?: 'asc' | 'desc';
}
