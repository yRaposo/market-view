'use client';
import { fetchOrders } from '@/services/ordersService';
import React, { use, useEffect, useState } from 'react';

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const unwrappedParams = use(params);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('access_token') || ''

    useEffect(() => {
        setLoading(true);
        fetchOrders('1087712289', unwrappedParams.id, token)
        .then((orders) => {
            setOrders(orders);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setLoading(false);
        });
    }, [unwrappedParams.id]);

    return (
        <div>
            <h1>Product Page</h1>
            <p>Product ID: {unwrappedParams.id}</p>
        </div>
    );
};

export default ProductPage;