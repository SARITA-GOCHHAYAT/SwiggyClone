import React, { useState,useEffect } from 'react'
import OnYourMind from './OnYourMind'
import TopResturant from './TopResturant'
import OnlineFoodDelivery from './OnlineFoodDelivery';

function Body () {
  const [topResturant,setTopResturant]=useState([]);
  const [onYourMind,setOnYourMind]=useState([]);
  const fetchData= async()=>{
    try{
       const response=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING") ;

       const result = await response.json();
       const onYourMindData = result?.data?.cards[0]?.card?.card?.imageGridCards?.info || [];
       const imageData = result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
       setTopResturant(imageData);
       setOnYourMind(onYourMindData);

    }catch(err){
        console.log("error",err)
    }
}
 useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-full">
      <div className="w-[75%] mx-auto mt-10 overflow-hidden">
        <OnYourMind data={onYourMind}/>
        <TopResturant data={topResturant}/>
        <OnlineFoodDelivery  data={topResturant}/>
        </div>
        </div>
  )
}

export default Body
