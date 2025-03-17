import React, { useState } from "react";
import ResturantsCards,{ withOpenTag} from "./ResturantsCards";

function TopResturant({data}) {
 
    const [scrollValue,setScrollValue]=useState(0);
const CardwithOpenTag=withOpenTag(ResturantsCards);


function handleNext(){
const maxScroll = (data.length-1)*263.1;
if(scrollValue<=maxScroll){
  setScrollValue(scrollValue +205);
}
}
function handleBack(){
if(scrollValue>0){
  setScrollValue(scrollValue-205);
}
}

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">
          Top restaurant chains in Bangalore
        </h1>
        <div className="flex gap-3 ">
          <div className={`h-9 w-9 bg-gray-200 text-center rounded-full cursor-pointer flex justify-center `+(scrollValue<=0? "bg-gray-50":"bg-gray-200")} onClick={handleBack}>
            <i className={`fi fi-rs-arrow-small-left text-2xl mt-1 `+(scrollValue<=0? "text-gray-600":"text-black")}></i>
          </div>
          <div className={`h-9 w-9 bg-gray-200 text-center rounded-full cursor-pointer flex justify-center `+ (scrollValue>=4990? "bg-gray-50":"bg-gray-200")} onClick={handleNext}>
            <i className={`fi fi-rs-arrow-small-right text-2xl mt-1 `+(scrollValue>=4990?"text-gray-600":"text-black")}></i>
          </div>
        </div>
      </div>


      
      <div className="flex mt-10 gap-5 transition-transform duration-400 ease-in-out" style={{transform:`translateX(-${scrollValue}px)`}}>
      {data.map((item, i) => (
      
  <div  className="hover:scale-95 duration-300">
 

{(item?.info?.availability?.opened)? <CardwithOpenTag {...item}/>:<ResturantsCards {...item}/>}
  </div>
))}


      </div>
      <hr className="border-t-2 border-gray-200 mt-20 " />
     
    </div>
  );
}

export default TopResturant;
