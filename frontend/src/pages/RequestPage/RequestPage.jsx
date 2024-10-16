import React, { useRef, useState } from "react";
import classes from "./RequestPage.module.css";
import { submitRequest } from "../../util/auth";
import uploadIcon from "../../assets/upload-icon.svg";
import deleteIcon from "../../assets/delete-button.svg";
import * as Dialog from "@radix-ui/react-dialog";
import FileModal from "../../components/UI/FileModal";
import { useRouteLoaderData } from "react-router-dom";
import closeIcon from "../../assets/close.svg";

const RequestPage = () => {
  const user = useRouteLoaderData("home");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();
  const [formData, setFormData] = useState({
    request_location: "",
    startTime: "",
    endTime: "",
    title: "",
    description: "",
    request_technician: "",
    attachment: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteFile = () => {
    setFile("");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await submitRequest(formData, user.user_id);

    if (result.success) {
      window.location.href = result.redirectUrl;
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <section className={classes.request}>
      <div className={classes.main}>
        <h1>Request</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className={classes.inputs}>
            <div className={classes.firstHalf}>
              <div>
                <span>
                  <label id="technicianLabel">Technician</label>
                  <select
                    name="request_technician"
                    value={formData.request_technician}
                    onChange={handleChange}
                    required
                  >
                    <option value="Janitor">Janitor</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Masonry">Masonry</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </span>
                <span>
                  <label id="locationLabel">Location</label>
                  <input
                    type="text"
                    name="request_location"
                    placeholder="e.g. CCS Faculty Room"
                    value={formData.request_location}
                    onChange={handleChange}
                    required
                  />
                </span>
              </div>
              <div>
                <label id="departmentLabel">Department</label>
                <input
                  type="text"
                  defaultValue={user.department}
                  disabled
                  required
                />
                <label id="datetimeLabel">Start Date and Time</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
                <label id="datetimeLabel">End Date and Time</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={classes.secondHalf}>
              <span>
                <label id="titleLabel">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Fix something."
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </span>
              <span>
                <label id="descriptionLabel">Description</label>
                <textarea
                  type="text"
                  name="description"
                  placeholder="e.g. Clean the room."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </span>
              <span>
                <label id="attachFileLabel">Attach File *Optional</label>
                <div className={classes.fileUpload}>
                  <div className={classes.fileArea}>
                    {file ? (
                      <Dialog.Root>
                        <Dialog.Trigger asChild>
                          <p className={classes.file}>{file.name}</p>
                        </Dialog.Trigger>
                        <FileModal file={file} />
                      </Dialog.Root>
                    ) : (
                      "No file selected."
                    )}
                  </div>
                  <div className={classes.imageUpload}>
                    <label htmlFor={classes.fileInput}>
                      <div>
                        <div onClick={handleImageClick}>
                          <img src={uploadIcon} alt="upload icon" />
                        </div>
                      </div>
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      name="attachment"
                      value={formData.attachment}
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </div>
                  {file && (
                    <div
                      className={classes.deleteIcon}
                      onClick={handleDeleteFile}
                    >
                      <img src={deleteIcon} alt="delete icon" />
                    </div>
                  )}
                </div>
              </span>
            </div>
          </div>
          {errorMessage && (
            <div className={classes.error}>
              <p>
                <span>Failed!</span> {errorMessage}
              </p>
              <img
                src={closeIcon}
                className={classes.closeIcon}
                alt="close-icon"
                onClick={() => setErrorMessage("")}
              />
            </div>
          )}
          <button type="submit" id="submitButton" className={classes.submitBtn}>
            Submit Record
          </button>
        </form>
      </div>
    </section>
  );
};

export default RequestPage;
