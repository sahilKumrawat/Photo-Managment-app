import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "My Info.",
    path: "/",
    // icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Blogs",
    path: "/blogs",
    // icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "General Info.",
    path: "/products",
    // icon: <FaIcons.FaCartPlus />,
    cName: "nav-text",
  },
  {
    title: "Team",
    path: "/team",
    // icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Photos",
    path: "/photos",
    // icon: <FaIcons.FaEnvelopeOpenText />,
    cName: "nav-text",
  },
];