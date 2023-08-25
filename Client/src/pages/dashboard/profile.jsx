import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
  Avatar,
  Chip
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { authorsTableData, projectsTableData } from "@/data";
import { UserContext } from '../../context/UserContext';

export function Profile() {

  const { role } = useContext(UserContext);
  console.log(role)
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_password: '',
    phone_number: '',
    role: 'admin',
    deleted: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8181/admin/addAdmin', formData);
      console.log('User registered:', response.data);

      // بعد نجاح الإضافة، قم بإعادة جلب قائمة الإداريين مجددًا لتحديث العرض
      await fetchAdmins();
    } catch (error) {
      console.error('Registration error:', error.response.data);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);


  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8181/admin/getAdmins');
      setAdmins(response.data);
      console.log(response.data);
    } catch (error) {
      setError("Error fetching admins");
    }
  };
  useEffect(() => {
    fetchAdmins();
  }, []);


  const [showModal, setShowModal] = useState(false);
  const [adminId, setAdminId] = useState('');

  const handleUserDelete = async () => {
    try {
      const updatedAdmins = admins.map(admin => {
        if (admin.user_id === adminId) {
          return { ...admin, deleted: !admin.deleted };
        }
        return admin;
      });
      setAdmins(updatedAdmins);

      // Update the deleted status on the server
      const response = await axios.put(`http://localhost:8181/admin/deleteAdmin/${adminId}`);
      if (response.data === 'admin status updated') {
        setShowModal(false);

      }
    } catch (error) {
      console.error(`Error updating admin status with ID ${adminId}`, error);
      // Handle error case
    }
  };

  console.log(adminId)
  const openModal = (adminId) => {
    setAdminId(adminId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };





  return (
    <>
      {/* <img
        src="https://images.pexels.com/photos/4480531/pexels-photo-4480531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      /> */}
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card className="flex justify-center  left-2/4 w-full max-w-[24rem]  -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              تسجيل مسؤول جديد
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit} >
            <CardBody className="flex flex-col gap-4">
              <Input label="Name" size="lg" name="user_name" value={formData.user_name} onChange={handleInputChange} />
              <Input type="email" label="Email" name="user_email" size="lg" value={formData.user_email} onChange={handleInputChange} />
              <Input type="tel" label="Phone number" name="phone_number" size="lg" value={formData.phone_number} onChange={handleInputChange} />
              <Input type="password" label="Password" size="lg" name="user_password" value={formData.user_password} onChange={handleInputChange} />

            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                تسجيل المسؤول
              </Button>
            </CardFooter>
          </form>
        </Card>
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography className="flex justify-end" variant="h6" color="white">
              المسؤولين
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto fr ">
              <thead>
                <tr>
                  {["الحالة", "رقم الهاتف", "الايميل", "المسؤول"].map((el) => (
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
                {admins.map(
                  ({ user_id, user_name, user_email, phone_number, deleted }, key) => {
                    const className = `py-3 px-5 ${key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={user_id}>

                        <td className={className}>
                          <Chip
                            variant="gradient"
                            color={deleted ? "green" : "blue-gray"}
                            value={deleted ? "Active" : "Deleted"}
                            className="py-0.5 px-2 text-[11px] font-medium"
                            onClick={() => {
                              console.log("Clicked user_id:", user_id);
                              openModal(user_id);
                            }}
                          />

                        </td>


                        <td className={className}>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {phone_number}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">

                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {user_email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">

                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {user_name}
                              </Typography>
                            </div>
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
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="modal-container">
              <div className="modal-content bg-white rounded-lg p-10">
                <p>هل أنت متأكد انك تريد تغيير حالة هذا المسؤول؟ </p>
                <div className="flex justify-center mt-4">
                  <button
                    className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded-lg"
                    onClick={closeModal}
                  >
                    إلغاء
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2"
                    onClick={() => handleUserDelete()}
                  >
                    حذف
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
