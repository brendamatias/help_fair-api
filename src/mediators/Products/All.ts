import responses from '@/config/response';
import Product from '@/models/Product';

export default async () => {
  const products = await Product.find().exec();

  return responses.success(products);
};
