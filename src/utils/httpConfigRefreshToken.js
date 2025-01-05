import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { getRefreshToken } from '../services/authService';

import { loginSuccess } from '~/redux/Slice/authSlice';

export const getAxiosJWT = (dispatch, currAccount) => {
    const axiosJWT = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
    });

    const token = currAccount?.accessToken;

    axiosJWT.interceptors.request.use(
        async (config) => {
            if (!token) {
                console.error('Token không tồn tại!');
                return config; // Không làm gì thêm nếu token không tồn tại
            }

            const currDate = new Date();
            const decodeToken = jwtDecode(token);

            // Kiểm tra token đã hết hạn
            if (decodeToken.exp < currDate.getTime() / 1000) {
                try {
                    const newToken = await getRefreshToken();

                    // Cập nhật lại currAccount với token mới
                    const refreshUser = {
                        ...currAccount,
                        accessToken: newToken.accessToken,
                    };

                    dispatch(loginSuccess(refreshUser));

                    // Gắn token mới vào headers
                    config.headers['token'] = 'bearer ' + newToken.accessToken;
                } catch (error) {
                    console.error('Lỗi khi refresh token:', error);
                }
            }

            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );

    return axiosJWT;
};
