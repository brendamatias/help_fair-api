import responses from '../../config/response';
import Fair from '../../models/Fair';

export default async (userId: string) => {
  const fairs = await Fair.find({ userId, active: true }).exec();

  return responses.success(fairs);
};
