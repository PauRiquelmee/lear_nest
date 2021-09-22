import { Application } from 'express';
import * as productsController from '../controllers/product-controllers';
import { routerProduct } from './product-router';
import { routerUser } from './user-router';

const createRoutes = (app: Application): void => {
  app.use('/api/users', routerUser);
  app.use('/api/products', routerProduct);
  // app.post(
  //   '/api/products/:productId/notification',
  //   productsController.updateProductNotify
  // );
  // app.delete(
  //   '/api/products/:productId/delete',
  //   productsController.partyUpdateProduct
  // );
};

export { createRoutes };
