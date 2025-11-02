import React, { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status');
    const type = searchParams.get('type') || 'order';
    const { setCartItems } = useContext(StoreContext);



    const renderContent = () => {
        if (status === 'success') {
            setCartItems({}); // Clear cart on successful order


            return {
                icon: <FiCheckCircle className="w-16 h-16 text-green-500" />,
                title: type === 'order' ? 'Order Placed Successfully!' : 'Payment Successful!',
                message: type === 'order' ? 'Thank you for your order. Well start preparing it right away.'
                    : 'Your payment has been processed successfully.',
                color: 'green'
            };
        }

        return {
            icon: <FiXCircle className="w-16 h-16 text-red-500" />,
            title: type === 'order' ? 'Order Failed' : 'Payment Failed',
            message: type === 'order'
                ? 'Something went wrong while placing your order.'
                : 'Your payment could not be processed.',
            color: 'red'
        };
    };

    const content = renderContent();

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
                <div className="mb-6 flex justify-center">
                    {content.icon}
                </div>

                <h2 className={`text-2xl font-bold mb-4 text-gray-800`}>
                    {content.title}
                </h2>

                <p className="text-gray-600 mb-8">
                    {content.message}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/orders"
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        View Orders
                    </Link>
                    <Link
                        to="/"
                        className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Verify;