import React from "react";
import classes from "./Table.module.css";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
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

const Table = ({ requests }) => {
  return (
    <>
      <table className={classes.table}>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>
                {request.user_firstname} {request.user_lastname}
              </td>
              <td>{request.technician}</td>
              <td>{request.purpose}</td>
              <td>{formatDateTime(request.datetime)}</td>
              <td>{request.request_location}</td>
              <td>{request.department}</td>
              <td className={classes.attachment}>
                {/* <AttachFileIcon /> */}
                <p>
                  <AttachFileIcon />
                  {request.attachment ? request.attachment : "No Attachment"}
                </p>
              </td>
              <td className={classes.assign}>
                <p>
                  <AddIcon /> Assign
                </p>
              </td>
              <td className={classes.assign}>
                <p className={classes.buttons}>
                  <CheckIcon />
                </p>
              </td>
              <td className={classes.assign}>
                <p className={classes.buttons}>
                  <CloseIcon />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
