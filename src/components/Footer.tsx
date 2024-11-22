import React from "react";

const Footer = React.memo(() => {
    return (
        <div className="flex justify-between items-center text-[white] px-3 my-5">
            <span>Chandu Senapathi</span>
            <span>&copy; copyrights reserved</span>
        </div>
    );
})

export default Footer;