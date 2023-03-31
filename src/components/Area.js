import React from 'react'
import { XIcon } from '@heroicons/react/solid'

export default function ModalComponent ({children, onClose = () => {}, onMouseEnter = () => {}, onMouseLeave = () => {}, disableClose = false, className = '', style = {}}) {
  const defStyle = {
    textDecoration: 'none',
    clipPath: 'polygon(100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px, 20px 0)'
  }
  const closeStyle = {
    clipPath: 'polygon(100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px), 0 0)'
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={Object.assign({}, defStyle, style)}
      className={`
        min-w-[250px]
        min-h-[50px]
        bg-primary
        sm:py-2
        lg:py-5
        sm:px-5
        lg:px-10
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
      `}
    >
      {!disableClose &&
        <div style={closeStyle} className={`
          absolute
          top-0
          right-0
          bg-primary
          p-3.5
          cursor-pointer
        `}>
          <XIcon onClick={() => onClose && onClose()} className='h-4 w-4 fill-secondary'/>
        </div>
      }
      {children}
    </div>
    )
}
