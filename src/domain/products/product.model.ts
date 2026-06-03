import { Translation } from '../value-objects/translation.value-object';

export class Product {
  id: string;
  name: Translation;
  description: Translation;
  price: number;
  imageUrl: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}