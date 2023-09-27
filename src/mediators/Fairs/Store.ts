import { ObjectId } from 'mongodb';
import response from '../../config/response';
import { ApiError } from '../../exceptions';
import { errors } from '../../exceptions/errors';
import Fair from '../../models/Fair';
import FairProduct from '../../models/FairProduct';

type CreateFairRequest = {
  name: string;
  template: string;
  userId: string;
};

export default async ({ name, template, userId }: CreateFairRequest) => {
  const fairExist = await Fair.findOne({ name, userId, active: true }).exec();

  if (fairExist) throw new ApiError(errors.FAIR_ALREADY_CREATED);

  const fair = await Fair.create({ name, userId });
  const fairProducts = await FairProduct.find({ fair: new ObjectId(template) }).exec();

  const fairProductsFormatted = fairProducts.map((item) => ({
    name: item.name,
    price: item.price,
    fair: fair._id,
    qty: 0,
    bought: false,
    measure: 'un',
    category: 'unknown',
  }));

  if (template) {
    await FairProduct.insertMany(fairProductsFormatted);
  }

  return response.created(fair);
};
