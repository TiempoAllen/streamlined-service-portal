import { redirect } from "react-router-dom";
import axios from "axios";

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const checkAuthLoader = () => {
  const token = getAuthToken();

  if (!token) {
    // throw json(
    //   { message: "You have no access to this page." },
    //   { status: 500 }
    // );
    return redirect("/");
  }

  return null;
};

export const submitRequest = async (formData, user_id) => {
  const {
    request_location,
    startTime,
    endTime,
    title,
    description,
    request_technician,
    attachment,
  } = formData;

  const rawStartTime = new Date(startTime);
  const rawEndTime = new Date(endTime);
  const currentDateTime = new Date();

  if (rawStartTime < currentDateTime) {
    return {
      success: false,
      message: "Start time cannot be in the past.",
    };
  }

  if (rawEndTime < currentDateTime) {
    return {
      success: false,
      message: "End time cannot be in the past.",
    };
  }

  if (rawStartTime >= rawEndTime) {
    return {
      success: false,
      message: "Start time should be earlier than end time.",
    };
  }

  const formattedStartTime = rawStartTime.toISOString();
  const formattedEndTime = rawEndTime.toISOString();
  const datetime = currentDateTime.toISOString();

  const requestData = {
    request_location,
    datetime,
    formattedStartTime,
    formattedEndTime,
    title,
    description,
    user_id,
    request_technician,
    attachment,
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/request/add",
      requestData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      return {
        success: true,
        redirectUrl: `/home/${user_id}`,
      };
    } else {
      return {
        success: false,
        message: "Could not create request.",
      };
    }
  } catch (error) {
    console.error(error.response);
    return {
      success: false,
      message: error.response?.data || "An error occurred while submitting.",
    };
  }
};

export const submitRegistration = async (formData) => {
  const {
    firstname,
    lastname,
    username,
    employee_id,
    department,
    email,
    password,
    confirmPassword,
  } = formData;

  // Validations
  if (password.length < 8) {
    return {
      success: false,
      message: "Your password must be at least 8 characters long.",
    };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      success: false,
      message: "Your password must include at least one uppercase letter.",
    };
  }
  if (!/[a-z]/.test(password)) {
    return {
      success: false,
      message: "Your password must include at least one lowercase letter.",
    };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      success: false,
      message:
        "Your password must include at least one special character (e.g., !, @, #, $, %, ^, &, *).",
    };
  }
  if (!email.endsWith("@cit.edu")) {
    return { success: false, message: "Email must end with '@cit.edu'." };
  }
  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Password and Confirm Password do not match.",
    };
  }

  const registerData = {
    firstname,
    lastname,
    username,
    password,
    employee_id,
    email,
    department,
  };

  try {
    const response = await axios.post(
      "http://localhost:8080/user/add",
      registerData
    );

    if (response.status !== 200) {
      throw new Error("Could not register user.");
    }

    return { success: true };
  } catch (error) {
    console.error("Error: ", error.response?.data || error.message);

    if (error.response && error.response.data === "Email already exists") {
      return { success: false, message: "Email already exists" };
    }
    if (
      error.response &&
      error.response.data === "Employee ID already exists"
    ) {
      return { success: false, message: "Employee ID already exists" };
    }

    return { success: false, message: "Could not register user." };
  }
};

export const loadRequestsAndTechnicians = async () => {
  try {
    const token = getAuthToken();

    if (!token) {
      throw new Error("No token found");
    }

    const [requestsResponse, techniciansResponse] = await Promise.all([
      axios.get("http://localhost:8080/request/getAllRequest", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
      axios.get("http://localhost:8080/technician/getAllTechnician", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }),
    ]);

    return {
      requests: requestsResponse.data,
      technicians: techniciansResponse.data,
    };
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    throw error;
  }
};
