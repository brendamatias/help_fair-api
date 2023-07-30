import response from '../../config/response';
import FairProduct from '../../models/FairProduct';

type UpdateProductRequest = {
  id: string;
  name?: string;
  price?: number;
  qty?: number;
  bought?: boolean;
};

export default async ({ id, name, price, qty, bought }: UpdateProductRequest) => {
  const product = await FairProduct.findByIdAndUpdate(id, { name, price, qty, bought }, { new: true }).exec();

  return response.success(product);
};
