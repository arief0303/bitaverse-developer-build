import React from 'react'

export default function PanelComponent ({children, className = '', style = {}}) {
  const defStyle = {
    clipPath: 'polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)'
  }
 
  return (
    <div style={defStyle} className='bg-panel p-px'>
      <div
        style={Object.assign({}, defStyle, style)}
        className={`
          bg-primary
          sm:p-2
          lg:p-8
          ${className}
        `}
      >
        {children}
      </div>
    </div>
    )
}
