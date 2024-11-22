'use client'
import { Product } from "@/app/products/page";
import { addCart, setAuth } from "@/app/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export interface auth {
    username: string;
    password: string;
    isLogged: boolean
    cart: Product[]
}

const Login = () => {
    const [isShow, setShow] = useState(false);
    const [loginDetails, setLoginDetails] = useState({username: '', password: ''});
    const [signupDetails, setSignupDetails] = useState({username: '', email: '',  password: ''});
    const [isSlide, setSlide] = useState(true)
    // const state = useSelector((state) => state)
    const router = useRouter();
    const dispatch = useDispatch()

    const checkBoxHandler = (event: React.FormEvent<HTMLInputElement>,) => {
        const isTrue = (event.target as HTMLInputElement).checked;
        
        if(isTrue) {
            setShow(isTrue)
        }else {
            setShow(isTrue)
        }
    }

    const handleLoginForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {username,  password} = loginDetails;
        if(username && password) {
            const getItem: string | null = localStorage.getItem('userDetails');
            if (getItem !== null) {
                const listOfUsers = JSON.parse(getItem);
                listOfUsers.forEach((items: auth)=>{
                    if(items.username === username){
                        items.isLogged = true;
                        localStorage.setItem('currentUser', username);
                        router.push('/');
                        dispatch(setAuth({isTrue: true, user: username}))
                        dispatch(addCart(items.cart))
                        setLoginDetails({...loginDetails, username: '', password: ''})
                    }
                })
                localStorage.setItem('userDetails', JSON.stringify(listOfUsers))
            } else {
                alert('Invalid credentials. Please try again.');
                setSlide(false);
            }
        }else {
            alert('Please fill the required fields.')
        }    
    }

    const handleSignupForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {username, password, email} = signupDetails;
        if(username && password && email){
            const getItem: string | null = localStorage.getItem('userDetails');
            if (getItem!== null) {
                const listOfUsers = JSON.parse(getItem);
                const filteredData =listOfUsers.filter((items: auth)=> items.username === username)
                console.log(filteredData)
                if(filteredData.length >0){
                    alert('Username already exists. Please choose a different one.');
                    return;
                }  else {
                    localStorage.setItem('userDetails', JSON.stringify([...listOfUsers, {username, password, email, isLogged: true}]));
                    localStorage.setItem('currentUser', username);
                    dispatch(setAuth({isTrue: true, user: username}))
                    router.push('/');
                }
            }else{
                localStorage.setItem('userDetails', JSON.stringify([{username, password, email, isLogged: true}]));
                localStorage.setItem('currentUser', username);
                dispatch(setAuth({isTrue: true, user: username}))
                router.push('/');
            }
            setSignupDetails({...signupDetails, username: '', password: '', email: ''})
        }else {
            alert('Please fill the required fields.')
        }
    }

    const formChanger = () => {
        setSlide(!isSlide);
    }

    const changeForm_1 = {
        transform: isSlide ?  'translateX(0px)' : 'translateX(-400px)',
        transition: 'all .3s linear'
    }

    const changeForm_2 = {
        transform: isSlide ?  'translateX(400px)' : 'translateX(0px)',
        transition: 'all .3s linear'
    }
    
    return (
        <section className="text-white p-3 flex justify-center gap-5">
            <div className="max-w-[600px] w-full hidden md:block">
                <Image width={500} height={500} layout="responsive" src="/images/login-image.png" alt="login-image" />
            </div>
            <div className="w-full max-w-[400px] h-[530px] relative flex flex-col justify-center overflow-hidden">
                    <form style={changeForm_1} onSubmit={handleLoginForm} className="form-1 border-slate-50 h-fit max-w-[400px] border-2 border-solid rounded-[20px] p-4 ">
                            <h2 className="text-center text-[40px] font-bold">Login</h2>
                            <div className="flex flex-col gap-2 my-3">
                                <label htmlFor="userId">Username</label>
                                <input type="text" id="userId" onChange={(event) => setLoginDetails({...loginDetails, username: event?.target.value})} className="w-full text-black px-3 p-2 rounded-[10px]" placeholder="Enter Username" value={loginDetails.username}/>
                            </div>
                            <div className="flex flex-col gap-2 my-3">
                                <label htmlFor="passId">Password</label>
                                <input type={`${isShow ? "text" : "password"}`} id="passId" onChange={(event) => setLoginDetails({...loginDetails, password: event?.target.value})} className="w-full text-black px-3 p-2 rounded-[10px]" placeholder="Enter Password" value={loginDetails.password}/>
                            </div>                
                            <div className="flex justify-end items-center">
                                <input className="me-2" id="checkId" type="checkbox" onChange={checkBoxHandler}/>
                                <label htmlFor="checkId">Show Password</label>
                            </div>
                            <input type="submit" className="mt-5 block w-full py-2 my-2 bg-green-400 rounded-[10px] cursor-pointer" value="Submit" />
                            <span className="">Don &apos; t have Account <button type="button" className="text-blue-500" onClick={formChanger}>Create New</button></span>
                    </form>
                    <form style={changeForm_2} onSubmit={handleSignupForm} className="form-2 border-slate-50 h-fit max-w-[400px] border-2 border-solid rounded-[20px] p-4 ">
                            <h2 className="text-center text-[40px] font-bold">Signup</h2>
                            <div className="flex flex-col gap-2 my-3">
                                <label htmlFor="userNameId">Username</label>
                                <input type="text" id="userNameId" onChange={(event) => setSignupDetails({...signupDetails, username: event?.target.value})} className="w-full text-black px-3 p-2 rounded-[10px]" placeholder="Enter Username" value={signupDetails.username}/>
                            </div>
                            <div className="flex flex-col gap-2 my-3">
                                <label htmlFor="mailId">Email</label>
                                <input type="text" id="mailId" onChange={(event) => setSignupDetails({...signupDetails, email: event?.target.value})} className="w-full text-black px-3 p-2 rounded-[10px]" placeholder="Enter Email" value={signupDetails.email}/>
                            </div>
                            <div className="flex flex-col gap-2 my-3">
                                <label htmlFor="passwordId">Password</label>
                                <input type={`${isShow ? "text" : "password"}`} id="passwordId" onChange={(event) => setSignupDetails({...signupDetails, password: event?.target.value})} className="w-full text-black px-3 p-2 rounded-[10px]" placeholder="Enter Password" value={signupDetails.password}/>
                            </div>                
                            <div className="flex justify-end items-center">
                                <input className="me-2" id="signCheckId" type="checkbox" onChange={checkBoxHandler}/>
                                <label htmlFor="signCheckId">Show Password</label>
                            </div>
                            <input type="submit" className="mt-5 block w-full py-2 my-2 bg-green-400 rounded-[10px] cursor-pointer" value="Submit" />
                            <span className="">Already Account ? <button type="button" className="text-blue-500" onClick={formChanger}>Login here</button></span>
                    </form>
            </div>
        </section>
    );
}

export default Login;