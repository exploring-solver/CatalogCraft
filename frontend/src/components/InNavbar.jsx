import React, { useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  // Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
  ChartBarSquareIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import AuthContext from "./Context/Auth/AuthContext";
import Translator from "./Translator";
import { NavLink } from "react-router-dom";



function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { user } = useContext(AuthContext);
  // profile menu component
  const profileMenuItems = [

    {
      label: `${user.name}`,
      icon: UserCircleIcon,
      to: '/profile'
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      to: '/editprof'
    },
    {
      label: "Catalogues",
      icon: ShoppingBagIcon,
      to: '/my-cata'
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
      to: '/help'
    },
    // {
    //   label: "Help",
    //   icon: LifebuoyIcon,
    //   to:'/help'
    // },
    //TODO: Logout functionality and profile editing and preview functionality
    //TODO: Help page content
    {
      label: "Sign Out",
      icon: PowerIcon,
      to: '/logout'
    },
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, to }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <a key={label} href={to}>
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
                  }`}
              >

                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}

                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            </a>
          );
        })}
      </MenuList>
    </Menu>
  );
}

const navListItems = [
  // {
  //   label: "",
  //   icon: UserCircleIcon,
  // },
  {
    label: "Dashboard",
    icon: ChartBarSquareIcon,
    to: "/dashboard"
  },
  {
    label: "All Catalogues",
    icon: CubeTransparentIcon,
    to: "/catalogs"
  },
  {
    label: "Add Catalog",
    icon: CodeBracketSquareIcon,
    to: "/product-search"
  },
  {
    label: "Manage Catalog",
    icon: BuildingLibraryIcon,
    to: "/cata-admin"
  },
];

function NavList() {
  return (
    <ul className="mt-2 mr-5 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {/* <NavListMenu /> */}
      {navListItems.map(({ label, icon, to }, key) => (
        <Typography
          key={label}
          as="a"
          href={to}
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  const { logout } = useContext(AuthContext);
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 
    sticky top-0 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          CatalogCraft
        </Typography>
        <div className="hidden lg:block">
          <NavList />

        </div>
        <Translator />
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <ProfileMenu />
        <Button size="sm" variant="text" onClick={logout}>
          <span>Log out</span>
        </Button>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}