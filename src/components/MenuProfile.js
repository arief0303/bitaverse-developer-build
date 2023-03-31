import React, { useEffect, useState }  from 'react'
import { useRouter } from 'next/router'
// import useSound from 'use-sound'
// import clickSfx from '@public/sfx/button-click.wav'
// import hoverSfx from '@public/sfx/button-hover.wav'
import Text from './Text'

export default function ItemComponent ({user, children, className = '', type = 'full', onClick = () => {}, style = {}}) {
  const router = useRouter()
  const [hover, setHover] = useState(false)
  const [username, setUsername] = useState('Guest')
  // const [playClickSfx] = useSound(clickSfx)
  // const [playHoverSfx] = useSound(hoverSfx)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (router.pathname !== '/guest') setUsername(window.localStorage.getItem("bitauser") || 'Guest')
      if (router.pathname === '/guest') setUsername('Guest')
    }
  })
  const defStyle = {
    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))'
  }

  const handleMouseIn = () => {
    // playHoverSfx()
    setHover(true)
  }

  const handleMouseOut = () => {
    setHover(false)
  }

  const handleClick = () => {
    // playClickSfx()
    onClick('profile')
  }
 
  return (
    <div
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      onClick={() => handleClick()}
      style={Object.assign({}, defStyle, style)}
      className={`
        m-3
        cursor-pointer
        bg-panelDefault
        absolute
        ${type === 'full' ? 'sm:h-[51px] lg:h-[83px]' : 'sm:h-[50px] lg:h-[70px] align-top'}
        ${className}
      `}
    >
      {type === 'full' &&
        <div
          style={Object.assign({}, defStyle, {backgroundImage: `url('${user?.character?.head?.icon || '/images/profile.png'}')`})}
          className={`
            sm:w-[51px]
            lg:w-[83px]
            sm:h-[51px]
            lg:h-[83px]
            bg-white/10
            bg-contain
            inline-block
          `}
        ></div>
      }
      <div
        className={`
          ${type === 'full' ? 'align-top sm:px-3 lg:px-3 sm:py-1.5 lg:py-3' : 'align-middle w-[151px] px-5 py-1'}
          inline-block
        `}
      >
        <Text type='p-description' text={type === 'full' ? username : 'Bitapoints'} className={`text-white block ${type === 'full' ? 'sm:mb-0 lg:mb-1' : ''}`} />
        <Text type='heading-4' className='text-secondary block'>
          <img src='/assets/bitapoint.svg' alt='Bitapoint' className='inline-block sm:h-4 lg:h-8' />
          {user?.balance || '12.000'}
        </Text>
      </div>
    </div>
    )
}
