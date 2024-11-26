import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import './loadingindicator.css'



export default function LoadingIndicator() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // useEffect(() =>{
    //     const handleStart = () => setLoading(false);
    //     const handleStop = () => setLoading(true);

    //     router.events.on('routeChangeStart', handleStart);
    //     router.events.on('routeChangeComplete', handleStop);
    //     router.events.on('routeChangeError', handleStop);
    //     console.log(loading)
    //     return () => {
    //         router.events.off('routeChangeStart', handleStart);
    //         router.events.off('routeChangeComplete', handleStop);
    //         router.events.off('routeChangeError', handleStop);
    //     }
    // }, [router])

  return (
    <>
      <div className="top-progress"></div>
    </>
  )
}
