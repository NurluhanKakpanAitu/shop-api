import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from '../../domain/users/user-role.enum';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SELLER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать продукт' })
  create(@Body() dto: CreateProductDto, @Req() req: { user: { id: string } }) {
    return this.productsService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все продукты' })
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findPaginated(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить продукт по ID' })
  findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SELLER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить продукт' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto, @Req() req: { user: { id: string } }) {
    return this.productsService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.SELLER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить продукт' })
  delete(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.productsService.delete(id, req.user.id);
  }
}
