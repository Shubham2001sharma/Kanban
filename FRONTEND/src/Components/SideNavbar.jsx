/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

function SideNavbar() {
  return (
    <div className="w-64 h-screen bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-white mb-8 border-b-2">KanBan APP</h1>
      <nav>
        <ul>
          <li className="mb-6">
            <Link to="/todo" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              TODO APP
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/doing" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              DOING APP
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/done" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              DONE APP
            </Link>
          </li>
          <li className="mb-6">
            <Link to="/archive" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">
              ARCHIVE
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideNavbar
