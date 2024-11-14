import Image from "next/image";

const Home = () => {
  return (
    <section className="flex justify-center gap-5 px-3 text-[white]">
      <div className="flex flex-col justify-between max-w-[500px]">
        <h1 className="text-[60px] max-w-[300px] font-bold mb-[10px]">Creative Thoughts Agency</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error debitis, iure corporis
           animi laboriosam inventore. Perferendis at magni adipisci delectus ex, dolorem, quis 
           assumenda quam voluptas totam accusamus illo consequatur!</p>
        <div className="flex gap-5 my-[20px]">
          <button type="button" className="px-[20px] py-[10px] bg-blue-800 rounded-[10px]">Learn More</button>
          <button type="button" className="px-[20px] py-[10px] bg-white text-black rounded-[10px]">Contact</button>
        </div>
      </div>
      <div className="max-w-[600px] h-[500px]">
        <Image className="w-full h-full" width={100} height={100} src="https://media2.giphy.com/media/XJdXI49B41einJHGLG/source.gif" alt="home" unoptimized/>
      </div>
    </section>
  );
}

export default Home;