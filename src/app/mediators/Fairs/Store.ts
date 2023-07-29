import response from '../../../config/response';
import Fair from '../../models/Fair';

type CreateUserRequest = {
  name: string;
};

export default async ({ name }: CreateUserRequest) => {
  const fair = await Fair.create({ name });

  return response.created(fair);
};
