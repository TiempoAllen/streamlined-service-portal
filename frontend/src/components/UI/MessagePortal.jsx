import React from "react";
import classes from "./RequestDialogPortal.module.css";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";

const MessagePortal = ({
  messageType,
  isTechnicianAssigned,
  request_id,
  onApproveRequest,
  onRequestDone,
}) => {
  const isApproveMessage = messageType === "approve";
  const isMarkAsDoneMessage = messageType === "markAsDone";
  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className={classes.DialogOverlay} />
        <Dialog.Content className={classes.DialogContent}>
          <Dialog.Title className={classes.DialogTitleMessage}>
            Notice
          </Dialog.Title>
          <Dialog.Description className={classes.DialogDescription}>
            {isApproveMessage && (
              <>
                {isTechnicianAssigned
                  ? "Are you sure you want to approve this request?"
                  : "A technician has not yet been assigned to this request. A technician must be assigned before the request can be approved."}
              </>
            )}
            {isMarkAsDoneMessage &&
              "Are you sure you want to mark this request as done?"}
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
                <button
                  className={classes.btnApprove}
                  onClick={() => onApproveRequest(request_id)}
                >
                  Yes
                </button>
              </Dialog.Close>
            )}
            {isMarkAsDoneMessage && (
              <Dialog.Close asChild>
                <button
                  className={classes.btnApprove}
                  onClick={() => onRequestDone(request_id)}
                >
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
