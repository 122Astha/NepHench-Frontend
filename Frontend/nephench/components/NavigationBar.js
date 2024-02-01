import React, { useState } from 'react'

const NavigationBar = () => {
  const Menus = [
    { name: 'Home', icon: 'home-outline', dis: 'translate-x-0' },
    { name: 'Profile', icon: 'person-outline', dis: 'translate-x-16' },
    { name: 'Message', icon: 'chatbubble-outline', dis: 'translate-x-32' },
    { name: 'Photos', icon: 'camera-outline', dis: 'translate-x-48' },
    { name: 'Settings', icon: 'settings-outline', dis: 'translate-x-64' },
  ]
  // const [active, setActive] = useState(0)
  return (
    <div className="bg-white max-h-[4.4rem] px-6 rounded-t-xl">
      <ul className="flex relative">
        <span
          className={`bg-rose-600 duration-500 border-4 border-gray-900 h-16 w-16 absolute
         -top-5 rounded-full`}
        >
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] 
          rounded-tr-[11px] shadow-myShadow1"
          ></span>
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px] shadow-myShadow2"
          ></span>
        </span>
      </ul>
    </div>
  )
}

export default NavigationBar
