import Link from "next/link";

export default function Home() {
  return (
<div className="flex items-center justify-center ">

                   {/* Left */}
    
      <div className="mt-32  flex flex-col justify-center items-center text-start">
         <h1 className=" font-display text-6xl font-bold  text-[#071321]">
          Your Health 
        </h1>
        <h1 className=" font-display text-7xl font-bold  text-[#071321]" >
          Our Priority,
        </h1>

        <h1 className=" text-7xl font-bold  text-sky-700 italic">
          Delivered Fast.
        </h1>


        <div className="mt-4">
          <p className="  text-lg text-gray-800 text-center">Book pathology tests online, visit at your slot, and receive digitally <br />
          signed reports in 24 hours — accurate, affordable, and reviewed <br />
          by experts.</p>
        </div>

        <div className=" mt-4  flex  items-start justify-center gap-3 ">
          <Link
          href="/book"
          className="px-5 py-1.5 rounded-full  bg-blue-500 text-white rounded hover:-translate-y-1 transition duration-200"
          >
            Book a Test 
          </Link>

          <Link
            href="/test"
            className=" px-5 py-1.5 rounded-full  text-black rounded hover:-translate-y-1 transition duration-200 hover:bg-[#447324] hover:text-white"
          >
           View All Tests
           </Link>
          </div>
      </div>

            

</div>
  
  );
}


