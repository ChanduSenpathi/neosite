"use client";

import { Product } from '@/app/products/page';
import { addItem } from '@/app/store';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';



export interface ItemProps {
    items: Product;
    handleSubString: (id: number) => void;
    isId: number;
    router: () => void
}

const ProductItem: React.FC<ItemProps> = ({ items, handleSubString, isId , router}) => {
    const dispatch = useDispatch();

    const changeSubString = (num: number) => {
        handleSubString(num);
    };

    return (
        <li
            key={items?.id}
            onClick={router}
            className="border-2 border-gray-300 p-5 flex flex-col justify-between cursor-pointer"
        >
            <div>
                <Image
                    className="w-full"
                    width={500}
                    height={500}
                    src={items?.thumbnail}
                    alt={items?.title}
                    unoptimized
                />
                <h2>{items?.title}</h2>
                <p>
                    {items?.id && isId === items?.id
                        ? items?.description
                        : items?.description.substring(0, 50) + "..."}
                    <button
                        type="button"
                        className="px-2 font-bold"
                        onClick={(e) => {
                            e.stopPropagation();
                            changeSubString(items?.id);
                        }}
                    >
                        {items?.id && isId === items?.id ? "See Less" : "See More"}
                    </button>
                </p>
            </div>
            <div className="flex justify-between items-center mt-3">
                <h3>Price: ${items?.price}</h3>
                <button
                    type="button"
                    className="add-item-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addItem(items));
                    }}
                >
                    {items?.isAdded ? "Item Added" : "Add Item"}
                </button>
            </div>
        </li>
    );
};

export default ProductItem;
