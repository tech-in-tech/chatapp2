
const AuthImagePattern = ({title,subtitle}) => {
  return (
    <>
      <div className='hidden lg:flex items-center justify-center p-12'>
        <div className='max-w-md text-center'>

          {/* Grid pattern */}

            <div className='grid grid-cols-9 gap-9 mb-8'>
              {
                [...Array(63)].map((_,i)=>{
                  return (

                    <div key={i} className={`aspect-square rounded-full flex items-center justify-center text-3xl 
                      ${i % 3===0 ? "bg-pink-700 animate-pulse":""}
                      ${i % 4===0 ? "bg-yellow-800 animate-pulse":""}
                      ${i % 5===0 ? "bg-green-800 animate-pulse":""}
                      
                      ${i % 2===0 ? "bg-blue-800 ":"bg-black animate-pulse"} `}></div>
                  )
                })
              }
            </div>
            <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
            <p className="text-gray-700">{subtitle}</p>
        </div>
      </div>

    </>
  )
}

export default AuthImagePattern
