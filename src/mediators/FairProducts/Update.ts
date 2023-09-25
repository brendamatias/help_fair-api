import response from '../../config/response';
import FairProduct, { Category, Measure } from '../../models/FairProduct';

type UpdateProductRequest = {
  id: string;
  name?: string;
  price?: number;
  qty?: number;
  bought?: boolean;
  measure: Measure;
  category: Category;
};

export default async ({ id, name, price, qty, bought, measure, category }: UpdateProductRequest) => {
  const product = await FairProduct.findByIdAndUpdate(
    id,
    { name, price, qty, bought, measure, category },
    { new: true }
  ).exec();

  return response.success(product);
};
