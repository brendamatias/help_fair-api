import { Router } from 'express';

import FairController from './app/controllers/FairController';

const router: Router = Router();

router.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

router.get('/fairs', FairController.index);
router.post('/fairs', FairController.store);

export default router;
