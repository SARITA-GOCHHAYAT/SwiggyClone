import React, {  useState } from "react";

const OnYourMind= ({data}) => {

  const [scrollValue, setScrollValue] = useState(0);

  

  // Handle next slide
  function handleNext() {
    const maxScroll = (data.length - 9) * 200; 
    if (scrollValue < maxScroll) {
      setScrollValue(scrollValue + 200);
    }
  }

  // Handle previous slide
  function handleBack() {
    if (scrollValue > 0) {
      setScrollValue(scrollValue - 200);
    }
  }

  return (
   <>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl">What's on Your Mind?</h1>
          <div className="flex gap-3">
            <div
              className={`bg-gray-200 w-9 h-9 rounded-full cursor-pointer flex justify-center items-center`+ (scrollValue<=0? "bg-gray-50": "bg-gray-200"
              )}
              onClick={handleBack}
            >
              <i className={`fi fi-rs-arrow-small-left text-2xl mt-1 `+ (scrollValue <=0 ? "text-gray-600":"text-black")}></i>
            </div>
            <div
              className={`bg-gray-200 w-9 h-9 rounded-full cursor-pointer flex justify-center items-center`+(scrollValue>=160? "bg-gray-50": "bg-gray-200"
              )}
              onClick={handleNext}
            >
              <i className={`fi fi-rs-arrow-small-right text-2xl mt-1 `+(scrollValue >=160*13.5 ? "text-gray-600":"text-black")}></i>
            </div>
          </div>
        </div>

      
        <div
          className="flex transition-transform duration-400 ease-in-out"
          style={{ transform: `translateX(-${scrollValue}px)` }}
        >
          {data.map((item, index) => (
            <img
              key={index}
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
              className="w-50 mx-2"
              alt="Food"
            />
          ))}
        </div>
       
       
        <hr className="border-t-2 border-gray-200 mt-20" />
     </>
  );
};

export default OnYourMind;
