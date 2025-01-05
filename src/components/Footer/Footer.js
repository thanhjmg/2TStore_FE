import React from 'react';
import logo_visa from '~/images/logo-visa.png';
import logo_master from '~/images/logo-master.png';
import vn_post from '~/images/vnpost.jpg';
import nhattin from '~/images/nhattin.jpg';

export default function Footer() {
    return (
        <div className="w-full h-auto bg-green-900 rounded text-white">
            <div>
                <div className="flex">
                    <div className="w-1/6 p-5">
                        <div className="font-semibold">Hỗ trợ dịch vụ</div>
                        <div className="text-sm">
                            Chính sách và hướng dẫn mua hàng trả góp Hướng dẫn mua hàng và chính sách vận chuyển Tra cứu
                            đơn hàng Chính sách đổi mới và bảo hành Dịch vụ bảo hành mở rộng Chính sách bảo mật Chính
                            sách giải quyết khiếu nại Quy chế hoạt động
                        </div>
                    </div>
                    <div className="w-1/6 p-5">
                        <div className="font-semibold">Thông tin liên hệ</div>
                        <div className="text-sm">
                            Thông tin các trang TMĐT Dịch vụ sửa chữa Hoàng Hà Care Khách hàng doanh nghiệp (B2B) Tra
                            cứu bảo hành
                        </div>
                    </div>
                    <div className="w-1/6 p-5">
                        <div className="font-semibold">Hệ thống 200 siêu thị toàn quốc</div>
                    </div>
                    <div className="w-1/6 p-5">
                        <div className="font-semibold">Tổng đài</div>
                        <div className="text-xl border-2 text-center w-auto rounded bg-white text-green-900 font-bold">
                            19002091
                        </div>
                    </div>
                    <div className="w-1/6 p-5">
                        <div className="font-semibold">Thanh toán miễn phí</div>
                        <div className="text-sm flex flex-wrap">
                            <img src={logo_visa} alt="" className="mr-3" />
                            <img src={logo_master} alt="" />
                        </div>
                    </div>
                    <div className="w-1/6 p-5">
                        <div className="font-semibold">Hình thức vận chuyển</div>
                        <div className="text-sm flex flex-wrap">
                            <img src={vn_post} alt="" className="mr-3" />
                            <img src={nhattin} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center text-sm">
                <p>
                    © 2020. CÔNG TY CỔ PHẦN XÂY DỰNG VÀ ĐẦU TƯ THƯƠNG MẠI HOÀNG HÀ. MST: 0106713191. (Đăng ký lần đầu:
                    Ngày 15 tháng 12 năm 2014, Đăng ký thay đổi ngày 24/11/2022)
                </p>
                <p className="font-semibold">GP số 426/GP-TTĐT do sở TTTT Hà Nội cấp ngày 22/01/2021</p>
                <p>
                    Địa chỉ: Số 89 Đường Tam Trinh, Phường Mai Động, Quận Hoàng Mai, Thành Phố Hà Nội, Việt Nam. Điện
                    thoại: 1900.2091. Chịu trách nhiệm nội dung: Nguyễn Tuấn Thanh.
                </p>
            </div>
        </div>
    );
}
