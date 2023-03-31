import React, { useState } from 'react'
import { GlobeAltIcon } from '@heroicons/react/outline'
// import useSound from 'use-sound'
// import clickSfx from '@public/sfx/button-click.wav'
// import hoverSfx from '@public/sfx/button-hover.wav'

export default function MenuMapComponent({ children, onClick = () => { }, checked, option, className = '', style = {} }) {
  // const [selected, setSelected] = useState(false)
  // const [playClickSfx] = useSound(clickSfx)
  // const [playHoverSfx] = useSound(hoverSfx)
  const [isVisible, setIsVisible] = useState(false);
  const defStyle = {
    textDecoration: 'none',
    clipPath: 'polygon(100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px, 20px 0)'
  }
  const closeStyle = {
    clipPath: 'polygon(100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px), 0 0)'
  }
  const handleClick = () => {
    // playClickSfx()
    // setSelected(!selected)
    onClick('map')
  }

  return (
    <>
      <div className={`bottom-10 right-8 absolute select-none inline-block ${className}`}>
        <div
          // onMouseEnter={() => playHoverSfx()}
          onClick={() => setIsVisible(!isVisible)}
          style={closeStyle}
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

          <GlobeAltIcon className='h-4 w-4 stroke-secondary' />
          {/* <span className='absolute top-[15px] right-[15px] inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'></span> */}
        </div>
      </div>

      <div className={`${isVisible ? 'block' : 'hidden'}`}>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div style={defStyle} className="border-0 shadow-lg relative flex flex-col w-full bg-primary outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 rounded-t">
                <h3 type='heading-4' className="text-3xl text-white font-bold">
                  Map
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setIsVisible(false)}
                >
                  {/* <span className="bg-transparent text-white opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span> */}
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <img src="/images/world-map.png" alt="world-map" />
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setIsVisible(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
      </div>
    </>
  )

}
