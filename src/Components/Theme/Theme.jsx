import React from 'react'

export default function Theme() {
    const setDarkMode=()=>{ 
        document.querySelector("body").setAttribute('data-theme','dark')
    }
    const setLightMode=()=>{ 
        document.querySelector("body").setAttribute('data-theme','light')
    }
  return (
    <div>
         <input 
         className='darkModeInput'
         type='checkbox'
         id='darkModeToggle'
         />
    </div>
  )
}
