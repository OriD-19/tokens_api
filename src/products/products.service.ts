import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ) { }

    create(createProductDto: CreateProductDto) {
        return this.productsRepository.save(createProductDto);
    }

    findAll() {
        return this.productsRepository.find();
    }

}
