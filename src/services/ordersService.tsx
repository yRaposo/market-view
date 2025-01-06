'use server'
import { MLApi } from "@/libs/MLApi";

export async function fetchOrders(userId: string, product_id: string, token: string) {
    try {
        const response = await MLApi.get('/orders/search', {
            params: {
                seller: userId,
                q: product_id,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.results);
        return response.data.results;
    } catch (error) {
        console.error("Não foi possivel buscar ordens:", error);
        throw error;
    }
}