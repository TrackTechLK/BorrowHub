import React, { useEffect, useState } from "react";
import Compose from "../Compose";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Message from "../Message";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SendIcon from "@mui/icons-material/Send";
import "./MessageList.css";
import BorrowRequestCard from "../../../../components/BorrowRequestsCard";
import Button from "@mui/material/Button";

const MY_USER_ID = "apple";

export default function MessageList(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    var tempMessages = [
      {
        id: 1,
        author: "apple",
        message:
          "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
        timestamp: new Date().getTime(),
      },
      {
        id: 2,
        author: "orange",
        message:
          "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
        timestamp: new Date().getTime(),
      },
      {
        id: 3,
        author: "orange",
        message:
          "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
        timestamp: new Date().getTime(),
      },
      {
        id: 4,
        author: "apple",
        message:
          "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
        timestamp: new Date().getTime(),
      },
      {
        id: 5,
        author: "apple",
        message:
          "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
        timestamp: new Date().getTime(),
      },
      {
        id: 6,
        author: "apple",
        message:
          "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
        timestamp: new Date().getTime(),
      },
      {
        id: 7,
        author: "orange",
        message:
          "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
        timestamp: new Date().getTime(),
      },
      {
        id: 8,
        author: "orange",
        message:
          "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
        timestamp: new Date().getTime(),
      },
      {
        id: 9,
        author: "apple",
        message:
          "Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.",
        timestamp: new Date().getTime(),
      },
      {
        id: 10,
        author: "orange",
        message:
          "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
        timestamp: new Date().getTime(),
      },
    ];
    setMessages([...messages, ...tempMessages]);
  };

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false;
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    tempMessages.push(
      <BorrowRequestCard
        record={{
          accepted: true,
          borrower: 1,
          community: 1,
          created_at: "2023-08-08T14:53:36.838409Z",
          description: "I need an IC",
          id: 7,
          item_type: 1,
          item_type_name: "IC",
          updated_at: "2023-08-08T23:47:41.690599Z",
          username: "admin",
        }}
        AcceptButton={() => (
          // <Button variant="contained" color="info">
          //   Accept
          // </Button>
          <div></div>
        )}
        DeclineButton={() => (
          // <Button variant="contained" color="error">
          //   Decline
          // </Button>
          <div></div>
        )}
      />
    );

    return tempMessages;
  };

  return (
    <div className="message-list">
      <Toolbar
        title="Akmal Ali"
        rightItems={[
          <ToolbarButton
            key="info"
            icon={<InfoIcon fontSize="small" color="blue" />}
          />,
          // <ToolbarButton key="video" icon="ion-ios-videocam" />,
          // <ToolbarButton key="phone" icon="ion-ios-call" />
        ]}
      />

      <div className="message-list-container">{renderMessages()}</div>

      <Compose
        rightItems={[<ToolbarButton key="image" icon={<SendIcon />} />]}
      />
    </div>
  );
}
