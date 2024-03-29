import { useState } from "react";
import { Link } from "react-router-dom";
import css from "../styles/home/Home.module.scss";
import logo from "../assets/img/logo.png";
import { AnimatePresence, motion } from "framer-motion";

class MenuClass {
  constructor(
    public name: string,
    public tab: string,
    public icon: string,
    public subMenus?: MenuClass[]
  ) {}
}

const menus = [
  new MenuClass("Map", "/home/", "fa-solid fa-map-location-dot"),
  new MenuClass("Analytics", "/home/analytics", "fa-solid fa-chart-bar"),
  new MenuClass("Users", "/home/users", "fa-solid fa-person-military-rifle", [
    new MenuClass("Get Users", "/home/users/", ""),
    new MenuClass("Create User", "/home/users/add", ""),
    new MenuClass("Bulk upload", "/home/users/bulk", ""),
  ]),
  new MenuClass("Devices", "/home/devices", "fa-solid fa-walkie-talkie", [
    new MenuClass("Get Devices", "/home/devices/", ""),
    new MenuClass("Create Device", "/home/devices/add", ""),
    new MenuClass("Bulk upload", "/home/devices/bulk", ""),
  ]),
  new MenuClass(
    "Stations",
    "/home/stations",
    "fa-solid fa-building-circle-exclamation",
    [
      new MenuClass("Get Stations", "/home/stations/", ""),
      new MenuClass("Create Station", "/home/stations/add", ""),
      // new MenuClass("Edit Station", "/home/stations/edit", ""),
    ]
  ),
  new MenuClass("Ranks", "/home/ranks", "fa-solid fa-ranking-star", [
    new MenuClass("Get Ranks", "/home/ranks/", ""),
    new MenuClass("Create Rank", "/home/ranks/add", ""),
    // new MenuClass("Edit Rank", "/home/ranks/edit", ""),
  ]),
  new MenuClass("Log out", "/", "fa-solid fa-right-from-bracket"),
];

const MenuListItem = ({ eachMenu, i }: { eachMenu: MenuClass; i: number }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const variants = {
    // noHeight: { minHeight: 0, height: 0 },
    // fullHeight: {
    //   minHeight: "90px",
    //   height: 40 * eachMenu?.subMenus?.length + "px",
    //   overflowY: "hidden",
    // },
    // exit: {
    //   minHeight: 0,
    //   height: 0,
    //   overflowY: "hidden",
    // },
    left: { opacity: 0, x: -100 },
    normal: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: 100,
    },
  };
  return (
    <>
      <Link to={eachMenu?.tab || "/home/"} key={i}>
        <li onClick={() => setShowSubMenu((prev) => !prev)}>
          <i className={eachMenu.icon} />
          <em>{eachMenu.name}</em>
        </li>
        <AnimatePresence>
          {showSubMenu && eachMenu?.subMenus!?.length > 0 && (
            <motion.ul
              className={css["submenu"]}
              variants={variants}
              initial="left"
              animate="normal"
              exit="exit"
            >
              {eachMenu?.subMenus?.map((eachMenu, i) => (
                <Link to={eachMenu?.tab || "/home/"} key={i}>
                  <li>
                    <i className={`fa-regular fa-circle-dot ${css.dot}`}></i>
                    <em>{eachMenu.name}</em>
                  </li>
                </Link>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </Link>
    </>
  );
};

const Menu = () => {
  return (
    <div className={css.menu}>
      <div className={css["logo-container"]}>
        <img src={logo} alt="logo" />
        <em>NigTrak</em>
      </div>
      <ul>
        {menus.map((eachMenu, i) => (
          <MenuListItem eachMenu={eachMenu} i={i} />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
