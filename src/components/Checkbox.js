import React, { useEffect, useState } from 'react'
import Text from './Text'

export default function CheckboxComponent ({type = 'primary', text = '', children, onChange = () => {}, onClick = () => {}, checked = false, disabled, className = '', style = {}}) {
  // const [selected, setSelected] = useState(checked || false)
  const handleClick = () => {
    onClick(!checked)
    onChange(text)
  }
  useEffect(() => {}, [checked])
  
  return (
    <div
      onClick={disabled ? null : () => handleClick && handleClick()}
      style={style}
      className={`
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        inline-flex
        items-center
        ${className}
      `}
      disabled={disabled}
    >
      {type === 'primary' &&
        <div className={`
          ${disabled ? 'bg-checked-1-dis' : (checked ? 'bg-checked-1' : 'bg-unchecked')}
          w-5
          h-5
          mr-3.5
        `}>
        </div>
      }
      {type === 'secondary' &&
        <div className={`
          ${disabled ? 'bg-checked-2-dis' : (checked ? 'bg-checked-2' : 'bg-unchecked')}
          w-5
          h-5
          mr-3.5
        `}>
        </div>
      }
      <Text type='button-txt' className={disabled ? 'text-cyan-800' : 'text-white'}>
        {children || text}
      </Text>
    </div>
  )

}
