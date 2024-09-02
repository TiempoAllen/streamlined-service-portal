import React from "react";
import classes from "./RequestDialogPortal.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import MessagePortal from "./MessagePortal";
import TechnicianPortal from "./TechnicianPortal";

const formatDateTime = (datetime) => {
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

const RequestDialogPortal = ({ request, technicians }) => {
  const requestor = `${request.user_firstname} ${request.user_lastname}`;

  const approveRequest = async (request_id) => {
    try {
      await axios.put(
        `http://localhost:8080/request/updateStatus?request_id=${request_id}`,
        {
          status: "Approved",
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className={classes.DialogOverlay} />
        <Dialog.Content className={classes.DialogContent}>
          <Dialog.Title className={classes.DialogTitle}>
            Request Details
          </Dialog.Title>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="name">
              Requestor
            </label>
            <input
              className={classes.Input}
              id="name"
              defaultValue={requestor}
              disabled
            />
          </fieldset>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="name">
              Technician Requested
            </label>
            <input
              className={classes.Input}
              id="name"
              defaultValue={request.technician}
              disabled
            />
          </fieldset>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="name">
              Technician Assigned
            </label>
            <div className={classes.techAssignedInput}>
              {request.tech_id !== null ? (
                <input
                  className={classes.Input}
                  id="techAssigned"
                  defaultValue={request.tech_id}
                  disabled
                />
              ) : (
                <>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <AddIcon
                        sx={{
                          padding: "0.50rem",
                          border: "solid 1px #631c21",
                          color: "#ffffff",
                          backgroundColor: "#631c21",
                          cursor: "pointer",
                        }}
                      />
                    </Dialog.Trigger>
                    <TechnicianPortal
                      technicians={technicians}
                      request_id={request.request_id}
                    />
                  </Dialog.Root>
                  <input
                    className={classes.Input}
                    id="techAssigned"
                    defaultValue="None"
                    disabled
                  />
                </>
              )}
            </div>
          </fieldset>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="name">
              Date and Time
            </label>
            <input
              className={classes.Input}
              id="name"
              defaultValue={formatDateTime(request.datetime)}
              disabled
            />
          </fieldset>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="name">
              Purpose
            </label>
            <textarea className={classes.Input} id="name" disabled>
              {request.purpose}
            </textarea>
          </fieldset>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="name">
              Attachment
            </label>
            <p className={classes.attachment}>
              <AttachFileIcon />
              {request.attachment ? request.attachment : "No Attachment"}
            </p>
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
              gap: "1rem",
            }}
          >
            {request.status === "Pending" ? (
              <>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button
                      className={classes.btnApprove}
                      // onClick={() => approveRequest(request.request_id)}
                    >
                      Approve
                    </button>
                  </Dialog.Trigger>
                  <MessagePortal />
                </Dialog.Root>
                <Dialog.Close asChild>
                  <button className={classes.btnBack}>Back</button>
                </Dialog.Close>
              </>
            ) : (
              <Dialog.Close asChild>
                <button className={classes.btnBack}>Back</button>
              </Dialog.Close>
            )}
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

export default RequestDialogPortal;
