import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Users, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import AddService from "./pages/dashboard/AddService";
import Orders from "./pages/dashboard/Orders";
import BillingOrders from "./pages/dashboard/BillingOrders";
import Faqs from "./pages/dashboard/Faqs";
import Details from "./pages/dashboard/Details";

// import '../src/style.css'
const icon = {
  className: "w-5 h-5 text-inherit",
};

const handleLogout = () => {
  localStorage.clear();
  // توجيه المستخدم لصفحة تسجيل الدخول
  // navigate("/sign-in");
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "BillingOrders",
        path: "/BillingOrders",
        element: <BillingOrders />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Users",
        path: "/Users",
        element: <Users />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Orders",
        path: "/Orders",
        element: <Orders />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "AddService",
        path: "/AddService",
        element: <AddService />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Faqs",
        path: "/Faqs",
        element: <Faqs />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Details",
        path: "/Details",
        element: <Details />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: localStorage.getItem("token") ? "log out" : "sign in", // تغيير الاسم استنادًا إلى وجود التوكن
        path: "/sign-in",
        element: <SignIn handleLogout={handleLogout} />, // تمرير دالة التسجيل وتسجيل الخروج
      },
      // {
      //   icon: <UserPlusIcon {...icon} />,
      //   name: "sign up",
      //   path: "/sign-up",
      //   element: <SignUp />,
      // },
    ],
  },
];

export default routes;
