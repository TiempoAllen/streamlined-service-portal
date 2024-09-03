import React from "react";
import classes from "./RequestDialogPortal.module.css";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

const MessagePortal = ({
  isTechnicianAssigned,
  request_id,
  onUpdateRequestStatus,
}) => {
  const approveRequest = async () => {
    try {
      await axios.put(
        `http://localhost:8080/request/updateStatus?request_id=${request_id}`,
        {
          status: "Approved",
        }
      );
      onUpdateRequestStatus(request_id, "Approved");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className={classes.DialogOverlay} />
        <Dialog.Content className={classes.DialogContent}>
          <Dialog.Title className={classes.DialogTitleMessage}>
            Notice
          </Dialog.Title>
          <Dialog.Description className={classes.DialogDescription}>
            {isTechnicianAssigned
              ? "Are you sure you want to approve this request?"
              : "A technician has not yet been assigned to this request. A technician must be assigned before the request can be approved."}
          </Dialog.Description>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
              gap: "1rem",
            }}
          >
            {isTechnicianAssigned && (
              <Dialog.Close asChild>
                <button className={classes.btnApprove} onClick={approveRequest}>
                  Yes
                </button>
              </Dialog.Close>
            )}
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

export default MessagePortal;
