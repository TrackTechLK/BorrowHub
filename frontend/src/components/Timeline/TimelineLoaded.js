import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";  
import groupByDay from "./groupByDay";
import DayTimeline from "./MaterialTimeline";

const getDayString = (date) =>
  new Date(date).toLocaleDateString("en", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const TimelineLoadedView = ({
  events = [],
  handleLoadMore,
  total,
  classes,
}) => {
  const { days, eventsByDay } = groupByDay(events);
  if (days.length === 0) {
    return (
      <Typography color="error">
        Error: This list should not be empty.
      </Typography>
    );
  }
  return (
    <div style={{
        width: 600,
        margin: "auto",
      }}>
      {days.map((day) => (
        <div key={day} style={{marginBottom: "1em"}}>
          <Typography variant="subheading" gutterBottom>
            {getDayString(day)}
          </Typography>
          <DayTimeline events={eventsByDay[day]} />
          {/* <EventList events={eventsByDay[day]} /> */}
        </div>
      ))}
      {events.length < total && (
        <Button variant="contained" onClick={handleLoadMore}>
          Load more events
        </Button>
      )}
    </div>
  );
};

const TimelineLoaded = TimelineLoadedView

export default TimelineLoaded;
