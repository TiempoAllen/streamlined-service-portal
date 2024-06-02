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
        <Form method="post">
          <div>
            <div className={classes.time}>
              <label>For:</label>
              <input type="text" defaultValue="Janitor" disabled />
            </div>
            <div className={classes.time}>
              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. CCS Faculty Room"
              />
            </div>
          </div>
          <label>Department</label>
          <input type="text" defaultValue={user.department} disabled />
          <label>Date and Time</label>
          <input type="datetime-local" name="datetime" />
          <label>Purpose</label>
          <input
            type="text"
            name="purpose"
            placeholder="e.g. Clean the room."
          />
          <label>Attach File</label>
          <input type="file" name="attachment" />
          <button type="submit">Submit</button>
          
        </Form>
      </div>
    </section>
  );
};

export default RequestPage;

export const action = async ({ request, params }) => {
  const userId = params.userId;
  const data = await request.formData();

  const requestData = {
    request_location: data.get("location"),
    datetime: data.get("datetime"),
    purpose: data.get("purpose"),
    user_id: userId,
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/request",
      requestData
    );

    if (response.status !== 200) {
      throw json({ message: "Could not create request." }, { status: 500 });
    }

    const resData = response.data;
    console.log(resData);

    return redirect(`/home/${userId}`);
  } catch (error) {
    console.error(error);
  }
};
