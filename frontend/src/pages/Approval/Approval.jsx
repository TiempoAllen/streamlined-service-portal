import React, { useState } from "react";
import Table from "../../components/UI/Table";
import classes from "./Approval.module.css";
import { getAuthToken } from "../../util/auth";
import axios from "axios";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import SelectArea from "../../components/UI/SelectArea";
import DetailsHeader from "../../components/UI/DetailsHeader";

const Approval = () => {
  const { requests, technicians } = useLoaderData();
  console.log("Requests", requests);

  const [filter, setFilter] = useState("All");
  const [filteredRequests, setFilteredRequests] = useState(
    [...requests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);

    let updatedRequests = [...requests];
    
    if(selectedFilter != "All"){
      updatedRequests = updatedRequests.filter((requests) => requests.status == selectedFilter);
    }

    updatedRequests = updatedRequests.sort((
      a,b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setFilteredRequests(updatedRequests);
  };

  const updateRequestStatus = (request_id, status) => {
    const updatedRequests = requests.map((request) =>
      request.request_id === request_id ? { ...request, status } : request
    );
    setFilteredRequests(
      updatedRequests.filter((request) => {
        if (filter === "All") {
          return true;
        }
        return request.status === filter;
      })
      .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  };
  return (
    <section className={classes.approval}>
      <SelectArea onFilterChange={handleFilterChange} header="Requests" />
      {/* <DetailsHeader isTechnician={false} /> */}
      <Table
        inputs={filteredRequests}
        technicians={technicians}
        onUpdateRequestStatus={updateRequestStatus}
      />
    </section>
  );
};

export default Approval;

export const loader = async () => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No token found");
  }

  const [requestsResponse, techniciansResponse] = await Promise.all([
    axios.get("http://localhost:8080/request/all", {
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
};

// export const loader = async ({ params }) => {
//   const token = getAuthToken();

//   if (!token) {
//     throw new Error("No token found");
//   }

//   try {
//     const response = await axios.get("http://localhost:8080/request/all", {
//       // headers: {
//       //   Authorization: `Bearer ${token}`,
//       // },
//     });

//     const requests = response.data;
//     console.log(requests);

//     return { requests };
//   } catch (error) {
//     throw new Error(`Error fetching requests: ${error.message}`);
//   }
// };
