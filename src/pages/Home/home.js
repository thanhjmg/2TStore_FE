import React, { useState } from 'react';
import ItemProduct from '../Product/ItemProduct';
import Menu from './../../components/Menu/Menu';
function Home() {
    const [selectedMenu, setSelectedMenu] = useState('home');
    const handleMenuChange = (item) => {
        setSelectedMenu(item);
    };
    console.log('kk', selectedMenu);
    const dataProduct = [
        {
            id: 1,
            name: 'Iphone 15 Pro Max (256GB)- Chính hãng VN/A',
            image: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png',
        },
        {
            id: 2,
            name: 'Iphone14',
            image: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/c/3/c3845789-dda7-44d7-a9eb-bb8e775c9ffb.png',
        },
        {
            id: 3,
            name: 'Iphone15',
            image: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png',
        },
        {
            id: 4,
            name: 'Iphone14',
            image: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png',
        },
        {
            id: 5,
            name: 'Iphone15',
            image: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png',
        },
        {
            id: 6,
            name: 'Iphone14',
            image: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png',
        },
        {
            id: 7,
            name: 'Iphone15',
            image: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png',
        },
        {
            id: 8,
            name: 'Iphone14',
            image: 'https://cdn.hoanghamobile.com/i/preview/Uploads/2023/09/13/iphone-15-blue-pure-back-iphone-15-blue-pure-front-2up-screen-usen.png',
        },
    ];

    return (
        <div>
            <div className="w-full flex flex-wrap">
                {dataProduct.map((item) => (
                    <div className="w-1/6 mt-5 p-1" key={item.id}>
                        <ItemProduct data={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
