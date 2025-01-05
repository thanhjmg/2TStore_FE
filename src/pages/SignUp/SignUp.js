import React, { useState } from 'react';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '../../configRoutes';
import { register, loginUser } from '../../services/authService';
export default function SignUp() {
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();

    const checkConfirmPassword = () => {
        var valueConfirmPassword = confirmPassword.trim();
        if (valueConfirmPassword.length === 0 || valueConfirmPassword !== password.trim()) {
            return '';
        } else {
            return valueConfirmPassword;
        }
    };

    const handleRegister = async () => {
        let user = {
            fullName: fullName,
            email: email.trim(),
            password: password,
            role: 'customer',
        };

        // Kiểm tra mật khẩu có khớp hay không
        var valueConfirmPassword = checkConfirmPassword();
        if (valueConfirmPassword) {
            const registerResult = await register(user, dispatch, navigate);

            if (!registerResult.success) {
                var login = await loginUser(user, dispatch, navigate);
                if (login) {
                    alert(registerResult.message);
                    navigate(config.routeConfig.home);
                }
                // Hiển thị thông báo lỗi nếu đăng ký thất bại
                return;
            }

            // Khi đăng ký và đăng nhập thành công, chuyển hướng và hiển thị thông báo
            // Chuyển hướng đến trang Home sau khi đăng nhập
            alert(registerResult.message);
        } else {
            alert('Mật khẩu nhập lại không trùng khớp');
        }
    };

    return (
        <div className="flex justify-center w-full h-auto">
            <div className="w-4/12 border flex justify-center rounded  h-auto">
                <div className="w-full p-5">
                    <p className="text-2xl flex justify-center font-bold text-black">Đăng ký</p>
                    <div className="w-full">
                        <div>Email:</div>
                        <input
                            type="text"
                            className="block p-2 pl-2  caret-lcn-blue-4 text-sm w-full rounded bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-full mt-5">
                        <div>Họ và tên:</div>
                        <input
                            type="text"
                            className="block p-2 pl-2  caret-lcn-blue-4 text-sm w-full rounded bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder"
                            placeholder="Tên người dùng"
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="w-full mt-5">
                        <div>Mật khẩu:</div>
                        <input
                            type="password"
                            className="block p-2 pl-2  caret-lcn-blue-4 text-sm w-full rounded bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder"
                            placeholder="Mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="w-full mt-5">
                        <div>Nhập lại mật khẩu:</div>
                        <input
                            type="password"
                            className="block p-2 pl-2  caret-lcn-blue-4 text-sm w-full rounded bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder"
                            placeholder="Nhập lại mật khẩu"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-5 flex row text-sm">
                        <div className="w-1/3"></div>
                        <div className="w-2/3 flex justify-end">
                            <p>Bạn đã có tài khoản ?</p>
                            <a href="/dang-nhap" className={'ml-1 text-[#0289FF] font-semibold'}>
                                Đăng nhập ngay
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
                            onClick={handleRegister}
                        >
                            Đăng ký
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
