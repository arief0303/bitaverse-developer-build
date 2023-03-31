import React, { useState } from 'react'
import Text from './Text'

export default function ToggleComponent ({text = '', children, onClick = () => {}, checked, disabled, className = '', style = {}}) {
  const [selected, setSelected] = useState(checked || false)
  const handleClick = () => {
    onClick(!selected)
    setSelected(!selected)
  }

  return (
    <div
      onClick={disabled ? null : () => handleClick && handleClick()}
      style={style}
      className={`
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        w-full
        flex
        justify-between
        items-center
        ${className}
      `}
      disabled={disabled}
    >
      <Text type='button-txt' className='text-white'>
        {children || text}
      </Text>
      <div className={`
        ${disabled ? 'bg-switch-dis' : (selected ? 'bg-switch-on' : 'bg-switch-off')}
        w-[38px]
        h-5
      `}>
      </div>
    </div>
  )

}
