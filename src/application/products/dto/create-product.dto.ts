import { ApiProperty } from '@nestjs/swagger';

class TranslationDto {
  @ApiProperty({ example: 'Өнім атауы' })
  Kz: string;

  @ApiProperty({ example: 'Product name' })
  En: string;

  @ApiProperty({ example: 'Название продукта' })
  Ru: string;
}

export class CreateProductDto {
  @ApiProperty({ type: TranslationDto })
  name: TranslationDto;

  @ApiProperty({ type: TranslationDto })
  description: TranslationDto;

  @ApiProperty({ example: 1500 })
  price: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  imageUrl: string;
}
