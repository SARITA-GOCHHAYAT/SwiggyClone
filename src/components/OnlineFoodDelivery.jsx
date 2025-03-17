import React from 'react';
import ResturantsCards from './ResturantsCards';

function OnlineFoodDelivery({ data }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl mt-10 mb-8">
          Restaurants with online food delivery in Bangalore
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7 px-4 md:px-8">
        { data.map((item,i) => (
          <div  className="hover:scale-95 duration-300">
          
            <ResturantsCards {...item}/>
          </div>
        ))}
  
      </div>

      <hr className="border-t-2 border-gray-200 mt-20" />
    </>
  );
}

export default OnlineFoodDelivery;
