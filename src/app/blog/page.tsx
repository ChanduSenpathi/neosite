'use client'

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store";

export interface Product {
    id: number,
    title: string,
    description: string,
    price: number,
    thumbnail: string,
    quantity: number,
    amount : number
}

const Blog = () => {
    const [products, setProducts] = useState([])
    const [isId, setIsId] = useState(0);
    const dispatch = useDispatch();
    

    const getAllProducts = async () => {
        await axios.get("https://dummyjson.com/products").then(res => {
            setProducts(res.data.products)
        }).catch(err=>console.log(err))
    }

    useEffect(()=>{
        getAllProducts();
    },[])

    const handleSubString = (id:number) => {
        if(id === isId) {
            setIsId(0)
        }else {
            setIsId(id)
        }
    }

    return (
        <section className="px-3 text-white">
            <ul className="grid grid-cols-4 list-none gap-3">
                {products.length !== 0 && (
                    products.map((items:Product) => (
                        <li key={items.id} className="border-2 border-gray-300 p-5 flex flex-col justify-between">
                            <Image className="w-full" width={500} height={500} src={items.thumbnail} alt={items.title} unoptimized/>
                            <h2>{items.title}</h2>
                            <p>
                                {
                                items.id && isId == items.id ? items.description : items.description.substring(0,50) + "..."
                                }
                                <button 
                                    type="button" 
                                    className="px-2 font-bold" 
                                    onClick={() => handleSubString(items.id)}
                                >
                                    {items.id && isId == items.id ? 'See Less' : 'See More'}
                                </button>
                            </p>

                            <div className="flex justify-between items-center">
                            <h3>Price: ${items.price}</h3>
                            <button type="button" onClick={() => dispatch(addItem(items))}>Add item</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
}

export default Blog;