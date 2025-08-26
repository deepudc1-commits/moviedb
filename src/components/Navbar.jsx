import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-10">
        <div className="flex-1">
            <Link className="btn btn-ghost text-xl" to='/'>FilmsVault</Link>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
            <li><NavLink to='/movies'>Movies</NavLink></li>
            <li><NavLink to='/shows'>TV Shows</NavLink></li>
            <li><NavLink to='/people'>People</NavLink></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
