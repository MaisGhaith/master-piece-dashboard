import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from 'react';
import axios from 'axios';


export function SignUp() {

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

  return (
    <div>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
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
                تسجيل الادمن
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
