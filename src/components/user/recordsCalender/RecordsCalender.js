// import format from "date-fns/format";
// import getDay from "date-fns/getDay";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";

import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";

import { Circles } from "react-loader-spinner";

import {
  Calendar,
  // dateFnsLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";
import "moment-timezone"; // or 'moment-timezone/builds/moment-timezone-with-data[-datarange].js'. See their docs

// Set the IANA time zone you want to use
moment.tz.setDefault("Nairobi/Kenya");

// Setup the localizer by providing the moment Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

// const locales = {
//   "en-US": require("date-fns/locale/en-US"),
// };
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

let events = [
  // {
  //   title: "34 - coffee",
  //   allDay: true,
  //   start: new Date("2022, 10, 02"),
  //   end: new Date("2022, 10, 02"),
  // },
  // {
  //   title: "30 - coffee",
  //   start: new Date("2022, 10, 03"),
  //   end: new Date("2022, 10, 03"),
  // },
  // {
  //   title: "25 - coffee",
  //   start: new Date("2022, 10, 05"),
  //   end: new Date("2022, 10, 06"),
  // },
];

function RecordsCalender() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  // const [allEvents, setAllEvents] = useState(events);
  const [allEvents, setAllEvents] = useState(events);

  // const [eventsAI, setEventsAI] = useState([]);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      /*
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            */

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        break;
      }
    }

    // setAllEvents([...allEvents, newEvent]);

    //refresh data
    refreshRecords();
  }

  const [foundErr, setFoundErr] = useState(null);

  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    //fetch agents
    const fetchAll = () => {
      let adminCookie = Cookies.get("sessioniduser");
      if (adminCookie.length >= 1) {
        setIsLoading(true);

        setTimeout(() => {
          fetch("https://api.terraweb.africa/getRecords", {
            method: "post",
            headers: { "Content-Type": "application/JSON" },
            body: JSON.stringify({
              userid: adminCookie,
            }),
          })
            .then(function (response) {
              if (response.status === 400) {
                throw Error("Wrong credentials");
              }
              if (response === 500) {
                throw Error("Could not complete request because of an error");
              }

              return response.json();
            })
            .then((user) => {
              if (user[0].id >= 1) {
                //load data

                setFoundErr(null);

                setIsLoading(null);

                //new way to update the state event without duplicates
                // Update events using setEvents, excluding duplicates
                setAllEvents((prevEvents) => {
                  const updatedEvents = [...prevEvents];

                  for (const val of user) {
                    const eventExists = updatedEvents.some(
                      (event) => event.id === val.id
                    );

                    if (!eventExists) {
                      updatedEvents.push({
                        id: val.id,
                        title: val.weight + " - " + val.producttype,
                        allday: true,
                        start: new Date(val.daterecorded),
                        end: new Date(val.daterecorded),
                      });
                    }
                  }

                  return updatedEvents;
                });
              } else {
                //dont load

                setFoundErr(null);
                setIsLoading(null);
              }
            })
            .catch((err) => {
              // setFoundErr(err.message);
              setIsLoading(null);
              // setFlag(1);
            });
        }, 2000);
      } else {
        setIsLoading(null);
      }
    };

    fetchAll();
  }, []);

  //load analysis
  // const loadAnalysis = (datamap) => {
  //   settotalUsers(datamap.length);
  //   let count = 0;

  //   var i;
  //   for (i = 0; i < datamap.length; i++) {
  //     count = datamap[i].length;
  //   }
  //   settotalActiveUsers(count);
  // };

  //fetch records
  const fetchRecords = () => {
    let adminCookie = Cookies.get("sessioniduser");
    if (adminCookie.length >= 1) {
      setIsLoading(true);

      setTimeout(() => {
        fetch("https://api.terraweb.africa/getRecords", {
          method: "post",
          headers: { "Content-Type": "application/JSON" },
          body: JSON.stringify({
            userid: adminCookie,
          }),
        })
          .then(function (response) {
            if (response.status === 400) {
              throw Error("Wrong credentials");
            }
            if (response === 500) {
              throw Error("Could not complete request because of an error");
            }

            return response.json();
          })
          .then((user) => {
            if (user[0].id >= 1) {
              //load data

              setFoundErr(null);

              setIsLoading(null);

              //new way of updating allevents without duplicates
              // Update events using setEvents, excluding duplicates
              setAllEvents((prevEvents) => {
                const updatedEvents = [...prevEvents];

                for (const val of user) {
                  const eventExists = updatedEvents.some(
                    (event) => event.id === val.id
                  );

                  if (!eventExists) {
                    updatedEvents.push({
                      id: val.id,
                      title: val.weight + " - " + val.producttype,
                      allday: true,
                      start: new Date(val.daterecorded),
                      end: new Date(val.daterecorded),
                    });
                  }
                }

                return updatedEvents;
              });
            } else {
              //dont load

              setFoundErr(null);
              setIsLoading(null);
            }
          })
          .catch((err) => {
            // setFoundErr(err.message);
            setIsLoading(null);
            // setFlag(1);
          });
      }, 5000);
    } else {
      setIsLoading(null);
    }
  };

  //refresh after add records
  const refreshRecords = () => {
    fetchRecords();
  };

  return (
    <div className="Apppp bg-white pa4 mt6 w-80-l center">
      <h1>Your Daily Records populated in a calender (Kgs)</h1>
      <h2 className="">Choose a time frame for record retrieval</h2>
      <div className="d-flex">
        {/* <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} /> */}
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
      </div>
      {isLoading ? (
        <div className="db mb2">
          <Circles type="Oval" color="#000080" height={40} width={80} />
        </div>
      ) : null}
      {foundErr ? <label className="dt red  pb2">{foundErr}</label> : null}
      <button className="btn btn-orange br-pill pa2 mt2 f2">
        <label onClick={handleAddEvent}>Refresh</label>
      </button>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400, margin: "10px" }}
      />
    </div>
  );
}

export default RecordsCalender;
