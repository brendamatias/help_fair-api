import response from '../../config/response';
import FairProduct from '../../models/FairProduct';
import { errors } from '../../exceptions/errors';
import { ApiError } from '../../exceptions';

export default async (id: string) => {
  const fairProductExists = await FairProduct.findById(id).exec();
  if (!fairProductExists) throw new ApiError(errors.FAIR_PRODUCT_NOT_FOUND);

  await fairProductExists.deleteOne();

  return response.noContent();
};
