'use client'
import { addItem } from "@/app/store";
// import Loader from "@/components/loader/Loader";
// import { API_URL } from "@/lib/api";
// import axios from "axios";
import Image from "next/image";
import React, {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Product } from "../page";
import Loader from "@/components/loader/Loader";

export interface productReview {
    comment: string,
    rating: number,
    reviewerEmail: string
    reviewerName : string
}

export default function ProductDetails({product} : {product : Product}) {
    const [productDetails, setProduct] = useState<Product >();
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch()

    useEffect(() =>{
        const getDetails = () => {
            if(product.id){
                setProduct(product);
                setLoading(false)
            }
        }
        getDetails()
    }, [product]) 
    
    if (loading) {
        return <Loader/>
      }
    
      if (!productDetails) {
        return <div>No product found.</div>;
      } 
   
  
    const getAllVerifiedStars = (rating: number) => {
      const star =  [];
      for (let i = 0; i < 5; i++) {
          if(i < rating){
              star.push(<Image key={i} width={500} height={500} className="w-[20px] h-[20px]" src="/images/stars.png" alt={`star-${i}`}/>)
          }else {
              star.push(<Image key={i} width={500} height={500} className="w-[20px] h-[20px]" src="/images/empty-star.png" alt={`empty-star-${i}`}/>)            
          }
      }      
      return star;
    }
  
    return (
      <section className="text-white px-3">
        <div className="flex gap-4 justify-center">
                  <div className="max-w-[500px] h-[100vh] w-full sticky top-[100px]">
                      <Image width={500} height={500} className="w-full h-full" src={productDetails.images[0]} alt={productDetails.title} unoptimized/>
                  </div>
                  <div>
                      <div className="border-b-2 py-3">
                          <h1 className="text-[40px] border-b-2">{productDetails.title}</h1>
                          <h3 className="my-2 ">Brand: <span className="font-bold">{productDetails.brand}</span></h3>
                          <h3 >Category: <span className="font-bold">{productDetails.category}</span></h3>
                          <div className="my-2">
                              <span>Description: </span>
                              <p>{productDetails.description}</p>
                          </div>
                          <p className="my-2">Shipping Info:  <span className="font-bold">{productDetails.shippingInformation}</span></p>
                          <p className="my-2">Discount: <span className="font-bold">{productDetails.discountPercentage}</span></p>
                          <p className="my-2">Total weight: <span className="font-bold">{productDetails.weight} grams</span></p>
                          <p className="my-2">Total Stock: <span className="font-bold">{productDetails.stock}</span></p>
                          <span>{productDetails.returnPolicy}</span>
                          <div className="my-3 flex gap-3 items-center">
                              <button type="button" className="px-8 py-2 bg-green-500 rounded-[10px]  text-[24px]">Buy Now</button>
                              <button type="button" className="px-8 py-2 border-2 rounded-[10px] text-[24px]" onClick={() => dispatch(addItem(productDetails))}>Add Cart</button>
                          </div>
                      </div>
                      <div>
                          <h4 className="text-[24px]">Top Reviews</h4>
                          <ul className="list-none">
                              {productDetails.reviews.map((items: productReview, index: number)=>
                                  <li key={index}>
                                       <div className="my-4 border-2 p-2 rounded-[10px]">
                                          <div className="flex gap-3">
                                              <Image className="w-[30px] h-30px bg-white rounded-[50%]" width={500} height={500} src='/images/review-profile.png' alt="reviewer-profile" unoptimized/>
                                              <h5 className="text-[16px]">{items.reviewerName}</h5>
                                          </div>
                                          <p className="text-[12px] flex gap-2">Rating: {getAllVerifiedStars(items.rating)}</p>
                                          <p className="text-[12px]">Comment: <span className="text-[16px]"> {items.comment}</span></p>
                                      </div>
                                  </li>
                              )}
                          </ul>
                      </div>
                  </div>
              </div>
      </section>
    );
  }