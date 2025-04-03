import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import T1 from '~/images/T1.png';
import style from './loginLayout.module.scss';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(style);
function LoginLayout({ children }) {
    const location = useLocation(); // Lấy đường dẫn hiện tại
    const isCheckoutPage = location.pathname !== '/checkout';

    return (
        <div className={cx(isCheckoutPage ? 'bg-img' : 'bg-white', 'w-full h-screen ')}>
            <div className={cx('h-1/6 w-full flex justify-start items-center')}>
                <img src={T1} alt="logo" className="bg-none h-60" />
                <div className="font-bold text-red-600 text-8xl italic">2T Shop</div>
            </div>
            <div className={cx('flex')}>{children}</div>
        </div>
    );
}
LoginLayout.propTypes = {
    children: PropTypes.node,
};

export default LoginLayout;
