import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { randomColor } from "../../utils/colors";
import { toDateString, toTimeString } from "../../utils/datetime";

export default function DayTimeline({ events }) {
  console.log({ events });
  return (
    <Timeline
      position="right"
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {events.map((event) => (
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            //   align="left"
            variant="body2"
            color="text.secondary"
            // width={300}
          >
            {toTimeString(new Date(event.createdAt))}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            {/* <TimelineDot> */}
            {/* <FastfoodIcon /> */}
            <Avatar
              sizes="sm"
              sx={{ bgcolor: randomColor(event.id) }}
              aria-label="recipe"
            >
              {`${event?.author?.name?.charAt(0)?.toUpperCase() || "U"}`}
            </Avatar>
            {/* </TimelineDot> */}
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="body2" color='text.primary' component="span">
              {event?.author?.name}
            </Typography>
            <Typography>{event.label}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}
