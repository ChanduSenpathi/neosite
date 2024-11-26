import Image from "next/image";
import React from "react";

export default React.memo(function Notfound() {
    return (
        <div className="flex flex-col justify-center items-center h-[100vh] bg-white">
            <Image width={500} height={500} src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="not-found"></Image>
            <h1 className="text-[40px] font-bold">404 Not Found</h1>
        </div>
    )
})