
import React from 'react';
import SetPageName from '@/lib/setPageName';

export default function page() {
  const pageName = "Group";

  return (
    <>
      <SetPageName name={pageName} />
      <div className=' relative w-full h-full'>
        <div className=' sticky top-0 w-full h-10 bg-background/50 z-10 flex items-center backdrop-blur-md backdrop-brightness-105 shadow-sm text-gray-600 dark:text-gray-400'>


        </div>
        <div className='mt-1 overflow-auto h-[90%]'>
          lorem5000
        </div>
      </div>
    </>
  )
}
