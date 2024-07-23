import React from "react";
import classes from "./Table.module.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import * as Dialog from "@radix-ui/react-dialog";
import RequestDialogPortal from "../../components/UI/RequestDialogPortal";

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
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <td className={classes.assign}>
                    <p>View</p>
                  </td>
                </Dialog.Trigger>
                <RequestDialogPortal request={request} />
              </Dialog.Root>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
