import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { links, icons } from '../utils/constants'
import { useAuthContext } from '../context/auth_context'
import { FiHome } from 'react-icons/fi'
import { FaRegUser } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { useCartContext } from '../context/cart_context'

import '../styles/header/navbar.css'
const Nav = () => {
  const [checkLogin, setCheckLogin] = useState(Boolean)
  const { total_quantity } = useCartContext()
  const { logoutUser, is_logged_in, user, is_authenticated } = useAuthContext()
  let navigate = useNavigate()
  // setCheckLogin(is_logged_in)
  const token = localStorage.getItem('token')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('Access_Token')
    localStorage.removeItem('userId')

    logoutUser()

    console.log(
      'logout IS  LOGGED IN  FALSE TRUE>>>>',
      is_logged_in,
      is_authenticated
    )
  }

  return (
    <nav className='nav-links'>
      <div className='nav-link-user'>
        <Link to='login' className='signin-link'>
          <FaRegUser className='sign-in-icon' />
          Login
        </Link>
      </div>
      <div className='nav-center'>
        {/* <ul className='nav-links-other-url'> */}
        {links.map((link, index) => (
          <div className='nav-links-other-url' key={index}>
            <Link to={link.url} className='link-text'>
              {link.icon}

              {link.text}
            </Link>
          </div>
        ))}

        <div className='cart-items-here-dont-style'>
          <Link to='/cart'>
            {total_quantity ? (
              <div className='cart-item-present-div'>
                <IoCartOutline className='item-cart-content-icon' />
                <div className='cart-total-quantity'>{total_quantity}</div>{' '}
              </div>
            ) : (
              <>
                <div>
                  <IoCartOutline className='item-cart-content-icon' />
                </div>
              </>
            )}
          </Link>
          {console.log('cartTotal is ', total_quantity)}
        </div>
      </div>

      <div>
        {token ? (
          <button onClick={handleLogout} className='btn-logout'>
            Logout
          </button>
        ) : null}
        {console.log(
          'Checking Logging And Checking LogOut',
          is_authenticated
          // setCheckLogin(is_logged_in)
        )}
      </div>
    </nav>
  )
}

export default Nav
