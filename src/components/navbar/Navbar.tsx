"use client"

import Image from 'next/image';
import './navbar.css'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, deleteItem, increaseQuantity } from '@/app/store';
import { useState } from 'react';
import close from '../../../public/images/close.png'
import deleteBtn from '../../../public/images/delete.png'


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
        name: 'Blogs',
        path: '/blog'
    },
    {
        id: 4,
        name: 'Contact Us',
        path: '/contact'
    },
]

const Navbar = () => {
    const pathName = usePathname();
    const {cart, total} = useSelector((state: any) => state.cart)
    const dispatch = useDispatch();
    const [isShow,  setShow] = useState(false);
    const [isNav, setNav] = useState(false);
    let isAdmin = true;
    let session = true;

    window.onscroll = () => {
        window.scrollY > 0 ? setNav(true) : setNav(false);
    }

    const toggleCart = {
        top: isShow? '87px' : '-500%',
        opacity: isShow? '1' : '0',
        transition: 'all 0.3s ease-in-out',
    }

    const setNavBg = {
        backgroundColor: isNav ? 'rgb(31, 41, 56)' : ''
    }
    return (
        <>
            <nav style={setNavBg} className="p-[10px] flex justify-between items-center sticky top-0 left-0 w-full nav-container">
            <a href="#">
                <img className="w-[100px] h-[67px]" src="../images/logo.png" alt="logo" />
            </a>
            <ul className="list-none flex justify-between items-center gap-5 text-[white]">
                {navLinks.map(item=>
                    <li key={item.id}><Link href={item.path} className={`${pathName === item.path ? "nav-active" : ""} text-[white] fw-bold`}>{item.name}</Link></li>
                )}
                {session ? (
                    <>
                        {isAdmin && <Link href="/admin" className={`${pathName === '/admin' ? "nav-active" : ""}`}>Admin</Link>}
                        <button type='button' className='w-[35px] relative' onClick={() => setShow(true)}>
                            <img src="./images/cart.png" className='w-full h-full' alt="cart-icon" />
                            <span className='cart-span-item'>{cart.length}</span>
                        </button>
                        <button type='button' className='bg-white text-[black] px-3 py-1 rounded-[10px]'>Logout</button>
                    </>
                ) : (
                    <Link href="/login" className={`${pathName === './login' ? "nav-active" : ""} bg-white text-[black] px-3 py-1 rounded-[10px]`}>Login</Link>
                ) }
            </ul>
            <div className='cart-popup' style={toggleCart}>
            <button type='button' className='absolute right-[10px] top-[10px]' onClick={() => setShow(false)}>
                <Image src={close} width={15} height={15} alt='close-icons'/>
            </button>
                {cart.length !== 0 ? (
                    <ul className='list-none p-4'>
                    {cart.length >0 && (
                        cart.map((item:any)=>
                            <li key={item.id} className='py-2'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <Image className="w-[100px] h-[100px]" width={100} height={100} src={item.thumbnail} alt={item.title}/>
                                        <div>
                                            <h5>{item.title}</h5>
                                            <span>Quantity</span>
                                            <div className='flex gap-2'>
                                            <button type='button' onClick={() => dispatch(decreaseQuantity(item))} className='px-2 border-slate-500 border-2 border-solid'>-</button>
                                                <span>{item.quantity}</span>
                                            <button type='button' onClick={() => dispatch(increaseQuantity(item))} className='px-2 border-slate-500 border-2 border-solid'>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-3'>
                                        <button type='button' onClick={() => dispatch(deleteItem(item))}>
                                            <Image className='w-full h-full' width={15} height={15} src={deleteBtn} alt='delete-item'/>
                                        </button>
                                    <span>Rs: {item.amount}</span>
                                    </div>
                                </div>
                            </li>
                        )
                    )}
                </ul>
                ) : (
                    <h3 className='text-center p-4 font-bold text-[24px]'>No items Added</h3>
                )}
                <div className='flex justify-between items-center p-3 bg-green-100 sticky bottom-0'>
                    <span>Total</span>
                    <span>Rs: {total.toFixed(2)}</span>
                </div>
            </div>
            </nav>
            
        </> 
    );
}

export default Navbar;