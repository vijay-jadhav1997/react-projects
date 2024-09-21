import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {
  //* useState declare Local State Variable- which is Super Powerful variable:
  const [btnName, setBtnName] = useState("Login");

  const isOnline = useOnlineStatus();

  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  return (
    <header className="bg-pink-600 shadow-sm py-2 px-4 z-50 fixed top-3 rounded left-[5%] right-[5%] lg:left-[10%] lg:right-[10%]">
      <div className="flex justify-between items-center">
        <div className="">
          <img className="w-12 h-12 mx-2 object-cover rounded-full " src={LOGO_URL} />
        </div>
        <div className="">
          <ul className="flex justify-between text-white font-medium">
            <li>
              <Link className="px-2 py-1 hover:border rounded-md" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="px-2 py-1 hover:border rounded-md" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="px-2 py-1 hover:border rounded-md" to="/contact">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="px-2 py-1 relative hover:scale-90" to="/cart">
                🛒
                {
                  cartItems.length > 0 
                  ? 
                  <span className="absolute -top-2 -right-2 text-center text-black bg-slate-200 rounded-full h-6 w-6">{cartItems.length}</span>
                  :
                  ''
                }
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <button
            className="px-2 py-1 bg-indigo-500 text-white rounded-md hover:bg-slate-300 hover:text-indigo-700"
            onClick={(event) => {
              btnName === "Login" ? setBtnName("Log out") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
        </div>
      </div>
      
    </header>
  );
};

export default Header;
