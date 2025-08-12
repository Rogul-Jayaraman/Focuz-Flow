import React from 'react'
import { BarLoader, PropagateLoader, ScaleLoader } from 'react-spinners';

const barLoader = {
    backgroundColor:"rgb(254, 215, 170)",
};

export default function LoaderBar(){
  return (
    <div className='relative py-0'>
      <BarLoader width={"100%"} speedMultiplier={"1"} color="rgb(249, 115, 22) " cssOverride={barLoader}/>
    </div>
  )
}

export function LoaderSync(){
  return(
    <div className='relative h-[100dvh] flex items-center justify-center'>
      <PropagateLoader color="rgb(249, 115, 22,0.5)"  speedMultiplier={1}/>
    </div>
  )
}

export function LoaderScale(){
  return(
    <div className='relative h-[100dvh] flex items-center justify-center'>
      <ScaleLoader color="rgb(249, 115, 22)"/>
    </div>
  )
}