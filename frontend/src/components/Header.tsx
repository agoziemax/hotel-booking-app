import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Header() {
  const { isLoggedIn} = useAppContext();

  return (
    <div className="bg-blue-600 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/my-bookings">My bookings</Link>
              <Link to="/my-hotels">My bookings</Link>
            </>
          ) : (
            <Link to="/register" className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 ">
              Sign In Here
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;
