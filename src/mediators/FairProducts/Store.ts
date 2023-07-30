import response from '@/config/response';
import Product from '@/models/Product';
import FairProduct from '@/models/FairProduct';
import { ApiError } from '@/exceptions';
import { errors } from '@/exceptions/errors';

type CreateProductRequest = {
  name: string;
  fair: string;
};

export default async ({ name, fair }: CreateProductRequest) => {
  const product = await Product.findOne({ name }).exec();

  if (!product) await Product.create({ name });

  const fairProductExists = await FairProduct.findOne({ name, fair }).exec();
  if (fairProductExists) throw new ApiError(errors.FAIR_PRODUCT_ALREADY_CREATED);

  const fairProduct = await FairProduct.create({ name, fair });

  return response.created(fairProduct);
};
