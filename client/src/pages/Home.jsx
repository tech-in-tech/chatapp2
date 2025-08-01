import React from 'react'
import { useSelector } from 'react-redux'
import Sidabar from '../components/Sidabar';
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';


const Home = () => {

  const {selectedUser} = useSelector((state) =>state.chat);


  return (
    <>
      <div className='min-h-screen bg-gray-100'>
        <div className='flex items-center justify-center pt-20 px-4'>
          <div className='bg-white rounded-lg w-full shadow-md max-w-6xl h-[calc(100vh-8rem)]'>

            <div className='flex h-full rounded-lg overflow-hidden'>
              <Sidabar/>


              {
                !selectedUser?<NoChatSelected/>:<ChatContainer/>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
