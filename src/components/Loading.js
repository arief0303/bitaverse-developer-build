import React, { useEffect } from 'react'
import Text from './Text'

export default function LoadingComponent ({children, type = 'popup', className = '', style = {}}) {
  const defStyle = {
    textDecoration: 'none',
    clipPath: 'polygon(100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px, 20px 0)'
  }

  useEffect(() => {}, [children])

  if (type === 'popup') {
    return (
      <div
        className={`
          fixed
          flex
          inset-0 absolute w-full h-full
          justify-center
          items-center
          z-[1001]
          overflow-auto
          bg-black/50
          backdrop-blur-sm
        `}
      >
        <div style={defStyle} className={`
          w-[550px]
          bg-primary/80
          py-5
          px-10
          relative
          
          before:content-['']
          before:absolute
          before:bottom-0
          before:right-0
          before:bg-bottom-edge
          before:w-[61px]
          before:h-[44px]
          after:content-['']
          after:absolute
          after:top-0
          after:left-0
          after:bg-top-edge
          after:w-[61px]
          after:h-[44px]
          ${className}
        `}>
          <Text type='heading-3' className='text-secondary'>Please be patient...</Text>
          <Text type='p-description' className='text-yellow-500'>We're still working on it</Text>
        </div>
      </div>
      )
  } else {
    return (
      <div className={`
        bg-loading
        bg-left-bottom
        bg-cover
        bg-no-repeat
        absolute
        inset-0
        w-full
        h-full
        ${className}
      `}>
        <div className='absolute bg-loading-bar bg-no-repeat bg-cover bg-left-top bottom-0 w-full sm:h-[120px] lg:h-[226px] flex items-center justify-end'>
          <Text type='heading-3' className='text-secondary bg-primary px-3 py2 sm:mt-5 lg:mt-4 sm:mr-0 lg:mr-10'>{children} %</Text>
        </div>
      </div>
    )
  }
}
