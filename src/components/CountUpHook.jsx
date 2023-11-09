import React from 'react'
import CountUp, { useCountUp } from 'react-countup';


const CountUpHook = ({name, end}) => {
    useCountUp({ ref: name, end, duration: 5, enableScrollSpy: true, suffix: 'K+' });

  return (
    <>
    <span className='font-bold text-6xl' id={name} />
    </>
  )
}

export default CountUpHook