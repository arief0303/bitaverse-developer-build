import React, { useState } from 'react'
import { FolderDownloadIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import Text from './Text'

export default function DropdownComponent ({text = '', name, children, onChange = () => {}, value, option, disabled, className = '', style = {}}) {
  const [isOpen, setIsOpen] = useState(false)
  const [select, setSelect] = useState(value || {})
  const defStyle = {
    textDecoration: 'none',
    textAlign: 'center',
    clipPath: 'polygon(calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px), 0 0)'
  }
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (val) => {
    setSelect(val)
    onChange(val?.id, name)
    setIsOpen(!isOpen)
  }

  return (
    <div className={`
      relative
      select-none
      ${className}
    `}>
      <div
        onClick={disabled ? null : () => handleClick && handleClick()}
        style={Object.assign({}, defStyle, style)}
        className={`
          ${disabled ? 'cursor-not-allowed bg-cyan-800' : 'cursor-pointer bg-secondary'}
          min-w-[150px]
          h-14
          p-4
          flex
          items-center
          justify-between
        `}
      >
        <Text type='button-txt' className='text-primary'>{select.name}</Text>
        {isOpen && <ChevronUpIcon className='h-5 w-5 fill-primary inline-block'/>}
        {!isOpen && <ChevronDownIcon className='h-5 w-5 fill-primary inline-block'/>}
      </div>
      <div style={defStyle} className={`
        absolute
        ${isOpen ? 'block' : 'hidden'}
        bg-cyan-900/80
        px-4
        py-2.5
        w-full
        mt-1
        z-10
      `}>
        {option?.length &&
          option.map((val, id) => (
            <div key={id} onClick={() => handleSelect(val)} className={`
              flex
              items-center
              cursor-pointer
              pb-2.5
            `}>
              <FolderDownloadIcon className='fill-secondary h-5 w-5 inline-block'/>
              <Text type='placeholder-txt' className='text-cyan-100 ml-[10px]'>
                {val.name}
              </Text>
            </div>
          ))
        }
        {!option?.length &&
          <div className={`
            flex
            items-center
            cursor-pointer
            pb-2.5
          `}>
            <FolderDownloadIcon className='fill-secondary h-5 w-5 inline-block'/>
            <Text type='placeholder-txt' className='text-cyan-100 ml-[10px]'>
              {/* {children || text} */}
              Submenu
            </Text>
          </div>
        }
      </div>
    </div>
  )

}
