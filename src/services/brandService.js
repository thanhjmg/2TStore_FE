import * as httpRequest from '../utils/httpRequest';
export const getAllBrand = async () => {
    try {
        const brands = await httpRequest.get('brand/');
        if (brands) {
            return brands;
        } else {
            return null;
        }
    } catch (error) {
        return error;
    }
};
