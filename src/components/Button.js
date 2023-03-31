import React, { useState } from 'react'
// import useSound from 'use-sound'
// import clickSfx from '@public/sfx/button-click.wav'
// import hoverSfx from '@public/sfx/button-hover.wav'
import Text from './Text'

export default function ButtonComponent ({id, type = 'primary', text = '', onHover = () => {}, children, disabled, className2 = '', className = '', style = {}, onClick}) {
  const [hover, setHover] = useState(false)
  // const [playClickSfx] = useSound(clickSfx)
  // const [playHoverSfx] = useSound(hoverSfx)
  const defStyle = {
    minHeight: '40px',
    padding: '5px',
    textDecoration: 'none',
    textAlign: 'center',
    clipPath: 'polygon(calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px), 0 0)'
  }
  const spanStyle = {
    minHeight: '28px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 24px',
    textDecoration: 'none',
    textAlign: 'center',
    clipPath: 'polygon(calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px), 0 0)'
  }

  const handleMouseIn = () => {
    // playHoverSfx()
    setHover(true)
    onHover(true)
  }

  const handleMouseOut = () => {
    setHover(false)
    onHover(false)
  }

  const handleClick = (e) => {
    // playClickSfx()
    onClick(e)
  }

  return (
    <button
      id={id}
      type='button'
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      style={Object.assign({}, defStyle, style)}
      className={`
        bg-transparent
        opacity-100
        inline-flex
        items-center
        border
        border-secondary
        ${hover ? 'border-cyan-300' : ''}
        active:border-cyan-300
        disabled:border-cyan-900
        disabled:cursor-not-allowed
        relative
        after:content-['']
        after:absolute
        after:h-[11px]
        after:w-[1px]
        after:top-[-2px]
        after:right-[1px]
        after:border-r-3
        after:border-secondary
        ${hover ? 'after:border-cyan-300' : ''}
        after:active:border-cyan-300
        after:disabled:border-cyan-900
        after:border-solid
        after:-rotate-45
        after:origin-center
        before:content-['']
        before:absolute
        before:h-[11px]
        before:w-[1px]
        before:bottom-[-2px]
        before:left-[1px]
        before:border-r-3
        before:border-secondary
        ${hover ? 'before:border-cyan-300' : ''}
        before:active:border-cyan-300
        before:disabled:border-cyan-900
        before:border-solid
        before:-rotate-45
        before:origin-center
        ${className}
      `}
      disabled={disabled}
      onClick={(e) => handleClick(e)}
    >
      {type === 'primary' &&
        <span style={spanStyle} className={`${disabled ? 'bg-cyan-900' : `bg-secondary ${hover ? 'bg-cyan-300' : ''} active:bg-cyan-300`} h-full ${className2}`}>
          <Text type='button-txt' className={`w-full ${disabled ? 'text-cyan-700' : 'text-primary'}`}>
            {children || text}
          </Text>
        </span>
      }
      {type === 'secondary' &&
        <span style={spanStyle} className={`${disabled ? 'bg-transparent' : `bg-transparent ${hover ? 'bg-cyan-300' : ''}`} h-full`}>
          <Text type='button-txt' className={`w-full ${disabled ? 'text-cyan-900' : (hover ? 'text-primary' : 'text-secondary')}`}>
            {children || text}
          </Text>
        </span>
      }
    </button>
  )

}
