import response from '../../config/response';
import Fair from '../../models/Fair';

export default async (id: string) => {
  const fair = await Fair.findById(id).exec();

  return response.success(fair);
};
