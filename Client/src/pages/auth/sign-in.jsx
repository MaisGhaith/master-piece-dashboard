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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

export function SignIn() {
  const navigate = useNavigate(); // Get the navigate function

  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8181/login/login",
        formData
      );
      console.log("Login successful:", response.data);
      console.log(response.data.token)
      localStorage.setItem("token", response.data.token)

      // Redirect the user to the desired page using navigate
      navigate("/dashboard/home");
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    }
  };

  return (
    <>
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
              تسجيل الدخول
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
              <Input type="email" label="الايميل" size="lg" name="user_email"
                value={formData.user_email}
                onChange={handleInputChange} />
              <Input type="password" label="كلمة السر" size="lg" name="user_password"
                value={formData.user_password}
                onChange={handleInputChange} />

            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                دخول
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
