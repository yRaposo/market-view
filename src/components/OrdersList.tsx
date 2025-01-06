'use client';
import { fetchOrders } from '@/services/ordersService';
import React, { useEffect, useState } from 'react';
import { Order } from '@/services/api.types';

export default function OrdersList({ userId, productId, token }: { userId: string, productId: string, token: string }) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders(userId, productId, token)
        .then((orders) => {
            setOrders(orders);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setError('Failed to fetch orders');
            setLoading(false);
        });
    }, [userId, productId, token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.id} className='border-2 border-gray-300 p-4 my-4 rounded-xl'>
                        <p>{order.id}</p>
                        <p>Status: {order.status}</p>
                        <p>Total Amount: ${order.total_amount ? order.total_amount.toFixed(2) : 'N/A'}</p>
                        <button onClick={() => alert(`Order ID: ${order.id}`)}>View Order</button>
                    </div>
                ))
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}