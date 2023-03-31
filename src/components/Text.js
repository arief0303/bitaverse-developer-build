import React from 'react'

export default function TextComponent ({type = 'p-description', text = '', children, className = '', html = '', style, onClick}) {
  switch(type){
    case 'heading-1':
    return <>
      <h1 onClick={onClick} className={`font-bold sm:text-56 lg:text-64 ${className}`} style={style}>{children || text}</h1>
    </>

    case 'heading-2':
    return <>
      <h2 onClick={onClick} className={`font-bold sm:text-28 lg:text-56 ${className}`} style={style}>{children || text}</h2>
    </>

    case 'heading-3':
    return <>
      <h3 onClick={onClick} className={`font-bold sm:text-24 lg:text-28 ${className}`} style={style}>{children || text}</h3>
    </>

    case 'heading-4':
    return <>
      <h4 onClick={onClick} className={`font-bold sm:text-16 lg:text-24 ${className}`} style={style}>{children || text}</h4>
    </>

    case 'heading-5':
    return <>
      <h5 onClick={onClick} className={`font-semibold sm:text-14 lg:text-16 ${className}`} style={style}>{children || text}</h5>
    </>

    case 'p-lead':
    return <>
      <p onClick={onClick} className={`font-semibold sm:text-16 lg:text-24 ${className}`} style={style}>{children || text}</p>
    </>

    case 'p-description':
    return <>
      <p onClick={onClick} className={`font-normal sm:text-14 lg:text-16 ${className}`} style={style}>{children || text}</p>
    </>

    case 'p-html':
    return <>
      <p onClick={onClick} className={`font-normal sm:text-14 lg:text-16 ${className}`} dangerouslySetInnerHTML={{__html: html}} style={style}></p>
    </>

    case 'button-txt':
    return <>
      <span onClick={onClick} className={`font-bold sm:text-14 lg:text-16 ${className}`} style={style}>{children || text}</span>
    </>

    case 'label-txt':
    return <>
      <span onClick={onClick} className={`font-semibold sm:text-12 lg:text-14 ${className}`} style={style}>{children || text}</span>
    </>

    case 'placeholder-txt':
    return <>
      <span onClick={onClick} className={`font-semibold sm:text-14 lg:text-16 ${className}`} style={style}>{children || text}</span>
    </>

    case 'tab-txt':
    return <>
      <span onClick={onClick} className={`font-semibold sm:text-14 lg:text-16 ${className}`} style={style}>{children || text}</span>
    </>

    case 'chat-lead':
    return <>
      <span onClick={onClick} className={`font-bold sm:text-12 lg:text-14 ${className}`} style={style}>{children || text}</span>
    </>

    case 'chat-description':
    return <>
      <span onClick={onClick} className={`font-semibold sm:text-10 lg:text-12 ${className}`} style={style}>{children || text}</span>
    </>

    case 'link':
    return <>
      <a onClick={onClick} className={`font-bold sm:text-14 lg:text-16 ${className} text-yellow-500 hover:cursor-pointer hover:text-yellow-700 visited:text-yellow-700`} style={style}>{children || text}</a>
    </>

    default: return <>{children || text}</>
  }
}
