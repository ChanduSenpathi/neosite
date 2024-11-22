'use client'

import { usePathname, useRouter } from 'next/navigation';
import React, {  ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addCart, setAuth } from '@/app/store';
import { auth } from '@/app/(auth)/login/page';

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const pathName = usePathname()

    useEffect(() => {
        const useExisted: string | null = localStorage.getItem('currentUser');
        const getItem: string | null = localStorage.getItem('userDetails');
        if (getItem !== null) {
            const listOfUsers = JSON.parse(getItem);
            listOfUsers.forEach((items: auth) => {
                if (items.isLogged) {
                    dispatch(addCart(items.cart));
                    dispatch(setAuth({ isTrue: true, user: useExisted ?? '' }));    
                    router.push(pathName);
                    return            
                }
            });
        }
        if(!useExisted){
            router.push('/login');
        }
    }, [router, dispatch, pathName]);
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute;
