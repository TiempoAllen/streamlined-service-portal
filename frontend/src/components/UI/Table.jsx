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

const Table = ({ inputs, technicians, onUpdateRequestStatus }) => {
  const isTechnician = inputs.length > 0 && inputs[0].tech_phone !== undefined;

  return (
    <>
      <table className={classes.table}>
        <tbody>
          {inputs.map((input, index) => (
            <tr key={index}>
              {isTechnician ? (
                <>
                  <td className={classes.namePhone}>
                    <p>{input.tech_name}</p>
                    <p className={classes.techPhone}>{input.tech_phone}</p>
                  </td>
                  <td>{input.tech_gender}</td>
                  <td>{input.tech_classification}</td>
                  <td>{input.available ? "Not Available" : "Available"}</td>
                  <td>{input.tech_status}</td>
                  <td className={classes.assign}>
                    <p>Assign</p>
                  </td>
                </>
              ) : (
                <>
                  <td>
                    {input.user_firstname} {input.user_lastname}
                  </td>
                  <td>{input.technician}</td>
                  <td>{input.purpose}</td>
                  <td>{formatDateTime(input.datetime)}</td>
                  <td>{input.request_location}</td>
                  <td>{input.department}</td>
                  <td className={classes.attachment}>
                    <p>
                      <AttachFileIcon />
                      {input.attachment ? input.attachment : "No Attachment"}
                    </p>
                  </td>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <td className={classes.view}>
                        <p>View</p>
                      </td>
                    </Dialog.Trigger>
                    <RequestDialogPortal
                      request={input}
                      technicians={technicians}
                      onUpdateRequestStatus={onUpdateRequestStatus}
                    />
                  </Dialog.Root>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
