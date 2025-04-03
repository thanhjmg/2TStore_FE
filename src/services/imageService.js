import * as httpRequest from '../utils/httpRequest';
export const getImageByType = async (type) => {
    try {
        const imgByType = await httpRequest.get(`image/${type}`);
        if (imgByType) {
            return imgByType;
        } else {
            return null;
        }
    } catch (error) {
        return error;
    }
};
