import {
  FaSearch,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useAuth0 } from "@auth0/auth0-react";
import useDarkMode from "../../hooks/useDarkMode";

const TopNavigation = () => {
  return (
    <div
      className="flex flex-row items-center justify-between
    bg-gradient-to-r from-orange-500 to-red-500
    h-16 w-full fixed top-0 z-50 px-6 shadow-lg"
    >
      <Title />
      <div className="flex items-center gap-6 text-white">
        <ThemeIcon />
        <Search />
        <BellIcon />
        <UserCircle />
      </div>
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span
      onClick={handleMode}
      className="cursor-pointer hover:scale-110 transition-transform duration-200"
    >
      {darkTheme ? (
        <FaSun size="22" className="text-yellow-300" />
      ) : (
        <FaMoon size="22" className="text-white" />
      )}
    </span>
  );
};

const Search = () => (
  <div className="relative flex items-center">
    <input
      className="rounded-lg px-3 py-1 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
      type="text"
      placeholder="Search..."
    />
    <FaSearch
      size="16"
      className="absolute right-2 text-gray-500 hover:text-orange-600 transition-colors"
    />
  </div>
);

const BellIcon = () => (
  <FaRegBell
    size="22"
    className="cursor-pointer hover:text-yellow-300 transition-colors"
  />
);

const UserCircle = () => {
  const { logout } = useAuth0();
  return (
    <RiLogoutBoxLine
      size="24"
      className="cursor-pointer hover:text-gray-200 hover:scale-110 transition-all"
      onClick={() => logout()}
      title="Logout"
    />
  );
};

const Title = () => (
  <h1 className="text-2xl font-extrabold tracking-wide text-white select-none">
    BugTrack
  </h1>
);

export default TopNavigation;
