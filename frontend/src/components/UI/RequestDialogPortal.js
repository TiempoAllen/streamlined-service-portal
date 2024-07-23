import React from "react";
import classes from "./RequestDialogPortal.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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

const RequestDialogPortal = ({ request }) => {
  const requestor = `${request.user_firstname} ${request.user_lastname}`;
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
            />
          </fieldset>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="name">
              Date and Time
            </label>
            <input
              className={classes.Input}
              id="name"
              defaultValue={formatDateTime(request.datetime)}
            />
          </fieldset>
          <fieldset className={classes.Fieldset}>
            <label className={classes.Label} htmlFor="name">
              Purpose
            </label>
            <textarea className={classes.Input} id="name">
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
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green">Back</button>
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

export default RequestDialogPortal;
