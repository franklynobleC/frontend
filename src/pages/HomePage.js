import React from 'react'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import { Contact, Hero, Services, SvgComponent } from '../components/index'
import pizzaHome from '../images/pizzaHome.jpg'
import beefburger from '../images/beefburger.png'
import removal from '../images/removal.png'
import freshVeg from '../images/freshVeg.jpg'
import interswitchimage from '../images/interswitchimage.png'
import mastercard from '../images/mastercard-4.svg'
import paystackImg from '../images/paystack-2.svg'
import vizacard from '../images/visa.svg'
import '../styles/home.css'
import '../components/Contact'
import { SocialIcon } from 'react-social-icons'

const Component = <SocialIcon url='https://twitter.com' />
const HomePage = () => {
  return (
    <div>
      <div className='home-page'>
        <div className='grid'>
          <div className='content'>
            <div className='content-left'>
              <div className='info'>
                <h2>
                  Order Your Best <br /> Food anytime
                </h2>
                <p>
                  Hey, Our Delicious food is waiting for you, we are Always near
                  to you <br /> with fresh Items
                </p>
              </div>
              <Link to='/foods'>
                <button>Explore Food</button>
              </Link>
            </div>
            <div className='content-right'>
              <img src={removal} alt='' className='food-img' />
            </div>
          </div>
        </div>
        {/*CARDS    */}
        <section className='category'>
          <div className='list-items'>
            <h3>Popular Dishes</h3>
            <div className='card-list'>
              <div className='card'>
                <img src={beefburger} alt='beefBurger' className='home-img' />
                <div>
                  <h1>Beef Burger</h1>
                </div>
                <div className='desc-food'>
                  <p>
                    Quaerat iusto digniss Corp Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Quis vitae reprehenderit quos
                    vol
                  </p>
                </div>
                <div className='price'>
                  <span>N 2000</span>
                </div>
              </div>
              <div className='card'>
                <img src={beefburger} alt='beefBurger' className='home-img' />
                <div>
                  <h1>Beef Burger</h1>
                </div>
                <div className='desc-food'>
                  <p>
                    Quaerat iusto digniss Corp Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Quis vitae reprehenderit quos
                    vol
                  </p>
                </div>
                <div className='price'>
                  <span>N 2000</span>
                </div>
              </div>
              <div className='card'>
                <img src={beefburger} alt='beefBurger' className='home-img' />
                <div>
                  <h1>Beef Burger</h1>
                </div>
                <div className='desc-food'>
                  <p>
                    Quaerat iusto digniss Corp Lorem, ipsum dolor sit amet
                    consectetur adipisicing elit. Quis vitae reprehenderit quos
                    vol
                  </p>
                </div>
                <div className='price'>
                  <span>N 2000</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='interswitch-image-container'>
          <img
            src={interswitchimage}
            alt='interswitch'
            className='interswitch-image'
          />
        </div>
      </div>
      {/* <SvgComponent /> */}
      <div className='contact-container-flex'>
        <div>
          <Contact />
        </div>
        {/* <Component /> */}
        <div className='contact-support-flex'>
          <div>
            <div>
              <div>
                <div>
                  <strong>FRESHEST DELICACY</strong>
                </div>
                fast and free Delivery with delicious food and with
              </div>
              <div> Our job is filling your tummy</div>
            </div>

            <div>
              <br /> <b>JOIN US ON</b>
            </div>
            <div className='social-icons'>
              <SocialIcon
                url='https://linkedin.com/in/couetilc'
                style={{ height: 30, width: 30, marginRight: 5 }}
              />

              <SocialIcon
                url='https://www.pinterest.com/sherryhubanks/food-business-ideas/'
                network='pinterest'
                style={{ height: 30, width: 30 }}
              />
              <SocialIcon
                url='https://web.facebook.com/groups/Item7DealsCatering/about/?locale=kk_KZ&_rdc=1&_rdr'
                network='facebook'
                style={{ height: 30, width: 30, marginLeft: 5, marginRight: 5 }}
              />
              <SocialIcon
                network='x'
                bgColor='#1DA1F2'
                style={{ height: 30, width: 30 }}
              />
            </div>
          </div>
          <div>
            <h5>Contact our Support</h5>
            <div>Contact</div>
            <div>About Us</div>
            <div>Menu</div>
          </div>
          <div>
            <h5>Address</h5>
            <div>1125, bay ln,City</div>
            <div>Statename</div>
            <div>5622</div>
          </div>
          <div>
            <h5>Payment Method And Delivery Patterns</h5>
            <div className='images-container-home'>
              <img src={mastercard} alt='' className='image-data' />
              <img src={paystackImg} alt='' className='image-data paystack' />
              <img src={vizacard} alt='' className='image-data' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
