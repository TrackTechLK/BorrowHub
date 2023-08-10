import * as React from "react";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {  useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardContent ,CardHeader,Typography } from '@mui/material';
import CustomizedDialogs from "./HelpCard";
import { Filter } from "react-admin";
import HelpCard from "./HelpCard";

const helpMapper = {
  '/borrow_requests': 
            ` When a user identifies an item they wish to borrow, they can easily create a borrow request. This request includes details about the item, borrowing duration, and purpose.`,
  '/borrows': 
            `Borrowers can easily view a list of items they currently have on loan. This feature serves as a friendly reminder to return items on time and in good condition.
            `,
  '/categories': [<div>this is borrow request screen</div>],
  '/items': [<div>this is borrow request screen</div>],

  '/lends': `Lenders have access to a comprehensive list of items they've lent out.
             This feature helps users keep track of their shared resources and ensures items are returned promptly.`,
  '/item_types': [<div>this is borrow request screen</div>],
  '/users': [<div>this is borrow request screen</div>],
  '/my_communities': `BorrowHub encourages community collaboration by suggesting users to engage in discussions or seek 
                    recommendations from their fellow community members. A dedicated section prompts users to ask questions 
                    or seek advice, fostering a sense of togetherness.`,
  '/communities': `BorrowHub encourages community collaboration by suggesting users to engage in discussions or seek 
                    recommendations from their fellow community members. A dedicated section prompts users to ask questions 
                    or seek advice, fostering a sense of togetherness.`,
  '/community_requests': [<div>this is borrow request screen</div>],
  '/lend_confirmation': `Upon confirming the borrowing arrangement, the lender marks the item as lent.
                            This action notifies the borrower and updates the item's status in both users' lists.`,
  '/return_confirmation': [<div>this is borrow request screen</div>],
  '/': `The dashboard serves as the central hub of activity. 
    It provides an overview of recent community updates, notifications, and quick access to essential features.
  `,

};

const SimpleDialogBox = () => {
    const location = useLocation();
    const pathname = location.pathname

    const result = Object.entries(helpMapper).find(([k]) => pathname.includes(k));
    
    return <div>
        <HelpCard content={result[1]}/>
        </div>
};

export const HelpDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Tooltip title="Delete">
        <IconButton onClick={handleClickOpen}>
          <HelpIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <SimpleDialogBox />
      </Dialog>
    </div>
  );
};
