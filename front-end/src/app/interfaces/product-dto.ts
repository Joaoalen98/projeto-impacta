import { ProductImageDTO } from "./product-image-dto";

export interface ProductDto {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    supplierId?: number;
    images?: ProductImageDTO[];
}
