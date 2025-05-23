import React from 'react'

function Header(props) {
  return (
    <header className="py-6 bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold tracking-tight">{props.text}</h1>
        </div>
    </header>
  )
}

export default Header;