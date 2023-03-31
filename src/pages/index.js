import Head from "next/head"
import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Modal from '../components/Modal'
import Text from '../components/Text'
import Area from '../components/Area'
import Button from '../components/Button'
import MenuProfile from '../components/MenuProfile'
import MenuSetting from '../components/MenuSetting'
import MenuHelp from '../components/MenuHelp'
import MenuMap from '../components/MenuMap'

// Load BabylonScene component only on the client side.
const BabylonScene = dynamic(() => import(`components/BabylonScene`), { ssr: false })

export default function HomePage(props) {
  const [loaded, setLoaded] = useState(false)
  const [showModal, setShowModal] = useState(true);
  const [hover, setHover] = useState('')
  const handleMouseIn = (e) => { setHover(e) }
  const handleMouseOut = (e) => { setHover(e) }
  const overlay = {
    fontSize: '32px',
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: '#ffff00',
    marginRight: '20px'
  };

  // Execute setLoaded(true) on the client side immediately after
  // HomePage() is rendered. This will change the state and trigger
  // re-render of HomePage().

  // We want the immediate re-rendering to happen because
  // 1) first time (back when `loaded === false` was true) when we render
  // we ddon't render BabylonScene component at all
  // (see `loaded && ...` line below) and so the page *renders completely*
  // (and, hopefully, on the server) except with no Babylon.js scene/stuff
  // on it (crawlers, bots, page speed analysers will love that!).
  // 2) rendering it for the second time immediately after, we will actually
  // render BabylonScene component, and so BabylonScene.render() will add the
  // canvas node to the DOM tree and BabylonScene.componentDidMount() will
  // execute all our Babylon {engine, scene, cameras, light, etc} setup on
  // the client side immediately after the component (canvas element)
  // is mounted to the DOM.
  useEffect(() => setLoaded(true))

  return (
    <>
      <div style={overlay}>DEVELOPER BUILD</div>
      <Head>
        <title>Bitaverse Dev Build</title>
      </Head>
      <MenuMap />
      <MenuProfile />
      <MenuSetting />
      <MenuHelp />
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}>
        <div className={`landscape:flex portrait:hidden w-screen h-screen overflow-hidden bg-landing bg-no-repeat bg-cover bg-fixed flex-col items-center justify-center`} >
          <div className='text-center'>
            <img src='/images/logo-bitaverse.svg' alt='Logo Bitaverse' className='inline-block lg:h-12' />
          </div>
          <div className={'text-center'}>
            <Area
              disableClose
              onMouseEnter={(e) => handleMouseIn('1')}
              onMouseLeave={(e) => handleMouseOut('')}
              className='sm:w-80 lg:w-[394px] h-fit inline-block text-center transition ease-in-out lg:hover:scale-110'
            >
              <Text type='heading-4' text='PLAY AS GUEST' className='text-cyan-100 mb-5 mt-4' />
              <img src='/images/char-guest.png' alt='char' className='sm:h-24 lg:h-52 inline-block' />
              <div className=''>
                <Button text='CONTINUE AS GUEST' className={`w-full transition ease-in-out sm:opacity-100 ${hover === '2' ? 'lg:opacity-100' : 'lg:opacity-100'}`} onClick={() => setShowModal(false)} />
                <Text type='p-description' className='text-white mt-6'>
                  Your information will be locally stored and your experience limited.
                </Text>
              </div>
            </Area>
          </div>
        </div>
      </Modal>
      {loaded && <BabylonScene {...props} />}
    </>
  )
}
