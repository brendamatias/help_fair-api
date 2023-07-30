import { ObjectId } from 'mongodb';
import responses from '@/config/response';
import FairProduct from '@/models/FairProduct';

export default async (fair: string) => {
  const products = await FairProduct.find({ fair: new ObjectId(fair) }).exec();

  return responses.success(products);
};
