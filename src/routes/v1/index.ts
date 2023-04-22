import express, { Router } from 'express';
import authRoute from './auth.route';
import docsRoute from './swagger.route';
import userRoute from './user.route';
import productRoute from './product.route';
import categoryRoute from './category.route';
import preferenceRoute from './preference.route';
import groupRoute from './group.route';
import groupPreferenceRoute from './group_preference.route';
import productPreferenceRoute from './product_preference.route';
import config from '../../config/config';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/preferences',
    route: preferenceRoute,
  },
  {
    path: '/groups',
    route: groupRoute,
  },
  {
    path: '/group_preferences',
    route: groupPreferenceRoute,
  },
  {
    path: '/product_preferences',
    route: productPreferenceRoute,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
