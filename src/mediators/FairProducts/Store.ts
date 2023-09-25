import response from '../../config/response';
import Product from '../../models/Product';
import FairProduct, { Category, Measure } from '../../models/FairProduct';
import { ApiError } from '../../exceptions';
import { errors } from '../../exceptions/errors';

type CreateProductRequest = {
  name: string;
  price: number;
  qty: number;
  measure: Measure;
  category: Category;
  fair: string;
};

export default async ({ name, fair, price, qty, measure, category }: CreateProductRequest) => {
  const product = await Product.findOne({ name }).exec();

  if (!product) await Product.create({ name });

  const fairProductExists = await FairProduct.findOne({ name, fair }).exec();
  if (fairProductExists) throw new ApiError(errors.FAIR_PRODUCT_ALREADY_CREATED);

  const fairProduct = await FairProduct.create({ name, fair, price, qty, measure, category });

  return response.created(fairProduct);
};
