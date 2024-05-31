import React, { useRef } from "react";
import classes from "./Table.module.css";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import RequestDialogBox from "./RequestDialogBox";

const Table = ({ requests }) => {
  const dialogRef = useRef();

  const openDialog = () => {
    dialogRef.current.style.display = "flex";
  };

  const closeDialog = () => {
    dialogRef.current.style.display = "none";
  };

  return (
    <>
      <table className={classes.table}>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index} onClick={openDialog}>
              <td>
                {request.user_firstname} {request.user_lastname}
              </td>
              <td>{request.technician}</td>
              <td>{request.purpose}</td>
              <td>{request.datetime}</td>
              <td>{request.request_location}</td>
              <td>{request.department}</td>
              <td className={classes.assign}>
                <p>
                  <AddIcon /> Assign
                </p>
                <p className={classes.buttons}>
                  <CheckIcon />
                </p>
                <p className={classes.buttons}>
                  <CloseIcon />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <RequestDialogBox
        ref={dialogRef}
        handleOpen={openDialog}
        handleClose={closeDialog}
      />
    </>
  );
};

export default Table;
