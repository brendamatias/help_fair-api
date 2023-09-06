import { errors } from '../../exceptions/errors';
import { ApiError } from '../../exceptions';
import User from '../../models/User';
import response from '../../config/response';

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export default async ({ name, email, password }: CreateUserRequest) => {
  const userExists = await User.findOne({ email });

  if (userExists) throw new ApiError(errors.USER_ALREADY_CREATED);

  const user = await User.create({ name, email, password });

  return response.created(user);
};
