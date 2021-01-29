import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button } from "application/components";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ConfirmationModal = ({
  header,
  isOpen,
  message,
  onCancel,
  onConfirm,
  cancelButtonText,
  confirmButtonText,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={onCancel}
      >
        <div className={classes.paper}>
          <h2 id="transition-modal-title">{header}</h2>
          <p id="transition-modal-description">{message}</p>
          <div className="moda-footer">
            <Button modifiers={["secondary"]} onClick={onCancel}>
              {cancelButtonText}
            </Button>
            <Button modifiers={["primary"]} onClick={onConfirm}>
              {confirmButtonText}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

ConfirmationModal.propTypes = {
  header: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.node,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func.isRequired,
  cancelButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
  size: PropTypes.string,
  status: PropTypes.oneOf(["danger", "warning", "success", "info", "none"]),
};

ConfirmationModal.defaultProps = {
  header: "",
  cancelButtonText: "Cancel",
  confirmButtonText: "Yes",
  message: null,
  size: "sm",
  status: "none",
  onCancel: null,
};
export default ConfirmationModal;
