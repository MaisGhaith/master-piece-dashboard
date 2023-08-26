import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  TableRow
} from "@material-tailwind/react";
import SearchBar from "./SearchBar";
import { authorsTableData } from "@/data";
import useUsers from './UsersFunctions'
export function Users() {

  const { removeUser, activeUsers, deletedUsers, handleSearch, filteredActiveUsers, handleDeletedSearch, filteredDeletedUsers } = useUsers();

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" className="flex justify-between mb-8 p-6 overflow-y-auto bg-primary ">
          <Typography variant="h6" color="black">
            Acitve users
          </Typography>
          <div className="flex justify-center items-center flex-row">
            <Typography variant="h6" color="black">
              <SearchBar onSearch={handleSearch} />
            </Typography>
            <Typography className="mx-5" variant="h6" color="black">
              Count :  {activeUsers.length}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="h-56 overflow-auto">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["user id", "name & email", "Phone number", "Date of register", "Status", "Orders"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>

                {filteredActiveUsers.map(({ user_id, user_name, user_email, phone_number, register_date, deleted }, key) => {
                  const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`;
                  return (

                    <tr key={user_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">

                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user_id}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div>
                          <Typography variant="small" color="blue-gray" className="font-semibold">
                            {user_name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {user_email}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {phone_number}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {register_date}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Chip
                          as="button"
                          title={"Click to change user status"}
                          onClick={() => removeUser(user_id)}
                          variant="gradient"
                          color={deleted ? "blue-gray" : "green"}
                          value={deleted ? "Deleted" : "Active"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <button
                          onClick={() => removeUser(user_id)}
                          className="text-xs font-semibold text-blue-gray-600">
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader variant="gradient" className="flex justify-between mb-8 p-6 overflow-y-auto bg-primary ">
          <Typography variant="h6" color="black">
            Deleted Users
          </Typography>
          <div className="flex justify-center items-center flex-row">
            <Typography variant="h6" color="black">
              <SearchBar onSearch={handleDeletedSearch} />
            </Typography>
            <Typography className="mx-5" variant="h6" color="black">
              Count :  {deletedUsers.length}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-0 pt-0 pb-2">
          <div className="h-56 overflow-auto">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["user id", "name & email", "Phone number", "Date of register", "Status", "Orders"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDeletedUsers.map(({ user_id, user_name, user_email, phone_number, register_date, deleted }, key) => {
                  const className = `py-3 px-5 ${key === authorsTableData.length - 1 ? "" : "border-b border-blue-gray-50"}`;

                  return (
                    <tr key={user_id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {user_id}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div>
                          <Typography variant="small" color="blue-gray" className="font-semibold">
                            {user_name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {user_email}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {phone_number}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {register_date}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Chip
                          as="button"
                          title={"Click to change user status"}
                          onClick={() => removeUser(user_id)}
                          variant="gradient"
                          color={deleted ? "blue-gray" : "green"}
                          value={deleted ? "Deleted" : "Active"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <button
                          onClick={() => removeUser(user_id)}
                          className="text-xs font-semibold text-blue-gray-600">
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
export default Users;
