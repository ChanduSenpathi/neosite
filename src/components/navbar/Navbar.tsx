"use client"

import Image from 'next/image';
import './navbar.css'
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, deleteItem, setAuth, increaseQuantity, resetState } from '@/app/store';
import React, { useEffect, useState } from 'react';
import { Product } from '@/app/products/page';
import { auth } from '@/app/(auth)/login/page';


const navLinks = [
    {
        id: 1,
        name: 'Home',
        path: '/'
    },
    {
        id: 2,
        name: 'About',
        path: '/about'
    },
    {
        id: 3,
        name: 'Products',
        path: '/products'
    },
    {
        id: 4,
        name: 'Contact Us',
        path: '/contact'
    },
]


export default React.memo( function Navbar(){
    const pathName = usePathname();
    const {cart, total, isUserLoggedIn, userName} = useSelector((state: { cart: { cart: Product[], total: number, isUserLoggedIn: boolean, userName: string } }) => state.cart)
    const dispatch = useDispatch();
    const [isShow,  setShow] = useState(false);
    const [isNav, setNav] = useState(false);
    const router = useRouter();
    // const isAdmin = true;
    const session = true;

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== 'undefined' && window.scrollY > 0) {
                setNav(true);
            } else {
                setNav(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    

    const toggleCart = {
        top: isShow? '87px' : '-500%',
        opacity: isShow? '1' : '0',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: 'rgb(31, 41, 56)',
        border : '1px solid white'
    }

    const setNavBg = {
        backgroundColor: isNav ? 'rgb(31, 41, 56)' : ''
    }

    const setPaths = (id:number) => {
        if(id !==3){
            setShow(false)
        }
    }

    const logoutHandler  = () => {
        const getItem: string | null = localStorage.getItem('userDetails');
            if (getItem!== null) {
                const listOfUsers = JSON.parse(getItem);
                listOfUsers.forEach((items: auth)=>{
                    if(items.username === userName){                        
                        items.isLogged = false;
                        localStorage.setItem('currentUser', '')                        
                        localStorage.setItem('userDetails', JSON.stringify(listOfUsers));
                        router.push('/');
                    }
                })
            }
        dispatch(setAuth({isTrue: false, user: ''}))
        dispatch(resetState())
        setShow(false);
        router.push('/login')
    }

    return (
        <>
            <nav style={setNavBg} className="p-[10px] flex justify-between items-center sticky top-0 left-0 w-full nav-container">
            <a href="#">
                <Image className="w-[100px] h-[67px]" width={500} height={500} src="/images/logo.png" alt="logo" unoptimized/>
            </a>
            {isUserLoggedIn && (
                <ul className="list-none flex justify-between items-center gap-5 text-[white]">
                {navLinks.map(item=>
                    <li key={item.id}><Link href={item.path} onClick={() => setPaths(item.id)} className={`${pathName === item.path ? "nav-active" : ""} text-[white] fw-bold`}>{item.name}</Link></li>
                )}
                {session ? (
                    <>
                        {/* {isAdmin && <Link href="/admin" className={`${pathName === '/admin' ? "nav-active" : ""}`}>Admin</Link>} */}
                        <button type='button' className='w-[35px] relative' onClick={() => setShow(true)}>
                            <Image src="/images/cart.png" width={100} height={100} className='w-full h-full' alt="cart-icon" unoptimized/>
                            <span className='cart-span-item'>{cart.length}</span>
                        </button>
                        <button type='button' onClick={logoutHandler} className='bg-white text-[black] px-3 py-1 rounded-[10px]'>Logout</button>
                        <span className='font-bold'>Hello {userName}</span>
                    </>
                ) : (
                    <Link href="/login" className={`${pathName === './login' ? "nav-active" : ""} bg-white text-[black] px-3 py-1 rounded-[10px]`}>Login</Link>
                ) }
            </ul>
            )}
            <div className='cart-popup' style={toggleCart}>
            <button type='button' className='absolute right-[10px] top-[10px]' onClick={() => setShow(false)}>
                <Image src="/images/close.png" width={15} height={15} alt='close-icons' unoptimized/>
            </button>
                {cart.length !== 0 ? (
                    <ul className='list-none p-4'>
                    {cart.length >0 && (
                        cart.map((item:Product)=>
                            <li key={item.id} className='py-2 text-white'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <Image className="w-[100px] h-[100px]" width={100} height={100} src={item.thumbnail} alt={item.title} unoptimized/>
                                        <div className='ms-2'>
                                            <h5>{item.title}</h5>
                                            <div className='flex gap-3 items-center my-3'>
                                                <span>Quantity</span>
                                                <div>
                                                <button type='button' onClick={() => dispatch(decreaseQuantity(item))} className='px-2 border-slate-500 border-2 border-solid'>-</button>
                                                    <span className='mx-2'>{item.quantity}</span>
                                                <button type='button' onClick={() => dispatch(increaseQuantity(item))} className='px-2 border-slate-500 border-2 border-solid'>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-3'>
                                        <button type='button' className='w-[20px] h-[25px]' onClick={() => dispatch(deleteItem(item))}>
                                            <Image className='w-full h-full' width={500} height={500} src='/images/delete.png' alt='delete-item' unoptimized/>
                                        </button>
                                        <span>Rs: {item.amount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </li>
                        )
                    )}
                </ul>
                ) : (
                    <h3 className='text-center text-white p-4 font-bold text-[24px]'>No items Added</h3>
                )}
                <div className='flex justify-between items-center p-3 bg-green-100 sticky bottom-0'>
                    <span>Total</span>
                    <span>Rs: {total.toFixed(2)}</span>
                </div>
            </div>
            </nav>            
        </> 
    );
})
