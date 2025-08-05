import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../store/slices/chatSlice'
import {X} from "lucide-react"

const ChatHeader = () => {

  const { selectedUser } = useSelector((state) => state.chat)
  const { onlineUsers } = useSelector((state) => state.auth)

  const dispatch = useDispatch();


  return (
    <>
      <div className='p-3 border-b bg-gray-200 ring-gray-300'>
        <div className='flex items-center justify-between'>
          {/* User info */}

          <div className='flex items-center gap-3'>
            {/* Avatar */}
            <div className='relative w-10 h-10'>
              <img src={selectedUser?.avatar?.url || "/vite.svg"} alt="" className='w-full h-full object-cover rounded-full' />

              {
                onlineUsers.includes(selectedUser._id) && (
                  <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-white border-2 rounded-full' />
                )
              }
            </div>


            {/* Name and ststus */}

            <div>
              <h3 className='font-bold text-base text-black'>{selectedUser?.fullName}</h3>
              <p className='text-sm text-black'>
                {
                  onlineUsers.includes(selectedUser?._id) ? "Online":"Offline"
                }
              </p>
            </div>
          </div>



          {/* Close Button */}
          <button onClick={()=>dispatch(setSelectedUser(null))} className='text-gray-800 hover:text-black translate'>
                <X className="w-5 h-5"/>
          </button>
        </div>
      </div>
    </>
  )
}

export default ChatHeader
