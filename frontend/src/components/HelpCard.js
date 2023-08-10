import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  
};

export default function HelpCard({content}) {
  return (
    <div>
      
        <BootstrapDialogTitle id="customized-dialog-title">
          Help Center
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
                    {content}
          {/* When a user identifies an item they wish to borrow, 
          they can easily create a borrow request. This request includes details about the item, 
          borrowing duration, and purpose. */}
          </Typography>
        </DialogContent>
      
    </div>
  );
}