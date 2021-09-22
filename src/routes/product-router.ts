import { Router } from 'express';
import * as productsController from '../controllers/product-controllers';
import { checkAuth } from '../middleware/auth-middleware';

export const routerProduct = Router();

routerProduct.get('', checkAuth, productsController.getProducts);
routerProduct.get('/:productId', productsController.getProductsById);
routerProduct.post('/create', productsController.createProduct);
routerProduct.put('/:productId', productsController.updateProduct);
routerProduct.patch('/:productId', productsController.partyUpdateProduct);
