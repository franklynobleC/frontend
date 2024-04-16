import React from 'react'
import '../styles/contact.css'

import { FiSend } from 'react-icons/fi'

const Contact = () => {
  return (
    <section className='contact-us'>
      <div className='content'>
        <form
          className='contact-form'
          action='https://formspree.io/f/mwkdllrp'
          method='POST'
        >
          <strong className='strong'>
            {' '}
            Join Our NewsLetter and get 20% off{' '}
          </strong>
          <div className='form-details'>
            <input
              required
              type='email'
              placeholder='enter  email'
              name='email'
              className='search-input-search'
            />

            <button type='submit' className='submit-btn'>
              subscribe
            </button>
          </div>
        </form>
        <strong className='strong'>
          subscribe for freshest meals Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Hic quo consequuntur vero quas vitae eum dicta
          soluta facere rem doloremque? A, unde eaque. Perferendis fuga iusto,
          possimus enim cupiditate sapiente.{' '}
        </strong>
      </div>
    </section>
  )
}

export default Contact
