import React from "react";
import classes from "./RequestPage.module.css";
import { Form, json, redirect, useRouteLoaderData } from "react-router-dom";
import axios from "axios";

const RequestPage = () => {
  const user = useRouteLoaderData("home");
  return (
    <section className={classes.request}>
      <div className={classes.main}>
        <h1>Request</h1>
        <Form method="post" encType="multipart/form-data">
          <div>
            <div className={classes.time}>
              <label id="technicianLabel">Technician</label>
              <select name="technician" required>
                <option value="Janitor">Janitor</option>
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Masonry">Masonry</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div className={classes.time}>
              <label id="locationLabel">Location</label>
              <input
                type="text"
                name="request_location"
                placeholder="e.g. CCS Faculty Room"
                required
              />
            </div>
          </div>
          <label id="departmentLabel">Department</label>
          <input type="text" defaultValue={user.department} disabled required />
          <label id="datetimeLabel">Date and Time</label>
          <input type="datetime-local" name="datetime" required />
          <label id="purposeLabel">Purpose</label>
          <input
            type="text"
            name="purpose"
            placeholder="e.g. Clean the room."
            required
          />
          <label id="attachFileLabel">Attach File *Optional</label>
          <input type="file" name="attachment" />
          <button type="submit" id="submitButton">
            Submit
          </button>
        </Form>
      </div>
    </section>
  );
};

export default RequestPage;

export const action = async ({ request, params }) => {
  const user_id = params.user_id;
  const data = await request.formData();

  const rawDatetime = data.get("datetime");
  const formattedDatetime = new Date(rawDatetime).toISOString();

  const requestData = new FormData();
  requestData.append("request_location", data.get("request_location"));
  requestData.append("datetime", formattedDatetime);
  requestData.append("purpose", data.get("purpose"));
  requestData.append("user_id", user_id);
  requestData.append("technician", data.get("technician"));
  requestData.append("attachment", data.get("attachment"));

  for (let [key, value] of requestData.entries()) {
    console.log(`${key}: ${value}`);
  }

  try {
    const response = await axios.post(
      "http://localhost:8080/request/add",
      requestData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      throw json({ message: "Could not create request." }, { status: 500 });
    }

    const resData = response.data;
    console.log(resData);

    return redirect(`/home/${user_id}`);
  } catch (error) {
    console.error(error.response);
  }
};
