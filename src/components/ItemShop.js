import React, { useEffect, useState }  from 'react'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import Text from './Text'

export default function ItemShopComponent ({bgUrl, text, isEdit = false, name, id = '', className = '', checked, onClick = () => {}, onClickEdit = () => {}, onClickDelete = () => {}, style = {}}) {
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
      onClick={!isEdit ? onClick : null}
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
      <div onClick={isEdit ? onClick : null} style={{ backgroundImage: `url('${bgUrl}')` || '' }} className={`
        w-full
        sm:h-32
        lg:h-52
        bg-no-repeat
        bg-cover
        bg-center
      `}></div>
      <Text onClick={isEdit ? onClick : null}  type='heading-5' text={text} className={`text-red-500 shadow-red-600 ${!isEdit ? 'py-2' : ''}`} />
      {isEdit &&
        <div className='
        '>
          <PencilAltIcon onClick={onClickEdit} className='h-4 w-4 stroke-secondary inline-block mr-3'/>
          <TrashIcon onClick={onClickDelete} className='h-4 w-4 stroke-secondary inline-block'/>
        </div>
      }
    </div>
    )
}
