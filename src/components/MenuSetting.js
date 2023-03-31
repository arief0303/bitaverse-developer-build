import React, { useState, useEffect } from 'react'
import { CogIcon as CogOutline } from '@heroicons/react/outline'
import Text from './Text'
import Button from './Button'
import Toggle from './Toggle'
import Checkbox from './Checkbox'
// import useSound from 'use-sound'
// import clickSfx from '@public/sfx/button-click.wav'
// import hoverSfx from '@public/sfx/button-hover.wav'

export default function MenuSettingComponent({ children, onShow = () => { }, onHide = () => { }, isShow, className = '', style = {} }) {
  // const [playClickSfx] = useSound(clickSfx)
  // const [playHoverSfx] = useSound(hoverSfx)
  const [isVisible, setIsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(null)
  // const [quality, setQuality] = useState(window.localStorage.getItem("bita_quality") || null)
  // const [sound, setSound] = useState(window.localStorage.getItem("bita_sound") || null)
  const closeStyle = {
    clipPath: 'polygon(100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px), 0 0)'
  }
  const handleClick = () => {
    // playClickSfx()
    onShow('setting')
  }
  const defStyle = {
    textDecoration: 'none',
    clipPath: 'polygon(100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px, 20px 0)'
  }

  return (
    <>
      <div className={`absolute select-none right-16 m-3 ${className}`}>
        <div
          // onMouseEnter={() => playHoverSfx()}
          onClick={() => setIsVisible(!isVisible)}
          style={closeStyle}
          className={`
        inline-block
        absolute
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
          <CogOutline className='h-4 w-4 stroke-secondary' />
          {/* <span className='absolute top-[15px] right-[15px] inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'></span> */}
        </div>
      </div>


      <div style={defStyle} className={`${isVisible ? 'block' : 'hidden'} m-64 shadow-lg bg-primary justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}>
        <div className='absolute text-left sm:w-[303px] lg:w-[362px] '>
          <Text type='heading-4' text='Settings' className='text-red-500 sm:mb-4 lg:mb-8 sm:mt-0 lg:mt-2 block text-center' />
          <Text type='label-txt' text='Graphics' className='text-cyan-100 sm:mb-1 lg:mb-3 block text-left' />

          {/* <div className='sm:mb-4 lg:mb-8 flex justify-between'>
          <Button type={quality === 'low' ? 'primary' : 'secondary'} onClick={() => handleQuality('low')} text='Low' className='' />
          <Button type={quality === 'med' ? 'primary' : 'secondary'} onClick={() => handleQuality('med')} text='Medium' className='' />
          <Button type={quality === 'high' ? 'primary' : 'secondary'} onClick={() => handleQuality('high')} text='High' className='' />\
         < /div> */}

          <div className='sm:mb-4 lg:mb-8 flex justify-between'>
            <Button text='Low' className='' />
            <Button text='Medium' className='' />
            <Button text='High' className='' />\
          </div>

          {/* <div className='w-1/2'>
          <Toggle text='Background Music' className='sm:mb-4 lg:mb-8' onClick={() => handleSound(sound === 'off' ? 'on' : 'off')} checked={sound === 'on'} />
          <Checkbox type='primary' checked={isFullscreen} onClick={(a) => handleFullscreen(a)} text='Full Screen' className='sm:mb-4 lg:mb-8' />
         </div> */}

          <div className='w-1/2'>
            <Toggle text='Background Music' className='sm:mb-4 lg:mb-8' />
            <Checkbox type='primary' checked={isFullscreen} onClick={(a) => handleFullscreen(a)} text='Full Screen' className='sm:mb-4 lg:mb-8' />
          </div>

        </div>
        {/* <div className="opacity-25 fixed inset-0 z-40 bg-black h-screen"></div> */}
      </div>
    </>
  )

}
