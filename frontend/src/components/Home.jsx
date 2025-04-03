import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CatergoryCarousel from './CatergoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '@/redux/store'
import { setSearchedQuery } from '@/redux/jobSlice'

const Home=()=> {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useGetAllJobs();
  // console.log("Hook");
  // console.log("useEffect"); 
  dispatch(setSearchedQuery(""));
  const {user}=useSelector(store=>store.auth);
  const {searchedQuery}=useSelector(store=>store.job);
  
  useEffect(()=>{
    
    if(user?.role ==='recruiter'){
      navigate("/admin/companies");
    }
  },[]);
  
  return (
    <div>
        <Navbar/>  
        <HeroSection/>
         <CatergoryCarousel/>
        <LatestJobs/>
         <Footer/> 
       
    </div>
  )
}

export default Home