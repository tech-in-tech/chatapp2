import React from 'react'

const MessageSkeletion = () => {

  const skeletoMessages = Array(6).fill(null);
  return (
    <>
      <div className='flex-1 overflow-y-auto p-4  space-y-4'>
        {
          skeletoMessages.map((_, index) => {
            return (
              <div key={index}
                className={`flex items-start gap-3 ${index % 2 === 0 ? "justify-start" : "justify-end flex-row-reverse"}`}>
                {/* Avatar */}

                <div className='w-10 h-10 rounded-full bg-gray-300 animate-pulse' />

                {/* Message Bubble */}

                <div>
                  <div className=' h-4 w-16 bg-gray-300 rounded mb-2 animate-pulse'/>
                  <div className=' w-[200px] h-16 bg-gray-200 rounded-lg animate-pulse'/>
                </div>

              </div>
            )
          })
        }

      </div>
    </>
  )
}

export default MessageSkeletion
