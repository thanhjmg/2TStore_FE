import routeConfig from '../configRoutes';

import Home from '../pages/Home';
import ProductDetail from '../pages/Product/ProductDetail';

//public
const publicRoutes = [
    {
        path: routeConfig.routeConfig.home,
        component: Home,
    },
    {
        path: routeConfig.routeConfig.phone,
        component: Home,
    },
    {
        path: routeConfig.routeConfig.iphone11,
        component: Home,
    },
    {
        path: routeConfig.routeConfig.iphone12,
        component: Home,
    },
    {
        path: routeConfig.routeConfig.productDetail,
        component: ProductDetail,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
