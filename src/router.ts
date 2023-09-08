import { Router } from 'express';

import FairController from './controllers/FairController';
import FairProductController from './controllers/FairProductController';
import ProductController from './controllers/ProductController';
// import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

import authMiddleware from './middlewares/auth';

const router: Router = Router();

router.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳');
});

// router.post('/users', UserController.store);
router.post('/sessions', SessionController.store);

router.use(authMiddleware);

router.get('/fairs', FairController.index);
router.post('/fairs', FairController.store);
router.get('/fairs/:id', FairController.show);

router.get('/fairs/:fairId/products', FairProductController.index);
router.put('/fairs/:fairId/products/:id', FairProductController.update);
router.post('/fairs/:fairId/products', FairProductController.store);
router.delete('/fairs/:fairId/products/:id', FairProductController.delete);
router.get('/products', ProductController.index);

export default router;
