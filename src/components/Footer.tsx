import React from "react";

export default React.memo(function Footer(){
    return (
        <div className="flex justify-between items-center text-[white] px-3 my-5">
            <span>Chandu Senapathi</span>
            <span>&copy; copyrights reserved</span>
        </div>
    );
})
