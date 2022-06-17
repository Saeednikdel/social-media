import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import translate from "../translate"
export default function DialogAlert({ alert, setAlert }) {
  const handleClose = () => {
    setAlert({
      ...alert,
      isOpen: false,
    });
  };
  return (
    <div>
      <Dialog open={alert.isOpen} onClose={handleClose}>
        <DialogTitle>{alert.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{alert.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            {translate("close")}
          </Button>
          {alert.actionUrl && (
            <Button href={alert.actionUrl} color="secondary" autoFocus>
              {alert.actionText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
