import { ApiPropertyOptional } from '@nestjs/swagger';

class TranslationDto {
  @ApiPropertyOptional({ example: 'Өнім атауы' })
  Kz: string;

  @ApiPropertyOptional({ example: 'Product name' })
  En: string;

  @ApiPropertyOptional({ example: 'Название продукта' })
  Ru: string;
}

export class UpdateProductDto {
  @ApiPropertyOptional({ type: TranslationDto })
  name?: TranslationDto;

  @ApiPropertyOptional({ type: TranslationDto })
  description?: TranslationDto;

  @ApiPropertyOptional({ example: 2000 })
  price?: number;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  imageUrl?: string;
}
