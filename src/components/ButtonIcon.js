import React from 'react'

export default function MenuSettingComponent ({children, className = '', style = {}, onClick}) {
  const closeStyle = {
    clipPath: 'polygon(100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px), 0 0)'
  }

  return (
    <div className={`relative select-none inline-block ${className}`}>
      <div
        onClick={onClick}
        style={Object.assign({}, closeStyle, style)}
        className={`
        inline-block
        relative
        bg-primary
        border
        border-secondary
        sm:p-2.5
        lg:p-3.5
        cursor-pointer
        before:content-['']
        before:absolute
        before:h-[10px]
        before:w-[3px]
        before:bottom-[-2px]
        before:left-[1px]
        before:border
        before:border-secondary
        before:border-solid
        before:-rotate-45
        before:origin-center
      `}>
        {children}
      </div>
    </div>
  )

}
