import React from "react";
import classes from "./RequestDialogPortal.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

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
          <hr />
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
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
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
