import React, { useEffect, useReducer, useContext, useState } from 'react'
import axios from 'axios'
import '../config/firebase-config'
import { createClient } from '@supabase/supabase-js'
// import { Auth } from '@supabase/auth-ui-react'

import {
  register_user_url,
  login_user_url,
  logout_user_url,
  single_user_url,
  update_user_url,
  forgot_password_url
} from '../utils/constants'
import auth_reducer from '../reducers/auth_reducer'

// import { useHistory, withRouter, Link } from 'react-router-dom'

import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  GET_SINGLE_USER_BEGIN,
  SINGLE_USER_UPDATE_ERROR,
  SINGLE_USER_UPDATE_SUCCESS,
  REGISTER_USER_BEGIN
} from '../actions'

const initialState = {
  is_registered: false,
  register_error: false,
  register_loading: false,
  is_logged_in: false,
  is_authenticated: false,
  is_error: false,
  loading: false,
  email: '',
  password: '',
  user: {},
  single_user_update: false,
  single_userInfoError: false,
  single_userInfoLoading: false,
  single_userInfo: {},
  user_name: '',
  user_address: '',
  user_phone: '',
  user_email: '',
  single_user_update: false
}
const supabase = createClient(
  'https://jurdjjlfvoekzffnpbdx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1cmRqamxmdm9la3pmZm5wYmR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0OTcxMzYsImV4cCI6MjAyNTA3MzEzNn0.ajICLrrMh6cabPQKLuRZYR4RmQkXcFAdVggOm_KePZk'
)

//declare global context and  make it  Available Globally
// also here, Set All  the Actions using Dispatch
export const AuthContext = React.createContext()

