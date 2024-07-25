import React, {useState} from "react";
import classes from "./Dashboard.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };
    return(
        <div className={classes.main}>

        {/* 1st CardBox */}
        <div className={classes.cardBox}>
        {/* Total Requests */}
          <div className={classes.card}>
            <div>
                <div className={classes.requestsNumber}>1000</div>
                <div className={classes.name}>Total Requests</div>
            </div>
            <div className={classes.icon}>
            <ion-icon name="git-pull-request-outline"></ion-icon>
            </div>
          </div>

          {/* Pending Requests */}
          <div className={classes.card}>
            <div>
                <div className={classes.requestsNumber}>310</div>
                <div className={classes.name}>Pending Requests</div>
            </div>
            <div className={classes.icon}>
            <ion-icon name="cube-outline"></ion-icon>
            </div>
          </div>

          {/*  */}
          <div className={classes.card}>
            <div>
                <div className={classes.requestsNumber}>82</div>
                <div className={classes.name}>xxxx</div>
            </div>
            <div className={classes.icon}>
            <ion-icon name="bag-check-outline"></ion-icon>
            </div>
          </div>

          {/*  */}
          <div className={classes.card}>
            <div>
                <div className={classes.requestsNumber}>31</div>
                <div className={classes.name}>xxx</div>
            </div>
            <div className={classes.icon}>
            <ion-icon name="people-outline"></ion-icon>
            </div>
          </div>

        </div>

         {/*  */}
        <div className={classes.details}>
            <div className={classes.tableDashboard}>
              <div className={classes.cardHeader}>
                <h2>xxxxxxxx</h2>
                <button className={classes.btn}>See All</button>
              </div>
              <table>
                  <thead>
                      <tr>
                        <td>??</td>
                        <td>???</td>
                        <td>????</td>
                        <td>????</td>
                      </tr>
                  </thead>

                  <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>30</td>
                        <td>12</td>
                        <td>xxxx</td>
                    </tr>

                    <tr>
                        <td>Jane Doe</td>
                        <td>21</td>
                        <td>15</td>
                        <td>XXXX</td>
                    </tr>

                    <tr>
                        <td>Umay Men</td>
                        <td>19</td>
                        <td>17</td>
                        <td>XXXX</td>
                    </tr>
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
        </div>
      </div>
    );
};

export default Dashboard;
