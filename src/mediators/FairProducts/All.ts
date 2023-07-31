import { ObjectId } from 'mongodb';
import responses from '../../config/response';
import FairProduct from '../../models/FairProduct';

export default async (fair: string) => {
  const products = await FairProduct.find({ fair: new ObjectId(fair) })
    .sort({ bought: 1, createdAt: -1 })
    .exec();

  return responses.success(products);
};
