import * as features from '#features';

const v1 = [
  // NEW ROUTE HERE ->
    ...features.productRoutes,
  ...features.userRoutes,
  ...features._exampleRoutes,
];
export default v1;