//create  user provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({})
  const [userInfo, setUserInfo] = useState({})

  //pass reducer function and  initial state Object
  //TODO: import and  use user sign_in_reducer

  const [state, dispatch] = useReducer(auth_reducer, initialState)

  //Hit   API end point  for        register
  const registerUser = async (email, password) => {
    try {
      dispatch({ type: REGISTER_USER_BEGIN })
      console.log('register action Begin')
      console.log(
        'FROM USER  CONTEXT!!!!!!',
        'EMAIL!!',
        email,
        'PASSWORD',
        password
      )

      const response = await axios.post(register_user_url, {
        // name: name,
        email: email,
        password: password
        // phone: phone,
        // deliveryAddress: deliveryAddress
      })

      const registeredUser = await response.data

      console.log(
        'Register  SucceSS AFTER  RESPONSE FROM  CONTEXT from  my DB',
        registerUser
      )
      dispatch({ type: REGISTER_SUCCESS, payload: registeredUser })
    } catch (error) {
      console.log(
        'FROM  REGISTER CONTEXT, ERROR, NOT!! SUCCESSFUL',
        error.message
      )
      console.log(error.response)
      dispatch({ type: REGISTER_ERROR, payload: error.message })
    }
  }

  const login = async (email, password) => {
    dispatch({ type: LOGIN_USER_BEGIN })
    console.log('LOGIN ACTION BEGIN')
    try {
      // localStorage.setItem('access_token', tokenData)
      // console.log('login from fireBase Token', tokenData)
      const response = await axios.post(login_user_url, {
        email: email,
        password: password
      })

      const userLoginData = await response.data

      console.log(userLoginData, 'RAW DATA FROM RESPONSE')
      const { token, tokenUser } = await userLoginData
      let retrievedToken = localStorage.setItem('token', JSON.stringify(token))
      setToken(retrievedToken)

      // setToken(token)
      setUser(tokenUser)

      dispatch({ type: LOGIN_USER_SUCCESS, payload: userLoginData })
    } catch (err) {
      console.log('LOGIN ERROR CONTEXT', err)
      console.log('LOGIN ERROR CONTEXT', err.response.data)

      dispatch({ type: LOGIN_USER_ERROR, payload: err.message })
    }
  }

  const resetPassword = async email => {
    // /  dispatch({ type: FORGOT_PASSWORD_BEGIN })

    try {
      // const firbaseForgotPasswordLink = await sendPasswordResetEmail(
      //   auth,
      //   email
      // )

      // console.log(firbaseForgotPasswordLink)

      // const forgotPassword = await firebaseLoginResponse.user.getIdTokenResult()

      const response = await axios.post(forgot_password_url, {
        email: email
      })

      const emailResponse = await response.data

      console.log('Mail Was Sent to You SuccessFully', emailResponse)
    } catch (err) {
      console.log('error', err)
    }
  }
  //TODO: IF  LOGIN  IS SUCCESSFULLY,AND  USER IS  ADMIN, CALL ALL  BACKEND  DATA FOR ADMIN
  // useEffect(() => {
  //   //  const  unsubscribe =
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       user
  //         .getIdTokenResult()
  //         .then(data => {
  //           const cl = data.claims.role?.admin || data.claims.role?.user
  //           console.log('Claims>>>>>cCLLL', cl)
  //         })
  //         .catch(e => {
  //           console.log('Erro  claims', e)
  //         })
  //     } else {
  //       // console.log('USER on Auth State change IS  NOT  logged in', user)
  //     }
  //   })
  //   return () => {
  //     unsubscribe()
  //   }
  // }, [])

  /**
   * The updateUser function sends a PATCH request to update a user's name, email, and address using
   * the provided userId and authorization token.
   * @param userId - The `userId` parameter is the unique identifier of the user whose information
   * needs to be updated. It is used to specify which user's data should be updated in the API request.
   * @param name - The name parameter is the updated name of the user. It is a string value that
   * represents the new name for the user.
   * @param email - The `email` parameter is the new email address that you want to update for the
   * user.
   * @param address - The `address` parameter is the delivery address of the user. It is used to update
   * the user's delivery address in the database.
   */

  const updateUser = async (userId, name, email, deliveryAddress, phone) => {
    try {
      const configuration = {
        method: 'patch',
        url: update_user_url + userId,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Access_Token')}`
        },
        data: {
          name: name,
          email: email,
          deliveryAddress: deliveryAddress,
          phone: phone
        }
      }

      const response = await axios(configuration)

      const userUpdatedData = await response.data
      console.log('Raw Data from Updated  request', userUpdatedData)
    } catch (error) {
      console.log(error)
    }
  }
  const getSingleUser = async userId => {
    dispatch({ type: GET_SINGLE_USER_BEGIN })
    try {
      const response = await axios.get(single_user_url + userId)
      const userData = await response.data
      // setUserInfo(userData)
      console.log('USER  INFO  IS', userData)

      dispatch({ type: SINGLE_USER_UPDATE_SUCCESS, payload: userData })
      console.log(userData, 'RAW DATA FROM RESPONSE')
    } catch (error) {
      console.log(error)
      dispatch({ type: SINGLE_USER_UPDATE_ERROR, payload: error })
    }
  }

  //CALL  THIS  METHOD  IN  THE  COMPONENT  TO  LOGOUT
  const logoutUser = async () => {
    try {
      await signOut(auth)
      const response = await axios.get(logout_user_url)

      const payloadData = await response.data
      console.log(payloadData)
      console.log('LOG OUT SUCCESS')
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
      dispatch({ type: LOGOUT_USER_SUCCESS, payload: payloadData })
    } catch (error) {
      console.log('LOG OUT eRROR')

      dispatch({ type: LOGOUT_USER_ERROR, payload: error.message })
    }
  }
  useEffect(() => {}, [
    state.email,
    state.password,
    token,
    user,
    JSON.stringify(localStorage.getItem('token'))
  ])

  //TODO: add  login, logout function

  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        login,
        logoutUser,
        token,
        user,
        getSingleUser,
        updateUser,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
