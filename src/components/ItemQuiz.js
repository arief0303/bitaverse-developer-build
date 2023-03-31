import React, { useEffect, useState }  from 'react'

export default function ItemQuizComponent ({children, id = '', className = '', checked, status, onClick = () => {}, style = {}}) {
  const [hover, setHover] = useState(false)
  useEffect(() => {})
  const defStyle = {
    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
  }

  const handleMouseIn = () => {
    setHover(true);
  }

  const handleMouseOut = () => {
    setHover(false);
  }
 
  return (
    <div
      id={id}
      onClick={onClick}
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      style={Object.assign({}, defStyle, style)}
      className={`
        cursor-pointer
        bg-white/10
        sm:w-20
        lg:w-40
        sm:h-20
        lg:h-40
        sm:p-2
        lg:p-8
        inline-flex
        items-center
        justify-center
        relative
        border-3
        ${(hover && !checked) ? 'border-secondary after:border-secondary before:border-secondary' : 'border-transparent after:border-transparent before:border-transparent'}
        ${(status && !checked) ? 'border-red-500 after:border-red-500 before:border-red-500' : ''}
        ${(checked) ? 'border-green-500 after:border-green-500 before:border-green-500' : ''}
        after:content-['']
        after:absolute
        after:h-[23px]
        after:w-[1px]
        after:top-[-5px]
        after:right-[4px]
        after:border-r-3
        after:border-solid
        after:-rotate-45
        after:origin-center
        before:content-['']
        before:absolute
        before:h-[23px]
        before:w-[1px]
        before:bottom-[-5px]
        before:left-[4px]
        before:border-r-3
        before:border-solid
        before:-rotate-45
        before:origin-center
        ${className}
      `}
    >
      {children}
    </div>
    )
}
