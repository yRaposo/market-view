'use client';
import OrdersList from '@/components/OrdersList';
import { fetchOrders } from '@/services/ordersService';
import React, { use, useEffect, useState } from 'react';

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const unwrappedParams = use(params);

    return (
        <div>
            <h1>Product Page</h1>
            <p>Product ID: {unwrappedParams.id}</p>
            <OrdersList userId="1087712289" productId={unwrappedParams.id} token={localStorage.getItem('access_token') || ''} />

        </div>
    );
};

export default ProductPage;