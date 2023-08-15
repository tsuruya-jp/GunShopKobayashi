import Link from "next/link";

const RealProperty = () => {
  return(
    <div className="w-[80%] mb-32 md:mb-44 lg:mb-64 mx-auto">
      <Link href="/" className="relative w-full text-center inline-block py-6 font-medium group">
      <span className="absolute inset-0 w-full h-full transition duration-500 ease-in-out transform translate-x-4 md:translate-x-8 translate-y-3 md:translate-y-6 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
      <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
      <span className="relative text-4xl md:text-6xl text-gray-400 font-mincho">小林不動産</span>
      </Link>
    </div>
  )
}

export default RealProperty;