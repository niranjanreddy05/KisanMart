import React from 'react'
import HomeBanner from './HeroBanner'
import Everything from './Everything'
import Services from './Services'
import KisanMarketBusiness from './KisanMarketBusiness'
import NavMenu from './NavMenu'
import { useEffect } from 'react'
import axios from 'axios'

function Home() {
  useEffect(()=> {
      axios.get('https://api-h2x3.onrender.com/').then((res) => {
        // console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
  },[])
  return (
    <div>
     <NavMenu/>
     <HomeBanner/> 
     <Everything/>
     <Services/>
     <KisanMarketBusiness/>
     
    </div>
  )
}

export default Home