import React, { useState } from "react";
import Table from "../../components/UI/Table";
import classes from "./Approval.module.css";
import { getAuthToken } from "../../util/auth";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";
import SelectArea from "../../components/UI/SelectArea";
import DetailsHeader from "../../components/UI/DetailsHeader";

const Approval = () => {
  const { requests } = useRouteLoaderData("approval");
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredRequests = requests.filter((request) => {
    if (filter === "All") {
      return true;
    }

    return request.status === filter;
  });
  return (
    <section className={classes.approval}>
      <SelectArea onFilterChange={handleFilterChange} header="Requests" />
      {/* <DetailsHeader isTechnician={false} /> */}
      <Table inputs={filteredRequests} />
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
    const response = await axios.get("http://localhost:8080/request/all", {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });

    const requests = response.data;
    console.log(requests);

    return { requests };
  } catch (error) {
    throw new Error(`Error fetching requests: ${error.message}`);
  }
};
