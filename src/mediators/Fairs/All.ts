import responses from '@/config/response';
import Fair from '@/models/Fair';

export default async () => {
  const fairs = await Fair.find().exec();

  return responses.success(fairs);
};
