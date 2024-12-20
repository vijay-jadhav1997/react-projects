import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
// import restaurantsList from "../utils/mockData";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useRestaurantList } from "../utils/customHooks";

const Body = () => {
  //* useState declare/create Local State Variable- Super Powerful variable:
  const [resList, setResList] = useState(null);
  const [filteredList, setFilteredList] = useState([]);
  const [searchText, setSearchText] = useState("");


  const fetchResList = async () => {
    try {
      const resListData = await fetch(
        // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        "https://quiz-rest-api.vercel.app/res_api/res_list/"
      );
      const resListDataJson = await resListData.json();
      // console.log(resListDataJson?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      const listData = resListDataJson?.data?.cards.filter(
        (restList) =>
          restList?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
      // console.log(listData);
      setResList([
        ...listData[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
        ...listData[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants,
      ]);
      setFilteredList(
        listData[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResList();
  }, []);

  useEffect(() => {
    if(resList !== null){

      let searchList = [];
  
      if (searchText.length !== 0) {
        searchList = resList.filter((restaurant) => {
          // console.log((((restaurant.info?.name).toUpperCase()).includes((event.target.value).toUpperCase())))
          return (restaurant.info?.name)
            .toUpperCase()
            .includes(searchText.toUpperCase());
        });
      } else {
        searchList = [...resList];
      }
  
      setFilteredList(searchList);
    }
  }, [searchText])

  const RestaurantCardPromoted = withVegLabel(RestaurantCard);
  // console.log(resList);

  //* Conditional rendering:
  return resList === null ? (
    <Shimmer />
  ) : (
    <div className="mt-16 p-4 text-white">
      <div className="h-10 hover:h-auto w-[85%] max-w-[968px] overflow-y-hidden mx-auto my-8 transition-all px-5 py-2 bg-lime-600 rounded-md text-lg font-semibold">
        <p>The application is currently under active development. We are continuously working on adding new features, improvements and building a robust backend to support the full functionality of the app, and appreciate your understanding as we refine the user experience.</p>
      </div>
      <div className="bg-slate-400 py-1 mx-auto rounded-md w-max">
        <input
          className="outline-none bg-transparent indent-3 w-[50vw] placeholder:text-white"
          type="text"
          placeholder="Search here..."
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
        />
        <button
          className="mx-2 bg-gray-200 px-4 py-2 text-gray-800 rounded-md hover:text-gray-100 hover:bg-transparent hover:outline hover:outline-slate-900 active:shadow-md active:shadow-teal-300 font-medium"
          // onClick={() => {
          //   // console.log(searchText);
          //   let searchList;

          //   if (searchText.length !== 0) {
          //     searchList = resList.filter((restaurant) => {
          //       // console.log((((restaurant.info?.name).toUpperCase()).includes((event.target.value).toUpperCase())))
          //       return (restaurant.info?.name)
          //         .toUpperCase()
          //         .includes(searchText.toUpperCase());
          //     });
          //   } else {
          //     searchList = [...resList];
          //   }

          //   setFilteredList(searchList);
          // }}
        >
          Search
        </button>
      </div>

      <div className="border mt-4 p-3 rounded-md mx-[5%] xl:mx-[9%]">
        <button
          className="bg-slate-500 px-3 py-2 rounded-md hover:opacity-90"
          onClick={(event) => {
            event.target.classList.toggle("active");
            let filterList;

            if (event.target.classList.length === 2) {
              filterList = resList.filter((restaurant) => {
                return restaurant.info?.avgRating > 4;
              });
              setFilteredList(filterList);
              // console.log("if => jay hari!", `${filteredList.length}`)
            } else {
              setFilteredList(resList);
              // console.log("else => jay hari!", `${filteredList.length}`);
            }
          }}
        >
          Top Rated Reastaurants
        </button>
      </div>
      <div className="mx-[5%] xl:mx-[9%] mt-3 text-xl">
        <h1>Delivery Restaurants in Koramangala</h1>
      </div>
      <div className="flex gap-y-5 mt-5 flex-wrap justify-around mx-[5%] xl:mx-[9%]">
        {filteredList.map((data) => {
          return (
            <Link
              key={data?.info?.id}
              to={"/restaurants/" + data?.info?.id}
              style={{ textDecoration: "none" }}
            >
              {data?.info?.veg ? (
                <RestaurantCardPromoted restaurantData={data} />
              ) : (
                <RestaurantCard restaurantData={data} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
