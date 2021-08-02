import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();
  return (
    <>
<div className="min-w-screen min-h-screen bg-gray-950 flex items-center p-5 lg:p-20 overflow-hidden relative">
    <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
        <div className="w-full md:w-1/2">
            <div className="mb-10 md:mb-20 text-gray-600 font-light">
                <h1 className="font-black uppercase text-3xl lg:text-5xl text-red-500 mb-10">You seem to be lost!</h1>
                <p>The page you are looking for is nott available.</p>
                <p>Try searching again or use the Go Back button below.</p>
            </div>
            <div className="mb-20 md:mb-0">
                <button onClick={router.back} className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-red-500 hover:text-red-600"><i className="mdi mdi-arrow-left mr-2"></i>Go Back</button>
            </div>
        </div>
    </div>
    <div className="w-64 md:w-96 h-96 md:h-full bg-gray-925 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
    <div className="w-96 h-full bg-gray-900 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
</div>
</>
  );
}
