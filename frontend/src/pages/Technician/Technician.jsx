import React from "react";
import classes from "./Technician.module.css";
import SelectArea from "../../components/UI/SelectArea";
import DetailsHeader from "../../components/UI/DetailsHeader";
import { getAuthToken } from "../../util/auth";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";
// import TableRow from "../../components/UI/TableRow";
import Table from "../../components/UI/Table";

const Technician = () => {
  const data = useRouteLoaderData("technician");
  const technicians = data.technicians;

  return (
    <section className={classes.technician}>
      <SelectArea header="Technicians" />
      {/* <DetailsHeader isTechnician={true} /> */}
      <Table inputs={technicians} />
    </section>
  );
};

export default Technician;

export const loader = async ({ params }) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(
      "http://localhost:8080/technician/getAllTechnician",
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );

    const technicians = response.data;
    console.log(technicians);

    return { technicians };
  } catch (error) {
    throw new Error(`Error fetching technicians: ${error.message}`);
  }
};
