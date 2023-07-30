import response from '@/config/response';
import FairProduct from '@/models/FairProduct';

type CreateProductRequest = {
  name: string;
  fair: string;
};

export default async ({ name, fair }: CreateProductRequest) => {
  const product = await FairProduct.create({ name, fair });

  return response.created(product);
};
