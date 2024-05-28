import React from "react";
import Table from "../../components/UI/Table";
import classes from "./Approval.module.css";
import { getAuthToken } from "../../util/auth";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";
import SelectArea from "../../components/UI/SelectArea";

const Approval = () => {
  const { requests } = useRouteLoaderData("approval");
  return (
    <section className={classes.approval}>
      <SelectArea />
      <Table requests={requests} />
    </section>
  );
};

export default Approval;

export const loader = async ({ params }) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get("http://localhost:5000/request/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const requests = response.data;
    console.log(requests);

    return { requests };
  } catch (error) {
    throw new Error(`Error fetching requests: ${error.message}`);
  }
};
