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
};
export default routes;
