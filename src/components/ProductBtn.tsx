import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductBtnProps {
    props: {
        id: string;
        title: string;
        price: number;
        thumbnail: string;
    };
}

export default function ProductBtn({ props }: ProductBtnProps) {
    return (
        <Link className="flex max-w-40 my-4" href={`/product/${props.id}`}>
            <div className=" flex-col gap-4 p-4 bg-white rounded-xl border-2 border-gray-300">
                <Image src={props.thumbnail} alt={props.title} width={100} height={100}/>
                <div>
                    <h2>{props.title}</h2>
                    <p>{props.price}</p>
                </div>
            </div>
        </Link>
    );
}
