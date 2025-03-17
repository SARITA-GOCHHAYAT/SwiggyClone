import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ResturantMenu() {
  const { id } = useParams();
  let mainId = id.split("-").at(-1).split("rest")[1];
  const [menuData, setMenuData] = useState([]);
  const [resturantInfo, setResturantInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [scrollValue, setScrollValue] = useState(0);
 

  async function fetchMenu() {
    let data = await fetch(
      `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=${mainId}&submitAction=ENTER`
    );
    let res = await data.json();
    setDiscountData(
      res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    setResturantInfo(res?.data?.cards[2]?.card?.card?.info);
    let actualMenu =
      (res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
        (data) => {
          return data?.card?.card?.itemCards || data?.card?.card?.categories;
        }
      );

    setMenuData(actualMenu);
  }

  useEffect(() => {
    fetchMenu();
  }, [id]);
  function handleNext() {
    const maxScroll = (discountData.length + 1) * 200;
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
    <div className="w-full">
      <div className="w-[1000px]  mx-auto p-8">
        <p className="text-[15px] text-slate-500">
          <Link to={"/"}>
            <span className="hover:text-slate-700 hover:cursor-pointer">
              Home
            </span>{" "}
          </Link>{" "}
          /{" "}
          <span className="hover:text-slate-700 hover:cursor-pointer ">
            {resturantInfo?.city}
          </span>{" "}
          / <span className="text-slate-700">{resturantInfo?.name}</span>
        </p>
        <h1 className="font-bold pt-10 text-5xl p-5 text-slate-950">
          {resturantInfo?.name}
        </h1>
        <div className="w-full h-[200px] bg-gradient-to-t from-slate-300/90   mt-3  rounded-[30px] p-5">
          <div className="bg-white w-[98%] h-[98%] m-auto rounded-3xl border border-slate-400 p-5">
            <div className="flex items-center gap-1 font-semibold">
              {" "}
              <i className="fi fi-sr-circle-star text-green-600 my-auto"></i>
              <span>{resturantInfo?.avgRating}</span>
              <span>{resturantInfo?.totalRatingsString}</span> .{" "}
              <span>{resturantInfo?.costForTwoMessage}</span>
            </div>
            <p className="underline font-semibold text-orange-400">
              {resturantInfo?.cuisines?.join(", ")}
            </p>
            <div className="flex gap-2 mt-3">
              <div className="w-[10px] mt-2">
                <div className="w-[10px] h-[10px] bg-gray-500 rounded"></div>
                <div className="w-[2px] h-[30px] bg-gray-500 mx-auto"></div>
                <div className="w-[10px] h-[10px] bg-gray-500 rounded"></div>
              </div>
              <div className="flex gap-2 font-semibold flex-col">
                <p>
                  Outlet{" "}
                  <span className="text-gray-500">
                    {resturantInfo.locality}
                  </span>
                </p>
                <p className="mt-2">{resturantInfo?.sla?.slaString}</p>
              </div>
            </div>
          </div>
        </div>

        <>
          <div className="flex justify-between items-center mt-10">
            <h1 className="font-bold text-3xl">Deals for you</h1>
            <div className="flex gap-3">
              <div
                className={
                  `bg-gray-200 w-9 h-9 rounded-full cursor-pointer flex justify-center items-center` +
                  (scrollValue <= 0 ? "bg-gray-50" : "bg-gray-200")
                }
                onClick={handleBack}
              >
                <i
                  className={
                    `fi fi-rs-arrow-small-left text-2xl mt-1 ` +
                    (scrollValue <= 0 ? "text-gray-600" : "text-black")
                  }
                ></i>
              </div>
              <div
                className={
                  `bg-gray-200 w-9 h-9 rounded-full cursor-pointer flex justify-center items-center` +
                  (scrollValue >= 1200 ? "bg-gray-50" : "bg-gray-200")
                }
                onClick={handleNext}
              >
                <i
                  className={
                    `fi fi-rs-arrow-small-right text-2xl mt-1 ` +
                    (scrollValue >= 160 * 13.5 ? "text-gray-600" : "text-black")
                  }
                ></i>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            {discountData?.length > 0 ? (
              <div
                className="flex transition-transform duration-400 ease-in-out gap-6 mt-10 "
                style={{ transform: `translateX(-${scrollValue}px)` }}
              >
                {discountData.map((item, index) => (
                  <Discount key={index} data={item} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mt-5">No deals available</p>
            )}
          </div>
        </>
        <h2 className="text-center mt-5 leading-5">MENU</h2>
        <div className="w-full  mt-5">
          <div className="w-full p-6  font-semibold  rounded-xl text-xl bg-slate-200 text-center relative ">
            Search for dishes
            <i className=" my-auto fi fi-rs-search absolute top-7 right-5 "></i>
          </div>
        </div>
        <div>
          {menuData.map(
            (
              {
                card: {
                  card
                },
              },
              i
            ) => {
              return <MenuCard card={card} />;
            }
          )}
        </div>
      </div>
    </div>
  );
}

function MenuCard({card }) {
  let autoOpen= false;
  if(card["@type"]) { autoOpen=true}
  const [isOpen, setIsOpen] = useState(autoOpen);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  if (card.itemCards) {
    const { title, itemCards } = card;
    return (
      <>
      <div className="mt-7">
        <div className="flex justify-between">
          <h1 className={"font-bold text-"+ (card["@type"]?"2xl":"base")}>
            {title} ({itemCards.length})
          </h1>
          <i
            className={"fi  text-2xl cursor-pointer fi-rs-angle-small-"+(isOpen?"down":"up")}
            onClick={toggleDropdown}
          ></i>
        </div>
        {isOpen && <DetailMenu itemCards={itemCards} />}
      </div>
      <hr  className={"my-5  border-slate-200 border-"+(card["@type"]?"[10px]":"[4px]")}/>
      </>
    );
  } else {
    const { title, categories } = card;
    return (
      <div>
          <h1 className="font-bold text-2xl">{title}</h1>
        {categories.map((data) => {
          
       
return <MenuCard card={data}/>
          
        })}
      
      </div>
    );
  }
}

function DetailMenu({ itemCards }) {
  let veg="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/800px-Veg_symbol.svg.png";
  let nonveg="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/768px-Non_veg_symbol.svg.png";
  return (
    <div className="m-5">
      {itemCards.map(
        ({
          card: {
            info: { name,defaultPrice,itemAttribute:{vegClassifier},ratings:{aggregatedRating:{rating,ratingCountV2}},description,imageId},
          },
        }) => {
          return <>
          <div className="flex justify-between">
            <div className="w-[70%]">
              <img src={(vegClassifier === "VEG" ? veg : nonveg)} alt="image"  className="w-5  rounded-sm "/>
                 <h2 className="font-bold text-lg">{name}</h2>
              {/* <p>₹{(Number(defaultPrice)/100)}</p> */}
              {defaultPrice ? <p>₹{(Number(defaultPrice)/100)}</p> : <p>No Price</p> }
              <p><i className="fi text-xl fi-rs-star my-auto"></i>{(rating?<span className="my-auto">{rating}({ratingCountV2})</span>:"No Rating")}</p>
              <p>{description}</p>
            </div>
            <div className="w-[20%]">
              <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/"+imageId} alt="" />
              <button>Add</button>
            </div>
          </div>
          <hr className="border border-slate-100 my-3"/>
          </>
        }
      )}
    </div>
  );
}
function Discount({
  data: {
    info: { header, offerLogo, couponCode },
  },
}) {
  return (
    <div className="min-w-[400px] flex h-[96px] border border-slate-200 rounded p-4 gap-5">
      <img
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" +
          offerLogo
        }
        alt=""
      />
      <div className="my-auto ">
        <h2 className="font-semibold text-2xl">{header}</h2>
        {couponCode ? <p>{couponCode}</p> : <p>No Cupon Code</p>}
      </div>
    </div>
  );
}

export default ResturantMenu;
