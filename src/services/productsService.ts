import { MLApi } from "@/libs/MLApi"
import { Product } from "@/services/api.types"

export async function fetchProducts(userId: string, limit: number, offset: number): Promise<Product[]> {
    try {
        const response = await MLApi.get('/sites/MLB/search', {
        params: {
            seller_id: userId,
            limit: limit,
            offset: offset
        }
        });
        console.log(response.data.results);
        return response.data.results;
    } catch (error) {
        console.error(error);
        throw error;
    }
}