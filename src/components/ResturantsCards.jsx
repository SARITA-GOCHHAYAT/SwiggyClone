import React from 'react';
import { Link } from 'react-router-dom';

function ResturantsCards(item) {

  return (
    <Link 
    to={`/restaurantMenu/${item.cta.link.split("/")[5]}`}
    >
    <div className="min-w-[350px] min-h-[200px] rounded-xl relative ">
    <img className=" w-full h-full aspect-video object-cover rounded-xl"  src={"https://media-assets.swiggy.com/swiggy/image/upload/"+`${item?.info?.
       cloudinaryImageId}`} alt="Top Resturant"  />
       <div className="bg-gradient-to-t from-1%  from-black  to-transparent to-40%  w-full h-full absolute rounded-2xl top-0 "></div>
       <p className="absolute bottom-0 text-2xl text-white m-3 font-bold">{item?.info?.aggregatedDiscountInfoV3 ? item?.info?.aggregatedDiscountInfoV3?.header +" " +  item?.info?.aggregatedDiscountInfoV3?.subHeader:""}</p>
      
      </div>
       <div className="mt-3">
       <h2 className="text-lg  font-bold ">{item?.info?.name}</h2>
   
       <p  className="text-base font-semibold"><i className="fi fi-sr-circle-star text-green-600 my-auto"></i> {item?.info?.avgRating} . <span>{item?.info?.sla?.slaString}</span></p>
       <p className="line-clamp-1 text-black/60 font-medium">{item?.info?.cuisines.join(", ")}</p>
       <p className="line-clamp-1 text-black/60 font-medium">{item?.info?.locality}</p>
      </div>
      </Link>
  )
}


export const withOpenTag=(ResturantsCards)=>{
return (item)=>{
  return (
    <>
    <label className=' absolute z-20 m-4 text-black-500  font-bold bg-[rgba(255,255,255,0.5)] shadow-md  rounded-3xl px-4 py-2'>Open</label>
    <ResturantsCards {...item}/>
    </>
  )
}
}



export default ResturantsCards;
