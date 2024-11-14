import Image from "next/image";
// import about from '../../../public/images/about.png'

const About = () => {
    return (
        <section className="text-[white] flex justify-center items-center gap-5 px-3">
            <div className="max-w-[600px] w-full flex flex-col justify-center">
                <h2 className="text-[20px] text-sky-500 font-extrabold">About Agency</h2>
                <h3 className="font-bold text-[46px] my-[5px]">We create digital ideas that are bigger, bolder, braver and better</h3>
                <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque sequi, 
                    blanditiis dolorum iusto ipsa eos deleniti ipsum autem animi, officiis 
                    reprehenderit? Doloribus vel animi eius ipsum hic quam consequatur 
                    deleniti.
                </p>
                <div className="flex justify-between items-center my-6">
                    <div>
                        <p className="text-sky-500 font-extrabold text-[30px]">10 k+</p>
                        <span>Years of experience</span>
                    </div>
                    <div>
                        <p className="text-sky-500 font-extrabold text-[30px]">234 k+</p>
                        <span>People reached</span>
                    </div>
                    <div>
                        <p className="text-sky-500 font-extrabold text-[30px]">5 k+</p>
                        <span>Services and plugins</span>
                    </div>
                </div>
            </div>
            <div className="max-w-[700px] w-[700px] grow">
                <Image src="/images/about.png" width={500} height={500} className="w-full h-full hidden md:block" alt="about"/>
            </div>
        </section>
    );
}

export default About;