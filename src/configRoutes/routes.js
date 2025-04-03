//level 1
const home = '/';
const phone = '/dien-thoai';
const productDetail = '/:name';
const product = '/san-pham';
const productBrand = '/san-pham/brand/:brandName';
const productType = '/san-pham/:typeName';
const gioHang = '/gio-hang';
const login = '/dang-nhap';
const signup = '/dang-ky';
const checkout = '/checkout';
// level 2

const routes = {
    home: home,
    phone: phone,
    productDetail: productDetail,
    gioHang: gioHang,
    login: login,
    signup: signup,
    product: product,
    productType: productType,
    productBrand: productBrand,
    checkout: checkout,
};
export default routes;
