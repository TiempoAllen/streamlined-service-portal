import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import { Table } from "@radix-ui/themes";
import classes from "./RequestDialogPortal.module.css";

const TechnicianPortal = ({
<<<<<<< HEAD
  technicians, // Default to an empty array
  request,
  onAssignTechnicianToRequest,
=======
  technicians = [],
  request_id , 
  onTechnicianAssigned ,
>>>>>>> fcd78850809556d9a43f778575f9e1d06d4bdca8
}) => {
  console.log(request.request_id);
  console.log("Technician Data: ", technicians);

  // Check if technicians is an array before mapping
  // const isTechniciansArray = Array.isArray(technicians);

  const availableTechnicians = technicians.filter(
    (technician) => technician.isavailable === true
  );

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className={classes.DialogOverlay} />
        <Dialog.Content className={classes.TechnicianDialogContent}>
          <Dialog.Title className={classes.DialogTitle}>
            Available Technicians, Request ID: {request.request_id}
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
              {availableTechnicians.map((technician, index) => (
                <Table.Row key={index}>
                  <Table.RowHeaderCell>
                    {technician.tech_name}
                  </Table.RowHeaderCell>
                  <Table.Cell>{technician.tech_phone}</Table.Cell>
                  <Table.Cell>{technician.tech_gender}</Table.Cell>
                  <Table.Cell>{technician.tech_classification}</Table.Cell>
                  <Table.Cell>
                    {technician.isavailable ? "Available" : "Not Available"}
                  </Table.Cell>
                  <Table.Cell>{technician.tech_status}</Table.Cell>
                  <Table.Cell>
                    <p
                      className={classes.assign}
                      onClick={() =>
                        onAssignTechnicianToRequest(
                          request.request_id,
                          technician.tech_id,
                          request.startTime,
                          request.endTime
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
