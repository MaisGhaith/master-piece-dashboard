import React, { useEffect, useState } from "react";
import { Typography, Card, CardHeader, CardBody, IconButton, Menu, MenuHandler, MenuList, MenuItem, Progress, } from "@material-tailwind/react";
import { CheckIcon, EllipsisVerticalIcon, } from "@heroicons/react/24/outline";
import useUsers from './UsersFunctions'
import { Link } from "react-router-dom";
import useOrders from '../dashboard/OrdersFunctions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export function Home() {

  const { users } = useUsers();
  const { allOrders, doneOrders, totalMoney } = useOrders();

  const [statistics, setStatistics] = useState([]);
  const [sortBy, setSortBy] = useState("total_orders");

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:8181/statistic/getStatistics');
      sortServices(sortBy);
      setStatistics(response.data);
      console.log(response)
      // console.log(response.data.rows.service_deleted)
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const sortServices = (sortBy) => {
    const sortedServices = [...statistics];

    sortedServices.sort((a, b) => {
      if (sortBy === "total_orders") {
        return b.total_orders - a.total_orders;
      } else if (sortBy === "total_money") {
        return b.total_money - a.total_money;
      } else if (sortBy === "completion_percentage") {
        return b.completion_percentage - a.completion_percentage;
      } else if (sortBy === "service_deleted") {
        if (a.service_deleted && !b.service_deleted) {
          return 1;
        } else if (!a.service_deleted && b.service_deleted) {
          return -1;
        }
        return 0;
      }
    });

    setStatistics(sortedServices);
  };
  const handleSortClick = (type) => {
    sortServices(type);
    setSortBy(type);
  };



  return (
    <div className=" flex justify-center flex-col mt-12">

      <>
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
        />
        <div className="flex flex-wrap  ">
          <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                      {" "}
                      Total money
                    </h5>
                    <span className="font-semibold text-xl text-blueGray-700">
                      {totalMoney} JD
                    </span>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                      <i className="fas fa-chart-bar" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-blueGray-400 mt-4">
                  <span className="text-emerald-500 mr-2">
                    <i className="fas fa-arrow-up" /> {" "}
                  </span>
                  <span className="whitespace-nowrap"> </span>
                </p>
              </div>
            </div>
          </div>
          <div className=" mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                      New users
                    </h5>
                    <span className="font-semibold text-xl text-blueGray-700">
                      {users.length}
                    </span>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-pink-500">
                      <i className="fas fa-users" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-blueGray-400 mt-4">
                  <span className="text-red-500 mr-2">
                  </span>
                  <Link to={"/dashboard/Users"}>
                    <button className="whitespace-nowrap text-yellow-300 hover:text-yellow-200 "> Users Page </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                      All orders
                    </h5>
                    <span className="font-semibold text-xl text-blueGray-700">
                      {allOrders.length}
                    </span>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-emerald-500">
                      <FontAwesomeIcon icon={faChartPie} style={{ color: "#ffffff", }} />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-blueGray-400 mt-4">
                  <span className="text-emerald-500 mr-2">
                  </span>
                  <Link to={"/dashboard/Orders"}>
                    <span className="text-yellow-300 hover:text-yellow-200 whitespace-nowrap"> Orders Page </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                  <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                      Done orders
                    </h5>
                    <span className="font-semibold text-xl text-blueGray-700">
                      {doneOrders.length}
                    </span>
                  </div>
                  <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-blue-500">
                      <i className="fa-solid fa-chart-simple" />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-blueGray-400 mt-4">
                  <span className="text-emerald-500 mr-2">
                  </span>
                  <Link to={"/dashboard/Orders"}>
                    <span className="text-yellow-300 hover:text-yellow-200 whitespace-nowrap"> Orders Page </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
      <div className="mb-10 mx-5">
        <Card className="xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Services
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={() => handleSortClick("total_orders")}>
                  Order by total orders
                </MenuItem>
                <MenuItem onClick={() => handleSortClick("total_money")}>
                  Order by total money
                </MenuItem>
                <MenuItem onClick={() => handleSortClick("completion_percentage")} >
                  Order by completion percentage
                </MenuItem>
                <MenuItem onClick={() => handleSortClick("service_deleted")} >
                  Order by deleted
                </MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="h-56 overflow-auto px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Services", "number of orders", "total money", "Done"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {statistics.map(
                  ({ service_name, total_orders, total_money, completion_percentage, service_deleted }, key) => {
                    const className = `py-3 px-5 ${key === statistics.length - 1 ? "" : "border-b border-blue-gray-50"
                      } ${service_deleted ? "bg-gray-300 cursor-not-allowed" : ""}`;
                    return (
                      <tr key={key}>
                        <td className={className}>
                          <div className="flex items-center gap-4 cursor-not-allowed">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {service_name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {total_orders}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {total_money}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion_percentage < 100 ? completion_percentage.toFixed(2) : "100.00"}%
                            </Typography>
                            <Progress
                              value={completion_percentage}
                              variant="gradient"
                              color={
                                completion_percentage <= 20
                                  ? "red"
                                  : completion_percentage === 100
                                    ? "green"
                                    : "blue"
                              }
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>

            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Home;
