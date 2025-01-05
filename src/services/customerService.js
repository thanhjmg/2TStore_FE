import * as httpRequest from '../utils/httpRequest';
import { userLogin } from '../redux/Slice/signInSlice';

export const getCustomerById = async (id, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('customer/' + id, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!!res) {
            return res.data;
        } else return null;
    } catch (error) {
        return null;
    }
};
