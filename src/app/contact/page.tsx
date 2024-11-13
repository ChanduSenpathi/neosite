import Image from "next/image";
import contact from '../../../public/images/contact.png'

const Contact = () => {    
    return (
        <section className="flex justify-center items-center gap-5 px-3">
            <div className="contact-us-image hidden md:block">
                <Image className="w-full h-full" src={contact} alt="contact us" />
            </div>
            <form action="">
                <div className="common-form-inputs my-2">
                    <label htmlFor="" className="text-[14px]">Enter Full Name</label>
                    <input type="text" className="px-[10px] py-2 rounded-[10px] w-full " placeholder="Full Name"/>
                </div>
                <div className="common-form-inputs my-2">
                    <label htmlFor="" className="text-[14px]">Enter Email Address</label>
                    <input type="mail" className="px-[10px] py-2 rounded-[10px] w-full " placeholder="Email"/>
                </div>
                <div className="common-form-inputs my-2">
                    <label htmlFor="" className="text-[14px]">Enter Phone Number</label>
                    <input type="number" className="px-[10px] py-2 rounded-[10px] w-full " placeholder="Phone number (optional)"/>
                </div>
                <div className="common-form-inputs my-2">
                    <label htmlFor="" className="text-[14px]">Enter Message</label>
                    <textarea rows={5} className="w-full px-[10px] py-2 rounded-[10px]" placeholder="Message" name="" id=""></textarea>
                </div>
                <input type="submit" className="bg-blue-500 w-full py-2 rounded-[10px] text-[white]" value="Send" />
            </form>
        </section>
    );
}

export default Contact;