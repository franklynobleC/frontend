import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
// import  {useRef} from 'react'
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'

import '../styles/foods.css'
import '../styles/filteredFood.css'
import '../icons/search-icon.png'
import { AddToCart } from '../components'

import '../images/icons/search-icon.png'
import { useCartContext } from '../context/cart_context'
import { useFoodsContext } from '../context/foods_context'
import 'react-simple-toasts/dist/theme/success.css'
import { toastConfigAlert, ShowToast } from '../toastConfigAlert'

const ListView = ({ foods }) => {
  console.log(foods)
  const searchValue = useRef()
  let navigate = useNavigate()
  const { addToCart, cart, _id } = useCartContext()
  const [quantity, setQuantity] = useState(0)
  const [isAdded, setIsAdded] = useState(false)
  // const [isAdded, ] = useState()
  const { setSearchWord, foods_loading, match_found } = useFoodsContext()
  // const [searchFood, setSearchFood] = useState('')
  // const [searchFoodsResult, setFoodsResult] = useState([])
  const [checkWord, setCheckWord] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    // setSearchWord(searchValue.current.value)
    // navigate('/foods')
  }
  const handleSearch = event => {
    setSearchTerm(event.target.value)
  }
  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddToCart = (id, food) => {
    const { _id } = food
    // console.log('THIS IS  FROM FOOD   ADD TO CART', food)
    addToCart(id, quantity, food)

    setIsAdded(true)
    toastConfigAlert.theme = 'success'
    ShowToast('Item successfully added to cart')

    console.log('Add To Cart Now')

    return (window.location.href = '/cart')
  }
  if (foods_loading) {
    return (
      <div>
        <p>loading ...</p>
      </div>
    )
  }
  if (filteredFoods.length < 1) {
    return (
      <div>
        <p>Search Not Found</p>
    
        <p>Search Not Found</p>

        <button onClick={() => window.history.go('/foods')}>back</button>
      </div>
    )
  }

  // if (match_found) {
  //   return (
  //     <h2>
  //       {/* <Link to='/'>Back to Foods Page</Link> */}
  //       <p>Search Not Found</p>
  //       <p>Search Not Found</p>
  //       <p>Search Not Found</p>
  //       <p>Search Not Found</p>
  //       <p>Search Not Found</p>
  //       <Link to='/'>Back to foods</Link>

  //       {/* window.location.href ='/foods' */}
  //     </h2>
  //   )
  // }
  return (
    <section className='main'>
      <div className='form-container'>
        <form className='search-bar' onSubmit={handleSubmit}>
          <input
            type='text'
            required
            className='search-input-search'
            value={searchTerm}
            placeholder='Search meal'
            onChange={handleSearch}
          />
          <button type='submit' className='search-btn'>
            <FiSearch className='search-bar-icon' />
          </button>
        </form>
      </div>

      {filteredFoods.map(food => {
     
        const { name, price, image, id, quantity } = food
        return (
          <Wrapper>
            <div key={id} className='food-container'>
              <div className='food-image-container'>
                <img src={image} alt={name} className='food-image' />
              </div>
              <div className='food-name'>
                <h4 className='food-h4'>{name}</h4>
              </div>
              <div className='food-price'>Price: &#8358;{price}</div>
              <div className='food-description'></div>
              <div className='details-link'>
                {/* <Link to={`/foods/${id}`} className='Details-link'>
                </Link> */}
                <button
                  className='oder-now-btn'
                  onClick={() => handleAddToCart(id, food)}
                >
                  Order now
                </button>
              </div>
              <div>
                <AddToCart food={food} />
              </div>

              <div className='food-spacer'></div>
            </div>
          </Wrapper>
        )
      })}
    </section>
  )
}
const Wrapper = styled.section`

  img {
    width: 100%;
    height: 100%;
    /* border: 5px; */
    border-radius: 4px;
  }
  
  .food-container {
    border-radius: 4px;
    /* width: 30%; */
    height: auto;
    width: auto;
    background-color: whitesmoke;
    margin-left: 100px;
    margin-right: 100px;
  }
  .search-input-search {
    border: 1px solid #cecece;
    border-radius: 5px;
    color: #e0eafc;
  }
  /* @media (max-width: 600px) {
    .food-container {
      width: 50%;

      padding: 10px;
    } */

.add-to-cart{
cursor: pointer;
}
  box-sizing: border-box;
  /* width: auto; */
  background-color: whitesmoke;
`
export default ListView
