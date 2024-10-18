import * as features from '#features';

const v1 = [
  // NEW ROUTE HERE ->
  ...features._exampleRoutes,
  ...features.productRoutes,
  ...features.courierRoutes,
  ...features.supplierRoutes,
  ...features.categoryRoutes,
  ...features.userRoutes,
];

export default v1;
