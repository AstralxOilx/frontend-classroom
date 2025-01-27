   
import React from 'react';
import SetPageName  from '@/lib/setPageName';


export default function page() {   
  const pageName = "กลุ่มเรียน";

  return (
    <>
      <SetPageName name={pageName} />
    </>
  )
}
