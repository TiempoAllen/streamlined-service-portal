import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { json, useNavigate, useRouteLoaderData } from "react-router-dom";

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };
  const [totalRequests, setTotalRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [totalTechnicians, setTotalTechnicians] = useState(0);
  const [recentRequests, setRecentRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useRouteLoaderData("home");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const totalResponse = await axios.get('http://localhost:8080/request/all');
        setTotalRequests(totalResponse.data);

        // Assuming your backend has separate endpoints for these data
        const pendingResponse = await axios.get('http://localhost:8080/request/pending');
        setPendingRequests(pendingResponse.data);

        const approvedResponse = await axios.get('http://localhost:8080/request/approved');
        setApprovedRequests(approvedResponse.data);

        const techniciansResponse = await axios.get('http://localhost:8080/technician/getAllTechnician');
        setTotalTechnicians(techniciansResponse.data); // Adjust based on your response structure

        const recentResponse = await axios.get('http://localhost:8080/request/recent');
        setRecentRequests(recentResponse.data);
        
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleSeeAllClick = () => {
    navigate(`/home/${user.user_id}/approval`); // Redirect to the specified URL
  };

  if(isLoading){
    return <p>{error}</p>;
  }

  if(error){
    return <p>{error}</p>;
  }

    return(
        <section className={classes.main}>

        {/* 1st CardBox */}
        <section className={classes.cardBox}>
        {/* Total Requests */}
          <div className={classes.card}>
            <div>
                <div className={classes.requestsNumber}>{totalRequests.length}</div>
                <div className={classes.name}>Total Requests</div>
            </div>
            <div className={classes.icon}>
            <ion-icon name="cloud-upload-outline"></ion-icon>
            </div>
          </div>

          {/* Pending Requests */}
          <div className={classes.card}>
            <div>
                <div className={classes.requestsNumber}>{pendingRequests.length}</div>
                <div className={classes.name}>Pending Requests</div>
            </div>
            <div className={classes.icon}>
            <ion-icon name="refresh-circle-outline"></ion-icon>
            </div>
          </div>

          {/*  */}
          <div className={classes.card}>
            <div>
                <div className={classes.requestsNumber}>{approvedRequests.length}</div>
                <div className={classes.name}>Approved Requests</div>
            </div>
            <div className={classes.icon}>
            <ion-icon name="checkmark-done-circle-outline"></ion-icon>
            </div>
          </div>

          {/*  */}
          <div className={classes.card}>
            <div>
                <div className={classes.requestsNumber}>{totalTechnicians.length}</div>
                <div className={classes.name}>Total Technicians</div>
            </div>
            <div className={classes.icon}>
            <ion-icon name="people-outline"></ion-icon>
            </div>
          </div>

        </section>

         {/*  */}
        <section className={classes.details}>
            <div className={classes.tableDashboard}>
              <div className={classes.cardHeader}>
                <h2>Recent Requests</h2>
                <button className={classes.btn} onClick={handleSeeAllClick}>See All</button>
              </div>
              <table>
                  <thead>
                      <tr>
                        <td>Requestor</td>
                        <td>Location</td>
                        <td>Reason</td>
                        <td>Department</td>
                      </tr>
                  </thead>

                  <tbody>
                  {recentRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.user_firstname}</td>
                  <td>{request.request_location}</td>
                  <td>{request.purpose}</td>
                  <td>{request.department}</td>
                </tr>
              ))}
                  </tbody>
              </table>
            </div>
        {/* Calendar */}
        <div className={classes.calendarContainer}>
        <div className={classes.cardHeader}>
          <h2>Calendar</h2>
          </div>
          <Calendar onChange={onChange} value={date} />
          </div>
        </section>
      </section>
    );
};

export default Dashboard;

export async function loader({ params }) {
  const user_id = params.user_id; 
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`http://localhost:8080/user/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    const user = response.data;
    if (!user) {
      throw json({ message: "User not found" }, { status: 500 });
    }

    return user; 
  } catch (error) {
    throw new Error(`Error fetching user details: ${error.message}`);
  }
}