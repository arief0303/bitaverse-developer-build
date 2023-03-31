import React, { useEffect, useState }  from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import Text from './Text'

export default function ItemSeedComponent ({bgUrl, text, isStore = false, number = 0, name, id = '', className = '', checked, onClick = () => {}, style = {}}) {
  const [hover, setHover] = useState(false)
  useEffect(() => {})
  const defStyle = {
    clipPath: 'polygon(100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 0)'
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
        bg-white/5
        sm:w-32
        lg:w-52
        inline-flex
        flex-col
        items-center
        justify-center
        relative
        border-2
        ${(hover && !checked) ? 'border-secondary after:border-secondary before:border-secondary' : 'border-transparent after:border-transparent before:border-transparent'}
        ${(checked) ? 'border-green-500 after:border-green-500 before:border-green-500' : ''}
        before:content-['']
        before:absolute
        before:h-[28px]
        before:w-[1px]
        before:bottom-[-6px]
        before:right-[7px]
        before:border-r-3
        before:border-solid
        before:rotate-45
        before:origin-center
        ${className}
      `}
    >
      <div style={{ backgroundImage: `url('${bgUrl}')` || '' }} className={`
        w-full
        sm:h-52
        lg:h-52
        bg-contain
        bg-no-repeat
        bg-primary
        bg-center
      `}></div>
      <div className='w-full px-3 py-2 flex items-center justify-between'>
        <Text type='heading-4' text={text} className={`${(checked || hover) ? 'text-red-500' : 'text-cyan-100'} shadow-red-600 py-2`} />
        <div className='flex flex-col items-center justify-center'>
          <Text type='heading-4' text={number} className={`text-secondary shadow-red-600`} />
          <Text type='heading-5' text={isStore ? 'Price' : 'Seed'} className={`text-cyan-100 shadow-red-600`} />
        </div>
      </div>
      
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
