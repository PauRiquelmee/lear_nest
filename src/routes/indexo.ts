import { Application } from 'express';
import * as usersController from '../controllers/user-controller';
import * as productsController from '../controllers/product-controllers';

const createRoutes = (app: Application): void => {
  app.post('/api/user/create', usersController.createUser);
  app.get('/api/users', usersController.getUsers);
  app.get('/api/users/:userId', usersController.getUsersById);
  app.get('/api/products', productsController.getProducts);
  app.get('/api/products/:productId', productsController.getProductsById);
  app.post('/api/products/create', productsController.createProduct);
  app.put('/api/products/:productId', productsController.updateProduct);
  app.patch('/api/products/:productId', productsController.partyUpdateProduct);
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
