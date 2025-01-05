import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import T1 from '~/images/T1.png';
import style from './loginLayout.module.scss';

const cx = classNames.bind(style);
function LoginLayout({ children }) {
    return (
        <div className={cx('bg-gradient-layout', 'w-full h-screen ')}>
            <div className={cx('h-1/6 w-full flex justify-center items-center')}>
                <img src={T1} alt="logo" className="bg-none h-28" />
                <div className="font-bold text-green-900 text-6xl italic">2T Shop</div>
            </div>
            <div className={cx('flex justify-center items-center')}>{children}</div>
        </div>
    );
}
LoginLayout.propTypes = {
    children: PropTypes.node,
};

export default LoginLayout;
