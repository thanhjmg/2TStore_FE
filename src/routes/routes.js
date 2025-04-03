import routeConfig from '../configRoutes';
import Home from '../pages/Home';
import ProductDetail from '../pages/Product/ProductDetail';
import GioHang from '../pages/Cart/Cart';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import Product from '../pages/Product/Product';
import CheckOut from '../pages/CheckOut';
import { LoginLayout } from '../layout';

const publicRoutes = [
    {
        path: routeConfig.routeConfig.home,
        element: Home,
    },
    {
        path: routeConfig.routeConfig.checkout,
        element: CheckOut,
        layout: LoginLayout,
    },

    {
        path: routeConfig.routeConfig.productDetail,
        element: ProductDetail,
    },
    {
        path: routeConfig.routeConfig.product,
        element: Product,
    },
    {
        path: routeConfig.routeConfig.productType,
        element: Product,
    },
    {
        path: routeConfig.routeConfig.productBrand,
        element: Product,
    },
    {
        path: routeConfig.routeConfig.gioHang,
        element: GioHang,
    },
    {
        path: routeConfig.routeConfig.login,
        element: Login,
        layout: LoginLayout,
    },
    {
        path: routeConfig.routeConfig.signup,
        element: SignUp,
        layout: LoginLayout,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
