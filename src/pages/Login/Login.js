import React, { useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import config from '../../configRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../services/authService';

export default function Login() {
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // const handleLogin = async () => {
    //     let user = { email: email.trim(), password: password };

    //     var login = await loginUser(user, dispatch, navigate);

    //     if (login === false) {
    //         alert('Mã nhân viên hoặc mật khẩu sai');
    //         return;
    //     } else navigate(config.routeConfig.home);
    //     //navigate(config.routeConfig.home);
    // };
    const onSubmit = async (data) => {
        let user = { email: data.email.trim(), password: data.password };

        var login = await loginUser(user, dispatch, navigate);

        if (login === false) {
            alert('Mã nhân viên hoặc mật khẩu sai');
            return;
        } else navigate(config.routeConfig.home);
    };
    return (
        <div className="flex justify-end mr-10 w-full h-auto ">
            <div className="w-4/12 border flex justify-end rounded   h-auto">
                <div className="w-full p-5">
                    <p className="text-2xl flex justify-center font-bold text-white">Đăng nhập</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="text-white flex flex-col gap-5">
                        {Object.keys(errors).length > 0 && (
                            <p className="text-red-500 text-sm">Vui lòng nhập đầy đủ thông tin</p>
                        )}
                        <div>Email:</div>
                        <input
                            {...register('email', { required: true })}
                            className="block p-2 pl-2 caret-lcn-blue-4 text-white text-lg w-full rounded bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder"
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                        <div>Mật khẩu:</div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', { required: true })}
                                className="block p-2 pl-2  caret-lcn-blue-4 text-white  text-lg w-full rounded bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder"
                            />
                            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-5 transform -translate-y-1/2 text-lcn-blue-4"
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
                        <div className="flex justify-center mt-5">
                            <button
                                type="submit"
                                className=" 
                                    p-0 m-0 w-48 h-10 items-center 
                                    border border-blue-900 rounded outline-none text-white
                                    bg-blue-500 flex justify-center text-xl
                                "
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
