import * as httpRequest from '../utils/httpRequest';

export const getAllProduct = async (sortBy, page) => {
    try {
        // Truyền sortBy vào URL dưới dạng query parameter
        const res = await httpRequest.get(`products/`, {
            params: { sort_by: sortBy, page: page },
        });

        return res || null; // Trả về dữ liệu nếu có, không thì trả về null
    } catch (error) {
        console.error('Error fetching products:', error);
        return null; // Xử lý lỗi
    }
};

export const searchProduct = async (sortBy, search) => {
    try {
        // Truyền sortBy vào URL dưới dạng query parameter
        const res = await httpRequest.get(`products/search/${search}`, {
            params: { sort_by: sortBy },
        });

        return res || null; // Trả về dữ liệu nếu có, không thì trả về null
    } catch (error) {
        console.error('Error fetching products:', error);
        return null; // Xử lý lỗi
    }
};

export const getProductLatest = async () => {
    try {
        const res = await httpRequest.get('productLatest/');

        if (!!res) {
            return res;
        } else return null;
    } catch (error) {
        return null;
    }
};

export const getProductDetailById = async (id, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('productDetailById/' + id, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        return null;
    }
};

export const getProductByBrand = async (sortBy, page, brand) => {
    try {
        // Gọi API mà không cần token (không cần axiosJWT)
        const res = await httpRequest.get(`productByBrand/${brand}`, { params: { sort_by: sortBy, page: page } });

        if (res) {
            return res; // Trả về dữ liệu nếu có
        } else {
            return null; // Trả về null nếu không có dữ liệu
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return null; // Nếu có lỗi, trả về null
    }
};
export const getProductByType = async (sortBy, page, name) => {
    try {
        // Gọi API mà không cần token (không cần axiosJWT)
        const res = await httpRequest.get(`productByType/${name}`, { params: { sort_by: sortBy, page: page } });

        if (res) {
            return res; // Trả về dữ liệu nếu có
        } else {
            return null; // Trả về null nếu không có dữ liệu
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return null; // Nếu có lỗi, trả về null
    }
};
export const getProductBySlug = async (name) => {
    try {
        // Gọi API mà không cần token (không cần axiosJWT)
        const res = await httpRequest.get(`productBySlug/${name}`);

        if (res) {
            return res; // Trả về dữ liệu nếu có
        } else {
            return null; // Trả về null nếu không có dữ liệu
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return null; // Nếu có lỗi, trả về null
    }
};
export const getProductType = async () => {
    try {
        const productType = await httpRequest.get('productType/');
        if (productType) {
            return productType;
        } else {
            return null;
        }
    } catch (error) {
        return error;
    }
};
