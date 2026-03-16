"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/add', label: 'Add Product', icon: '/assets/add_icon.png' },
  { href: '/list', label: 'List Products', icon: '/assets/order_icon.png' },
  { href: '/orders', label: 'List Orders', icon: '/assets/order_icon.png' },
]

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className='w-[18%] min-h-screen border border-[#a9a9a9] border-t-0 text-[max(1vw,10px)]'>
      <div className='sidebar-options pt-12.5 pl-[20%] flex flex-col gap-8'>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const baseClasses =
            'flex items-center gap-3 border border-[#a9a9a9] border-r-0 px-2.5 py-2.5 rounded-tl-[3px] rounded-bl-[3px] transition-colors'
          const activeClasses = 'bg-indigo-200 text-white border-indigo-400'
          const inactiveClasses = 'bg-transparent text-gray-800 hover:bg-indigo-50'

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            >
              <img src={item.icon} alt={`${item.label} icon`} className='h-5 w-5' />
              <span className='hidden md:block'>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
