import { errors } from '../../exceptions/errors';
import { ApiError } from '../../exceptions';
import User from '../../models/User';
import response from '../../config/response';

type CreateSessionRequest = {
  email: string;
  password: string;
};

export default async ({ email, password }: CreateSessionRequest) => {
  const user = await User.findOne({ email });

  if (!user) throw new ApiError(errors.USER_NOT_FOUND);

  if (!(await user.checkPassword(password))) throw new ApiError(errors.PASSWORD_INCORRECT);

  const token = await user.generateToken();

  return response.created({
    user,
    token,
  });
};
