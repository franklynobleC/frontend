import axios from 'axios'

import React, { useContext, useEffect, useReducer, useState } from 'react'
import {
  create_orders_url,
  checkout_url,
  // payment_webhook_url,
  payment_success_message_callback_url,
  payment_webhook_message_url
} from '../utils/constants'
import cart_reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  CREATE_ORDER_BEGIN,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_ERROR
} from '../actions'

//TODO: pass  this  to     cart state  in  initial State
function getLocalStorageData () {
  const localData = localStorage.getItem('cart')

  if (!localData) {
    return []
  }

  return JSON.parse(localData)
}

const initialState = {
  cart: getLocalStorageData(),
  total_quantity: 0,
  total_price: 0,
  payment_option: 'card',
  delivery_fee: 100,
  quantity: 2,
  is_order_created_success: false,
  is_order_error: false,
  is_loading: false
}

//   In  Context  is a feature that allows you to
//  share data between components without passing it
//  through intermediate components explicitly.It
//  provides a way to pass data down the component
//  tree without the need for prop drilling.

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cart_reducer, initialState)

  const [userTokenData, setUserToken] = useState({})
  const [cart1, setCart] = useState([])

  //add to  cart function
  const addToCart = (id, quantity, food) => {
    dispatch({ type: ADD_TO_CART, payload: { id, quantity, food } })
  }
  //   const foodQuantity = quantity => {
  // console.log('quantity', quantity)
  //     dispatch({ type: COUNT_SINGLE_FOOD_QUANTITY, payload: quantity })
  //   }
  //remove an  item from  cart
  const removeItem = id => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }
  //clear  the entire  cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }
  const updateItemQuantity = (id, newQuantity) => {
    const updatedCart = state.cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity }
      }
      return item
    })
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const createOrder = async (cart, id, paymentoption, delivery_fee) => {
    dispatch({ type: CREATE_ORDER_BEGIN })
    let retrievedToken = JSON.parse(localStorage.getItem('token'))
    const CartItems = JSON.parse(localStorage.getItem('cart'))
    setCart(CartItems)
    console.log('GETING CART', cart1, 'cart items', CartItems)

    setUserToken(retrievedToken)

    console.log(
      'THIS IS FROM CREATE ORDER  POST REQUEST  TO BACKEND',
      cart,
      id,
      delivery_fee
    )
    console.log(localStorage.getItem('access_token'))
    console.log('ABOVE DETAILS FOR  CREATED ORDER BEGIN!!')
    const configuration = {
      method: 'post',
      url: create_orders_url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('Access_Token')}`
      },
      data: {
        OrderItems: cart,
        _id: id,
        paymentOption: paymentoption,

        deliveryFee: delivery_fee
      }
    }

    try {
      //TODO: UNCOMMENT THIS TO CREATE ORDER
      const response = await axios(configuration)

      const createdOrder = (await response.data) && response.statuscode === 201

      console.log('CREATED ORDER SUCCESS')
      console.log('ORDER SUCCESS MESSAGE', await createOrder.data)

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: createdOrder })
    } catch (error) {
      console.log('CREATE ORDERS ERROR')
      console.log(error)
      dispatch({
        type: CREATE_ORDER_ERROR,
        payload: error.response
      })
    }
  }
  const checkOut = async () => {
    try {
      const response = await axios.get(checkout_url)

      const data = await response.data

      console.log('response Payment url Link', data)

      const datar = (window.location.href = data)
      if (datar) {
        const checkres = await axios.post(payment_success_message_callback_url)
        console.log(checkres)
        if (checkres) {
          const resData = await checkres
          console.log(resData)

          // const data = await axios.get(payment_webhook_message_url)
          // console.log(data)
        }
      } else {
        ('Error Data')
      }
    } catch (err) {
      console.log('error', err)
    }
  }
  useEffect(() => {})

  //clear  from  local storage
  const clearFromLocalStorage = () => {
    localStorage.removeItem('cart')
    state.total_quantity = 0
    state.totalPrice = 0
    localStorage.clear()
  }
  useEffect(() => {
    //dispatch this when  component mounts
    // dispatch({ type: COUNT_CART_TOTALS })
    console.log('check cart STATE', state.cart)

    if (state.cart !== null) {
      dispatch({ type: COUNT_CART_TOTALS })
      localStorage.setItem('cart', JSON.stringify(state.cart))
      console.log(console.log(localStorage.getItem('cart')))
    }

    //also, adding  to  the Dependency array, so it would remount when  item  in  the component  is changed
  }, [
    state.cart,
    JSON.parse(
      JSON.stringify(localStorage.getItem('Access_Token')),
      state.totalPrice,
      state.total_quantity,
      localStorage.getItem('userId')
    )
  ])

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        clearCart,
        removeItem,
        createOrder,
        checkOut,
        clearFromLocalStorage,
        updateItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

//
export const useCartContext = () => {
  return useContext(CartContext)
}
