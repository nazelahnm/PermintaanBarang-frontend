import React from 'react'
import Icon from '../../../src/assets/404.png'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="w-full h-full overflow-hidden bg-white shadow-xl rounded-xl ">
      <div className="flex justify-center">
        <img src={Icon} alt="" />
      </div>
      <div className="flex justify-center">
        <Link to={'/'} className='btn '>Go back</Link>
      </div>
    </div>
  )
}
