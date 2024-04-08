import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  GET_SINGLE_USER_BEGIN,
  SINGLE_USER_UPDATE_ERROR,
  SINGLE_USER_UPDATE_SUCCESS,
  REGISTER_USER_BEGIN
} from '../actions'

const auth_reducer = (state, action) => {
  if (action.type === REGISTER_USER_BEGIN) {
    console.log('FROM REGISTER USER REDUCER')
    console.log(action.payload)
    // const { token, tokenUser } = action.payload
    // console.log(token, tokenUser)
    console.log(state.user)

    return {
      ...state,
      is_registered: false,
      register_loading: true,
      is_authenticated: false,
      loading: true,
      user: null
    }
  }
  if (action.type === REGISTER_SUCCESS) {
    console.log('FROM REGISTER USER Success REDUCER')
    console.log(action.payload.user)

    return {
      ...state,
      register_loading: false,
      register_error: false,
      loading: false,

      is_registered: true,
      is_logged_in: false,
      is_authenticated: true,
      user: action.payload
    }
  }

  if (action.type === REGISTER_ERROR) {
    console.log('from reducers register Error')
    return {
      ...state,
      is_registered: false,
      register_error: false,
      register_loading: false,
      is_logged_in: false,
      is_authenticated: false,
      error: true,
      loading: false,
      email: '',
      password: '',
      user: null
    }
  }

  if (action.type === LOGIN_USER_BEGIN) {
    console.log('LOGIN  BEGIN')

    console.log('from LOGIN BEGIN', action.payload)
    return {
      ...state,
      register_loading: true,
      loading: true,
      register_error: false,
      is_error: false,
      is_registered: false,
      is_logged_in: false,
      user: null
    }
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    console.log('LOGIN SUCCESS FROM  REDUCERS')
    // const { userId, name } = action.payload
    const { token, tokenUser } = action.payload

    console.log('LOGIN SUCCESS FROM  REDUCERS', tokenUser)
    const { name, userId, role } = tokenUser
    localStorage.setItem('userId', tokenUser.userId)

    console.log('FROM  PAYLOAD LOGIN REDUCERS  TEST', userId, name)
    return {
      ...state,
      register_loading: false,
      register_error: false,
      is_registered: true,
      is_logged_in: true,
      loading: false,
      is_error: false,

      is_authenticated: true,
      user: tokenUser
    }
  }
  if (action.type === LOGIN_USER_ERROR) {
    console.log('USER LOGIN ERROR FROM  REDUCER')

    console.log('error    variable', state.is_error)
    return {
      ...state,

      is_registered: false,
      register_error: false,
      register_loading: false,
      is_logged_in: false,
      is_authenticated: false,
      is_error: true,
      loading: false,
      email: '',
      password: '',
      user: {}
    }
  }

  if (action.type === LOGOUT_USER_SUCCESS) {
    console.log('USER LOG OUT SUCCESS   FROM  REDUCERS!')
    // const { data } = action.payload
    // console.log(data)
    return {
      ...state,
      register_loading: false,
      register_error: false,
      is_registered: false,
      is_logged_in: false,
      loading: false,

      is_authenticated: false,
      is_error: false,
      data: action.payload,
      user: null
    }
  }
  if (action.type === LOGOUT_USER_ERROR) {
    console.log('USER LOG OUT SUCCESS   FROM  REDUCERS!')
    return {
      ...state,
      is_logged_in: false,
      user: null
    }
  }
  if (action.type === GET_SINGLE_USER_BEGIN) {
    return {
      ...state,
      single_userInfoError: false,
      single_userInfoLoading: true,
      single_userInfo: null
    }
  }
  if (action.type === SINGLE_USER_UPDATE_SUCCESS) {
    console.log('from actions  payload', action.payload)
    const { deliveryAddress, name, email, phone } = action.payload
    console.log('The Address Details', deliveryAddress, name)
    return {
      ...state,
      single_user_update: true,
      // updated_user: true,
      single_userInfoError: false,
      single_userInfoLoading: false,
      user_address: deliveryAddress,
      user_name: name,
      user_email: email,
      user_phone: phone
    }
  }
  if (action.type === SINGLE_USER_UPDATE_ERROR) {
    console.log('from actions  payload Error!', action.payload)
    return {
      ...state,

      single_user_update: false,
      single_userInfoError: true,
      single_userInfoLoading: false,
      single_userInfo: null
    }
  }
  throw new Error(`No matching ${action.type}-action  type`)
}

//TODO:  handle add  user  Login  and  USER lOGGED out action

export default auth_reducer
