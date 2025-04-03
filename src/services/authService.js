import { loginSuccess } from '../redux/Slice/authSlice';
import * as httpRequest from '../utils/httpRequest';

export const loginUser = async (user, dispatch, navigate) => {
    try {
        const dataUser = await httpRequest.post('/login', user, { withCredentials: true });
        if (!!dataUser) {
            if (dataUser.role !== 'customer') {
                return false;
            }
        }

        // Dispatch action từ component thay vì sử dụng hook ở đây
        dispatch(loginSuccess(dataUser));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const register = async (user, navigate, dispatch) => {
    try {
        const res = await httpRequest.post('/register', user, { withCredentials: true });
        // dispatch(userSignUp(null)); // xoa signUp

        if (!!res) {
            return res;
        }
        return true;

        // navigate(config.routeConfig.friends)
        // return res;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return { success: false, message: error.response.data.message }; // Trả về thông báo lỗi cụ thể
        }
    }
};
export const getRefreshToken = async () => {
    try {
        const res = await httpRequest.get(
            'refresh-token',

            {
                withCredentials: true,
            },
        );

        return res;
    } catch (error) {
        return null;
    }
};
