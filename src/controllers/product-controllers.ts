import { Request, Response } from 'express';
import Products from '../db/shemas/products';

const getProducts = async (req: Request, res: Response): Promise<void> => {
  const products = await Products.find();
  res.send(products);
};

// const getProducts = (req: Request, res: Response): void => {
//   const itemsPerPage = 3;
//   const page: number = parseInt(req.query.page as string);
//   const start = (page - 1) * itemsPerPage;
//   const total: number = products.length;
//   const end: number = page * itemsPerPage;
//   console.log(start);
//   res.send({
//     page: page,
//     per_page: itemsPerPage,
//     total: total,
//     total_pages: Math.ceil(products.length / itemsPerPage),
//     data: products.slice(start, end),
//   });
// };

const getProductsById = async (req: Request, res: Response): Promise<void> => {
  const { productId } = req.params;
  const product = await Products.findById(productId);
  if (productId) {
    res.send(product);
  } else {
    res.status(404).send({});
  }
};

// const getProductsById = (req: Request, res: Response): void => {
//   const { productId } = req.params;
//   const index = products.findIndex((item) => item.id === parseInt(productId));
//   if (index !== -1) {
//     res.send(products[index]);
//   } else {
//     res.status(404).send({});
//   }
// };

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, year, color, pantone_value } = req.body;
    const newProduct = await Products.create({
      name,
      year,
      color,
      pantone_value,
    });
    res.send(newProduct);
  } catch (error) {
    res.status(404).send(error);
  }
};

// const createProduct = (req: Request, res: Response): void => {
//   console.log(req);
//   const { name, year, color, pantone_value }: Product = req.body;
//   const newProduct: Product = {
//     id: products.length,
//     name,
//     year,
//     color,
//     pantone_value,
//   };

//   products.push(newProduct);
//   res.send(newProduct);
// };

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, year, color, pantone_value } = req.body;
    const { productId } = req.params;
    const updateProduct = await Products.findByIdAndUpdate(productId, {
      name: name,
      year: year,
      color: color,
      pantone_value: pantone_value,
    });
    res.send(updateProduct);
  } catch (error) {
    res.status(404).send(error);
  }
};

// const updateProduct = (req: Request, res: Response): void => {
//   const { name, year, color, pantone_value }: Product = req.body;
//   const id = parseInt(req.params.productId);
//   const index = products.findIndex((item) => item.id === id);
//   if (index !== -1) {
//     products[index] = {
//       id,
//       name,
//       year,
//       color,
//       pantone_value,
//     };
//     res.send({ data: products[index] });
//   } else {
//     res.status(404).send({});
//   }
//   console.log(updateProduct);
// };

const partyUpdateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, year, color, pantone_value } = req.body;
    const { productId } = req.params;
    const product = await Products.findById(productId);
    if (product) {
      (product.name = name || product.name),
        (product.year = year || product.year),
        (product.color = color || product.color),
        (product.pantone_value = pantone_value || product.pantone_value),
        await product.save();
      res.send({ data: product });
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

// const partyUpdateProduct = (req: Request, res: Response): void => {
//   const { name, year, color, pantone_value }: Product = req.body;
//   const id = parseInt(req.params.productId);
//   const index = products.findIndex((item) => item.id === id);
//   if (index !== -1) {
//     const product = products[index];
//     products[index] = {
//       id: id || product.id,
//       name: name || product.name,
//       year: year || product.year,
//       color: color || product.color,
//       pantone_value: pantone_value || product.pantone_value,
//     };
//     res.send({ data: products[index] });
//   } else {
//     res.status(404).send({});
//   }
// };

// const updateProductNotify = (req: Request, res: Response): void => {
//   const id = parseInt(req.params.productId);
//   const { client, data } = req.body;
//   console.log(id);
//   const { name, year, color, pantone_value }: Product = data;
//   const index = products.findIndex((item) => item.id === id);
//   if (index !== -1) {
//     products[index] = {
//       id,
//       name,
//       year,
//       color,
//       pantone_value,
//     };
//     res.send({ data: products[index], message: `email sent to ${client}` });
//   } else {
//     res.status(404).send({});
//   }
// };

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  partyUpdateProduct,
  //updateProductNotify,
};
