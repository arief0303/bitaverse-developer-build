import React, { useEffect, useState } from 'react'
import Text from './Text'
import Button from './Button'
import Toggle from './Toggle'
import Checkbox from './Checkbox'

export default function SettingPopupComponent ({ detail }) {
  const [isFullscreen, setIsFullscreen] = useState(null)
  const [quality, setQuality] = useState(window.localStorage.getItem("bita_quality") || null)
  const [sound, setSound] = useState(window.localStorage.getItem("bita_sound") || null)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
        setIsFullscreen(true)
      } else {
        setIsFullscreen(false)
      }
    }

    return (() => {
      setIsFullscreen(null)
    })
  }, [])

  const handleFullscreen = (a) => {
    const elem = typeof window !== 'undefined' ? document.documentElement : null
    if (!a && isFullscreen) {
      setIsFullscreen(false)
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    }
    if (a && !isFullscreen) {
      setIsFullscreen(true)
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    }
  }

  const handleQuality = (a) => {
    if (a === 'low') {
      const btnLow = document.getElementById("setLow")
      btnLow.click()
    }
    if (a === 'med') {
      const btnMed = document.getElementById("setMed")
      btnMed.click()
    }
    if (a === 'high') {
      const btnHigh = document.getElementById("setHigh")
      btnHigh.click()
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem("bita_quality", a)
      setQuality(a)
    }
  }

  const handleSound = (a) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem("bita_sound", a)
      setSound(a)
      if (a === 'on') {
        playPage()
      } else {
        mutePage()
      }
    }
  }

  const muteMe = (elem) => {
    elem.muted = true
    elem.pause()
  }

  const playMe = (elem) => {
    elem.muted = false
    elem.play()
  }

  const mutePage = () => {
    document.querySelectorAll("video, audio").forEach( elem => muteMe(elem) );
  }

  const playPage = () => {
    document.querySelectorAll("video, audio").forEach( elem => playMe(elem) );
  }

  return <>
    <div className='text-left sm:w-[303px] lg:w-[362px]'>
      <Text type='heading-4' text='Settings' className='text-red-500 sm:mb-4 lg:mb-8 sm:mt-0 lg:mt-2 block text-center' />
      <Text type='label-txt' text='Graphics' className='text-cyan-100 sm:mb-1 lg:mb-3 block text-left' />

      <div className='sm:mb-4 lg:mb-8 flex justify-between'>
        <Button type={quality === 'low' ? 'primary' : 'secondary'} onClick={() => handleQuality('low')} text='Low' className='' />
        <Button type={quality === 'med' ? 'primary' : 'secondary'} onClick={() => handleQuality('med')} text='Medium' className='' />
        <Button type={quality === 'high' ? 'primary' : 'secondary'} onClick={() => handleQuality('high')} text='High' className='' />
      </div>

      <div className='w-1/2'>
        <Toggle text='Background Music' className='sm:mb-4 lg:mb-8' onClick={() => handleSound(sound === 'off' ? 'on' : 'off')} checked={sound === 'on'} />
        <Checkbox type='primary' checked={isFullscreen} onClick={(a) => handleFullscreen(a)} text='Full Screen' className='sm:mb-4 lg:mb-8' />
      </div>
    </div>
  </>
}
