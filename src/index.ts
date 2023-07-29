import { connect } from 'mongoose';
import app from './app';
import { env } from './env';

connect(env.MONGO_URL);

app.listen(env.PORT, () => {
  console.log(`🔥 Server started`);
});
