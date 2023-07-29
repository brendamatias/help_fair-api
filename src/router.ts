import { Router } from 'express';

const router: Router = Router();

router.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

export default router;
