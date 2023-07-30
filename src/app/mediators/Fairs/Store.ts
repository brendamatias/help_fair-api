import response from '@/config/response';
import Fair from '@/models/Fair';

type CreateFairRequest = {
  name: string;
};

export default async ({ name }: CreateFairRequest) => {
  const fair = await Fair.create({ name });

  return response.created(fair);
};
