import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import Text from './Text'

export default function InputComponent ({type = 'text', value, defaultValue, maxLength = '1000', onChange, onEnter, clearAfterEnter, icon, name, label, placeholder, errMessage = '', disabled, className = '', style = {}}) {
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const defStyle = {
    height: '50px',
    padding: '19px 16px',
    textDecoration: 'none',
    clipPath: 'polygon(calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px), 0 0)'
  }

  const handleMouseIn = () => {
    if (!disabled) setHover(true)
  }

  const handleMouseOut = () => {
    if (!disabled) setHover(false)
  }

  const handleFocusIn = () => {
    if (!disabled) setFocus(true)
  }

  const handleFocusOut = () => {
    if (!disabled) setFocus(false)
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter' && typeof onEnter === 'function') {
      onEnter(e.target.value, name)
      if (clearAfterEnter) {
        e.target.value = ''
      }
    }
  }

  return (
    <>
      {!!label &&
        <Text type='label-txt' className={`text-left sm:mb-1 lg:mb-3 block ${disabled ? 'text-cyan-800' : 'text-secondary'}`}>
          {label}
        </Text>
      }
      <div
        onMouseEnter={handleMouseIn}
        onMouseLeave={handleMouseOut}
        style={Object.assign({}, defStyle, style)}
        className={`
          bg-white/10
          flex
          items-center
          border-2
          ${!hover && !focus && !errMessage ? 'border-transparent' : ''}
          ${hover ? 'border-secondary' : ''}
          ${focus ? 'border-secondary' : ''}
          ${!!errMessage ? 'border-notification' : ''}
          ${disabled ? 'cursor-not-allowed' : ''}
          relative
          after:content-['']
          after:absolute
          after:h-[10px]
          after:w-[2px]
          after:top-[-2px]
          after:right-0
          after:border-r-3
          ${!hover && !focus && !errMessage ? 'after:border-transparent' : ''}
          ${hover ? 'after:border-secondary' : ''}
          ${focus ? 'after:border-secondary' : ''}
          ${!!errMessage ? 'after:border-notification' : ''}
          after:border-solid
          after:-rotate-45
          after:origin-center
          before:content-['']
          before:absolute
          before:h-[10px]
          before:w-[2px]
          before:bottom-[-2px]
          before:left-0
          before:border-r-3
          ${!hover && !focus && !errMessage ? 'before:border-transparent' : ''}
          ${hover ? 'before:border-secondary' : ''}
          ${focus ? 'before:border-secondary' : ''}
          ${!!errMessage ? 'before:border-notification' : ''}
          before:border-solid
          before:-rotate-45
          before:origin-center
          ${className}
        `}
      >
        {!!icon &&
          <span className={`mr-3 basis-6 ${disabled ? 'text-cyan-800' : 'text-warning'}`}>
            {icon}
          </span>
        }
        <input
          type={showPass ? 'text' : type}
          value={value}
          defaultValue={defaultValue}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onChange && onChange(event.target.value, name)}
          onFocus={handleFocusIn}
          onBlur={handleFocusOut}
          onKeyPress={onKeyPress}
          maxLength={maxLength}
          className={`
            grow
            bg-transparent
            text-secondary
            font-semibold
            text-16
            focus-visible:outline-none
            disabled:cursor-not-allowed
            disabled:text-cyan-800
            placeholder:text-cyan-800
            placeholder:font-semibold
            placeholder:text-16
          `}
        />
        {type === 'password' && !showPass &&
          <EyeIcon onClick={() => { if (!disabled) setShowPass(true) }} className={`h-6 w-6 ml-3 basis-6 ${disabled ? 'cursor-not-allowed stroke-cyan-800' : 'cursor-pointer stroke-warning'}`}/>
        }
        {type === 'password' && showPass &&
          <EyeOffIcon onClick={() => { if (!disabled) setShowPass(false) }} className={`h-6 w-6 ml-3 basis-6 ${disabled ? 'cursor-not-allowed stroke-cyan-800' : 'cursor-pointer stroke-warning'}`}/>
        }
      </div>
      {!!errMessage &&
        <Text type='label-txt' className={`w-full mt-3 block text-notification`}>
          {errMessage}
        </Text>
      }
    </>
  )

}
