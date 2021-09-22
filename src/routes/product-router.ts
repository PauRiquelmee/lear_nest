import { Router } from 'express';
import * as productsController from '../controllers/product-controllers';

export const routerProduct = Router();

routerProduct.get('', productsController.getProducts);
routerProduct.get('/:productId', productsController.getProductsById);
routerProduct.post('/create', productsController.createProduct);
routerProduct.put('/:productId', productsController.updateProduct);
routerProduct.patch('/:productId', productsController.partyUpdateProduct);
