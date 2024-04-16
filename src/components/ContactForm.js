import React from 'react'
import { useForm, ValidationError } from '@formspree/react'
import '../styles/contactForm.css'
function ContactForm () {
  const [state, handleSubmit] = useForm('contactForm')
  if (state.succeeded) {
    return <p>Thanks for joining!</p>
  }
  return (
    <form
      // onSubmit={handleSubmit}
      action='https://formspree.io/f/mwkdllrp'
      method='POST'
      className='contact-form'
    >
      <div className='form-div'>
      <h5>Get In Touch</h5>
      <p>We're open  for any suggestions or  just  have a chat</p>
        <label htmlFor='email'>Email Address</label>
        <input
          type='email'
          name='email'
          //   className='email'
          placeholder='enter a valid  email'
          className='email-content'
          required
        />
        <label htmlFor='email'>Message</label>
        {/* <ValidationError prefix='Email' field='email' errors={state.errors} /> */}
        <textarea
          id='message'
          required
          name='message'
          className='text-content'
          placeholder='enter  message'
        />
        {/* <ValidationError
          prefix='Message'
          field='message'
          errors={state.errors}
        /> */}
        <br />
        <button
          type='submit'
          disabled={state.submitting}
          className='message-submit'
        >
          Submit
        </button>
      </div>
    </form>
  )
}
export default ContactForm
