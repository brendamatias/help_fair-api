import { ObjectId } from 'mongodb';
import response from '../../config/response';
import Fair from '../../models/Fair';
import { errors } from '../../exceptions/errors';
import { ApiError } from '../../exceptions';

export default async (id: string, userId: string) => {
  const fair = await Fair.findOne({ _id: new ObjectId(id), userId: new ObjectId(userId) }).exec();

  if (!fair) throw new ApiError(errors.FAIR_NOT_FOUND);

  fair.active = false;

  await fair.save();

  return response.noContent();
};
