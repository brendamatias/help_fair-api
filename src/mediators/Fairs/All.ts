import mongoose from 'mongoose';
import responses from '../../config/response';
import Fair from '../../models/Fair';

export default async (userId: string) => {
  const fairs = await Fair.aggregate([
    { $match: { active: true, userId: new mongoose.Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'fairproducts',
        localField: '_id',
        foreignField: 'fair',
        pipeline: [
          {
            $project: {
              total: {
                $multiply: ['$price', '$qty'],
              },
            },
          },
        ],
        as: 'result',
      },
    },
    {
      $project: {
        name: 1,
        status: 1,
        active: 1,
        createdAt: 1,
        total: {
          $sum: '$result.total',
        },
      },
    },
  ]).exec();

  return responses.success(fairs);
};
