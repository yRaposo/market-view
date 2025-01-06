'use client';
import { fetchProducts } from "@/services/productsService";
import { Product } from "@/services/api.types";
import { useEffect, useState } from "react";
import ProductBtn from "./ProductBtn";

export default function ProductsList({ userId }: { userId: string }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchProducts(userId, 50, 0)
        .then((products) => {
            setProducts(products);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [userId]);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="grid grid-cols-6 gap-2">
        {products.map((product) => (
            <ProductBtn key={product.id} props={product} />
        ))}
        </div>
    );
}