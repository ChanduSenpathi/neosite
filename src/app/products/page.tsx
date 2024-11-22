'use client'

import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import ProductItem from "@/components/ProductItem";
import { useRouter } from "next/navigation";
import getAllProducts from "@/lib/api";
import { productReview } from "./[slug]/page";

export interface Product {
    id: number,
    title: string,
    description: string,
    price: number,
    thumbnail: string,
    quantity: number,
    amount : number,
    isAdded : boolean,
    category: string
    images: string[],
    brand: string;
    minimumOrderQuantity: number
    shippingInformation: string;
    discountPercentage: number;
    weight: number;
    returnPolicy: string;
    reviews: productReview[],
    stock: number
}


const checkOptions : string[] = ["beautyId", "groceriesId", "fragrancesId", "furnitureId"]

const Blog = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loadedData, setLoadedData] = useState<Product[]>([]);
    const [isId, setIsId] = useState(0);
    const [checkCategory, setCheckCategory] = useState<Product[]>([]);
    const [range, setRange] = useState<number>(30)
    const router = useRouter()
     
    
    useEffect(()=>{-
        (async () => {
            const data = await getAllProducts();
            setLoadedData(data);
            setProducts(data); 
        })();
    },[])

   
    useEffect(()=>{
        if(checkCategory.length !==0 ){
            setProducts(checkCategory);
        }else {
            setProducts(loadedData);
        }
    },[checkCategory])

    const handleSubString = (id:number) => {
        if(id === isId) {
            setIsId(0)
        }else {
            setIsId(id)
        }
    }
    
    const getCheckboxData = (item1: string) => {        
        let filteredData =  loadedData.filter((items: Product)=> {
            if(items.category === item1){
                let data =products.map((existed) =>{
                    if(existed.id !== items.id){
                        return items
                    }
                } )
                return data;
            }
        });
        setCheckCategory(prev => [...prev , ...filteredData])
    }

    const handleDummyData = (item: string) => {
        let filteredData = checkCategory.filter((items: Product)=> items.category !== item);
        setCheckCategory(filteredData)
    }

    const handleCheckbox = (event: React.FormEvent<HTMLInputElement>, type: string) => {
        let isChecked = (event.target as HTMLInputElement).checked;    
        isChecked && type  ? getCheckboxData(type) : handleDummyData(type)     
    }

    const changeCheckBox = () => {
        setCheckCategory([])
        checkOptions.map((items:string) =>{
            const checkbox = document.getElementById(items) as HTMLInputElement | null;
            if (checkbox) {
                checkbox.checked = false;
            }
        })
    }

    const getTotalProducts = (category: string) => {
        let filteredData = loadedData.filter((items: Product)=> items.category === category);
        return filteredData.length;
    }

    const handleRangeValues = (event: React.FormEvent<HTMLInputElement>) => {
        let minPrice = parseInt((event.target as HTMLInputElement).value);
        let filteredData = loadedData.filter((items: Product)=> items.price >= minPrice);
        setProducts(filteredData)
        setRange(minPrice)
    }

    const handleProductClick = (productId: number, title: string) => {
        // const slug = generateSlug(title, productId);
        router.push(`/products/${productId}`);
    };

    return (
        <section className="p-3 text-white">
            {products?.length === 0 ? (
                <Loader/>
            ) : (
                <div className="flex gap-3">
                    <div className="filtered-container p-3 sticky top-[100px]">                        
                        <form className="mt-4">
                            <div className="flex gap-2 justify-between items-center my-2">
                                <div>
                                    <label htmlFor="beautyId">Beauty</label>
                                    <span className="mx-2">{getTotalProducts("beauty")}</span>
                                </div>
                                <input type="checkbox" onChange={(e) =>handleCheckbox(e, "beauty")} name="beauty" id="beautyId" />
                            </div>
                            <div className="flex gap-2 justify-between items-center my-2">
                                <div>
                                    <label htmlFor="groceriesId">Groceries</label>
                                    <span className="mx-2">{getTotalProducts("groceries")}</span>
                                </div>
                                <input type="checkbox" onChange={(e) =>handleCheckbox(e, "groceries")} name="groceries" id="groceriesId" />
                            </div>
                            <div className="flex gap-2 justify-between items-center my-2">
                                <div>
                                    <label htmlFor="fragrancesId">Fragrances</label>
                                    <span className="mx-2">{getTotalProducts("fragrances")}</span>
                                </div>
                                <input type="checkbox" onChange={(e) =>handleCheckbox(e, "fragrances")} name="fragrances" id="fragrancesId" />
                            </div>
                            <div className="flex gap-2 justify-between items-center my-2">
                                <div>
                                    <label htmlFor="furnitureId">Furniture</label>
                                    <span className="mx-2">{getTotalProducts("furniture")}</span>
                                </div>
                                <input type="checkbox" onChange={(e) =>handleCheckbox(e, "furniture")} name="furniture" id="furnitureId" />
                            </div>
                            <div className="flex justify-between items-center gap-2 my-2">
                                <label htmlFor="price">Price</label>
                                <input type="range" min ="0" max= "1000" value={range} onChange={handleRangeValues} />
                            </div>
                        </form>
                        <button type="button" onClick={changeCheckBox} className="my-1 rounded-[5px] px-3 border-2 border-solid border-white float-right">Clear</button>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  list-none gap-3">
                    {products.length !== 0 && (
                        products.map((items:Product) => (
                            <ProductItem  router={() => handleProductClick(items.id, items.title)}
                            key={items.id} items={items} isId={isId} handleSubString={(id: number) => handleSubString(id)}/>
                        ))
                    )}
                    </ul>
                </div>
            )}            
        </section>
    );
}

export default Blog;