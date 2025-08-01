import { Users } from 'lucide-react';
import React from 'react'

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);
  return (
    <>
      <aside className='h-full w-20 lg:w-72 border-r border-gray-200 flex flex-col transition-all duration-200'>
        {/* Header */}
        <div className='border-b border-gray-700 w-full p-5 '>
          <div className='flex items-center gap-2'>
            <Users className='w-6 h-6 text-gray-700' />
            <span className='font-medium hidden lg:block text-gray-800'>
              Contacts
            </span>
          </div>
        </div>

        {/* skeleton contacts */}
        <div className='overflow-y-auto w-full py-3'>
          {
            skeletonContacts.map((_, index) => {
              return (
                <div key={index} className='w-full p-3 items-center gap-3 animate-pulse'>
                  {/* Avatar skeleton */}
                  <div className='relative mx-auto lg:mx-0'>
                    <div className='w-12 h-12 bg-gray-300 rounded-full' />
                  </div>


                  {/* Text skeleton for large screen */}
                  <div className='hidden lg:flex flex-col gap-2 flex-1'>
                    <div className='h-4 w-32 bg-gray-300 rounded' />
                    <div className='h-4 w-32 bg-gray-300 rounded' />
                    <div className='h-4 w-32 bg-gray-300 rounded' />
                  </div>
                </div>
              )
            })
          }
        </div>

      </aside>
    </>
  )
}

export default SidebarSkeleton
