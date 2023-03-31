import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: false })
import { Tab, TabList, TabPanel } from 'react-tabs'
import { Collapse } from 'react-collapse'
import { XIcon } from '@heroicons/react/solid'
import { QuestionMarkCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
// import useSound from 'use-sound'
// import clickSfx from '@public/sfx/button-click.wav'
// import hoverSfx from '@public/sfx/button-hover.wav'
import Text from './Text'

export default function MenuHelpComponent({ children, user, onShow = () => { }, onHide = () => { }, isShow, className = '', style = {} }) {
  const [opened, setOpened] = useState(0)
  const [isVisible, setIsVisible] = useState(false);

  // const [playClickSfx] = useSound(clickSfx)
  // const [playHoverSfx] = useSound(hoverSfx)

  useEffect(() => {
  }, [user])

  const defStyle = {
    textDecoration: 'none',
    clipPath: 'polygon(100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px, 20px 0)'
  }
  const closeStyle = {
    clipPath: 'polygon(100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px), 0 0)'
  }
  const handleClick = () => {
    // playClickSfx()
    onShow('help')
  }

  const CustomTab = ({ children, selected, ...otherProps }) => {
    return (
      <Tab {...otherProps} className='flex items-center cursor-pointer'>
        {selected &&
          <Text type='heading-3' className={'text-secondary relative pb-2'}>
            {children}
            <img src='/assets/tab-glow.svg' alt='glow' className='w-full h-4 absolute bottom-0' />
          </Text>
        }
        {!selected &&
          <Text type='heading-4' className={'text-cyan-800'}>
            {children}
          </Text>
        }
      </Tab>
    )
  }
  CustomTab.tabsRole = 'Tab'

  return (
    <div className={`absolute select-none inline-block right-20 m-3 ${className}`}>
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
        <QuestionMarkCircleIcon className='h-4 w-4 stroke-secondary' />
        {/* {!user.is_popup_help_center_closed &&
          <span className='absolute sm:top-[10px] lg:top-[15px] sm:right-[10px] lg:right-[15px] inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'></span>
        } */}
      </div>

      <div className={`
        ${isVisible ? 'block' : 'hidden'}
        absolute
        sm:top-[45px]
        lg:top-[52px]
        right-0
      `}>
        <div style={defStyle} className={`
          relative
          bg-primary
          py-5
          sm:w-[254px]
          lg:w-[400px]
          z-50
        `}>
          <div className={`
            flex
            items-center
            justify-between
            px-5
            sm:mb-2
            lg:mb-5
          `}>
            <Text type='heading-4' className='text-cyan-100'>
              Help Center
            </Text>
            <XIcon onClick={() => setIsVisible(!isVisible)} className='fill-secondary h-5 w-5 inline-block cursor-pointer' />
          </div>

          <div className={`
            sm:h-[206px]
            lg:h-[376px]
            overflow-auto
          `}>
            <Tabs>
              <TabList className={`
                m-0
                mb-5
                p-0
                flex
                items-center
                justify-evenly
                relative
                before:content-['']
                before:absolute
                before:h-px
                before:w-full
                before:bottom-0
                before:left-0
                before:bg-tabs
              `}>
                <CustomTab>Basic</CustomTab>
                <CustomTab>Farm</CustomTab>
                <CustomTab>Store</CustomTab>
              </TabList>

              <TabPanel>
                <div className='px-5 my-2'>
                  <div onClick={() => setOpened(0)} className='flex items-center justify-between cursor-pointer'>
                    <Text type='heading-4' className='text-cyan-100'>
                      MOVEMENT
                    </Text>
                    {opened === 0 &&
                      <ChevronUpIcon className='stroke-cyan-800 h-6 w-6 inline-block' />
                    }
                    {opened !== 0 &&
                      <ChevronDownIcon className='stroke-cyan-800 h-6 w-6 inline-block' />
                    }
                  </div>
                  <Collapse isOpened={opened === 0}>
                    <div className='py-3.5'>
                      <div className='w-full sm:h-[78px] lg:h-[160px] sm:bg-movement-mobile lg:bg-movement bg-cover bg-no-repeat rounded'></div>
                      <Text type='p-description' className='text-cyan-100 sm:hidden lg:block inline'>
                        You can control your character using keyboard.
                      </Text>
                      <Text type='p-description' className='text-cyan-100 sm:block lg:hidden inline'>
                        Pergerakan Karakter bisa menggunakan joystick
                      </Text>
                      <Text type='heading-5' className='text-secondary sm:hidden lg:block inline'>
                        &nbsp; (W,A,S,D) or arrows
                      </Text>
                    </div>
                  </Collapse>
                </div>
                <div className='px-5 my-2'>
                  <div onClick={() => setOpened(1)} className='flex items-center justify-between cursor-pointer'>
                    <Text type='heading-4' className='text-cyan-100'>
                      Interaction
                    </Text>
                    {opened === 1 &&
                      <ChevronUpIcon className='stroke-cyan-800 h-6 w-6 inline-block' />
                    }
                    {opened !== 1 &&
                      <ChevronDownIcon className='stroke-cyan-800 h-6 w-6 inline-block' />
                    }
                  </div>
                  <Collapse isOpened={opened === 1}>
                    <div className='py-3.5'>
                      <Text type='p-description' className='text-cyan-100 inline'>
                        Coming Soon
                      </Text>
                    </div>
                  </Collapse>
                </div>
                <div className='px-5 my-2'>
                  <div onClick={() => setOpened(2)} className='flex items-center justify-between cursor-pointer'>
                    <Text type='heading-4' className='text-cyan-100'>
                      Emoji
                    </Text>
                    {opened === 2 &&
                      <ChevronUpIcon className='stroke-cyan-800 h-6 w-6 inline-block' />
                    }
                    {opened !== 2 &&
                      <ChevronDownIcon className='stroke-cyan-800 h-6 w-6 inline-block' />
                    }
                  </div>
                  <Collapse isOpened={opened === 2}>
                    <div className='py-3.5'>
                      <Text type='p-description' className='text-cyan-100 inline'>
                        Coming Soon
                      </Text>
                    </div>
                  </Collapse>
                </div>
              </TabPanel>
              <TabPanel>
                <div className='px-5 my-2'>
                  <Text type='p-description' className='text-cyan-100 inline'>
                    Coming Soon
                  </Text>
                </div>
              </TabPanel>
              <TabPanel>
                <div className='px-5 my-2'>
                  <Text type='p-description' className='text-cyan-100 inline'>
                    Coming Soon
                  </Text>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
        <div className={`
          absolute
          z-10
          bottom-[-22px]
          sm:w-60
          lg:w-80
          sm:h-[21px]
          lg:h-[31px]
          bg-bottom-glow
          bg-bottom
        `}>
        </div>
      </div>
    </div>
  )

}
