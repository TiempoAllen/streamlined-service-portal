import React from "react";
import classes from "./RequestPage.module.css";

const RequestPage = () => {
  return (
    <section className={classes.request}>
      <div className={classes.main}>
        <h1>Request</h1>
        <form>
          <label>For:</label>
          <input type="text" placeholder="e.g. Janitor" />
          <label>Location</label>
          <input type="text" placeholder="e.g. CCS Faculty Room" />
          <div>
            <div className={classes.time}>
              <label>Time</label>
              <input type="text" placeholder="e.g. 9:00 AM" />
            </div>
            <div className={classes.time}>
              <label>Date</label>
              <input type="date" placeholder="e.g. Janitor" />
            </div>
          </div>
          <label>Purpose</label>
          <input type="text" placeholder="e.g. Clean the room." />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default RequestPage;
