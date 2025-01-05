import React, { useState } from 'react';
import Button from '../../components/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from '../../configRoutes';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../services/authService';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleLogin = async () => {
        let user = { email: email.trim(), password: password };

        var login = await loginUser(user, dispatch, navigate);

        if (login === false) {
            alert('Mã nhân viên hoặc mật khẩu sai');
            return;
        } else navigate(config.routeConfig.home);
        //navigate(config.routeConfig.home);
    };
    return (
        <div className="flex justify-center w-full h-auto">
            <div className="w-4/12 border flex justify-center rounded  h-auto">
                <div className="w-full p-5">
                    <p className="text-2xl flex justify-center font-bold text-black">Đăng nhập</p>
                    <div className="w-full">
                        <div>Email:</div>
                        <input
                            type="text"
                            className="block p-2 pl-2  caret-lcn-blue-4 text-sm w-full rounded bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-full mt-5 relative">
                        <div>Mật khẩu:</div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="block p-2 pl-2 pr-10 caret-lcn-blue-4 text-sm w-full rounded bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder"
                            placeholder="Mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-10 transform -translate-y-1/2 text-lcn-blue-4"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="mt-5 flex row text-sm">
                        <div className="w-1/3">Quên mật khẩu?</div>
                        <div className="w-2/3 flex justify-end">
                            <p>Bạn chưa có tài khoản ?</p>
                            <a href="/dang-ky" className={'ml-1 text-[#0289FF] font-semibold'}>
                                Đăng ký ngay
                            </a>
                        </div>
                    </div>

                    <div className="flex justify-center p-5">
                        <Button
                            className="
                                p-0 m-0 w-48 h-10 items-center 
                                border border-blue-900 rounded outline-none text-white
                                bg-blue-500 flex justify-center text-xl
                            "
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
