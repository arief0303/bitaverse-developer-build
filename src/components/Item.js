import React, { useEffect, useState }  from 'react'

export default function ItemComponent ({children, img = '', name, id = '', className = '', checked, onClick = () => {}, style = {}}) {
  const [hover, setHover] = useState(false)
  useEffect(() => {})
  const defStyle = {
    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
    backgroundImage: `url('${img}')`
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
      name={name}
      onClick={onClick}
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      style={Object.assign({}, defStyle, style)}
      className={`
        cursor-pointer
        bg-white/10
        bg-center
        bg-no-repeat
        bg-contain
        sm:p-2
        lg:p-8
        inline-block
        relative
        ${className}
      `}
    >
      {children}
      {(checked || hover) &&
        <div
          className={`
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2
          w-1/2
          sm:h-1
          lg:h-2
          bg-red-600
          shadow-item
          shadow-red-600
        `}
        ></div>
      }
    </div>
    )
}
