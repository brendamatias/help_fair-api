import { Router } from 'express';

import FairController from './app/controllers/FairController';
import FairProductController from './app/controllers/FairProductController';
import ProductController from './app/controllers/ProductController';

const router: Router = Router();

router.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

router.get('/fairs', FairController.index);
router.post('/fairs', FairController.store);
router.get('/fairs/:id', FairController.show);
router.get('/fairs/:fairId/products', FairProductController.index);
router.put('/fairs/:fairId/products/:id', FairProductController.update);
router.post('/fairs/:fairId/products', FairProductController.store);
router.get('/products', ProductController.index);

export default router;
