import React from "react";
import classes from "./RequestDialogBox.module.css";

const RequestDialogBox = ({ dialogRef, closeDialog }) => {
  return (
    <div
      className={classes.dialogOverlay}
      ref={dialogRef}
      onClick={closeDialog}
    >
      <div className={classes.dialogBox} onClick={(e) => e.stopPropagation()}>
        <p>This is a dialog box</p>
        <button onClick={closeDialog}>Close</button>
      </div>
    </div>
  );
};

export default RequestDialogBox;
