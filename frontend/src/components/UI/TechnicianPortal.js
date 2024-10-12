import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import { Table } from "@radix-ui/themes";
import classes from "./RequestDialogPortal.module.css";
import axios from "axios";

const TechnicianPortal = ({
  technicians = [],
  request_id , 
  onTechnicianAssigned ,
}) => {
  console.log(request_id);

  const handleAssignTechnicianToRequest = async (tech_id, tech_name) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/request/assignTechnician?request_id=${request_id}&tech_id=${tech_id}`
      );
      alert("Technician assigned successfully");
      onTechnicianAssigned(tech_id, tech_name);
    } catch (error) {
      console.error(error.response.data.message);
      // console.log("Request Id: ", request_id);
      alert("Failed to assign technician");
    }
  };

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className={classes.DialogOverlay} />
        <Dialog.Content className={classes.TechnicianDialogContent}>
          <Dialog.Title className={classes.DialogTitle}>
            Available Technicians, Request ID: {request_id}
          </Dialog.Title>
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Phone Number</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Gender</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Classification</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Availability</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {technicians.map((technician, index) => (
                <Table.Row key={index}>
                  <Table.RowHeaderCell>
                    {technician.tech_name}
                  </Table.RowHeaderCell>
                  <Table.Cell>{technician.tech_phone}</Table.Cell>
                  <Table.Cell>{technician.tech_gender}</Table.Cell>
                  <Table.Cell>{technician.tech_classification}</Table.Cell>
                  <Table.Cell>
                    {technician.tech_available ? "Not Available" : "Available"}
                  </Table.Cell>
                  <Table.Cell>{technician.tech_status}</Table.Cell>
                  <Table.Cell>
                    <p
                      className={classes.assign}
                      onClick={() =>
                        handleAssignTechnicianToRequest(
                          technician.tech_id,
                          technician.tech_name
                        )
                      }
                    >
                      Assign
                    </p>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          ,
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
              gap: "1rem",
            }}
          >
            <Dialog.Close asChild>
              <button className={classes.btnBack}>Back</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className={classes.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  );
};

export default TechnicianPortal;
