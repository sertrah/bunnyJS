import React from "react";
import PropTypes from "prop-types";
import { IconButton, Button, Loader } from "application/components";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";


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
    "& .modal-footer": {
      marginTop: theme.spacing(3),
      "& button": {
        marginRight: theme.spacing(3),
      }
    }
  },
}));

function ModalForm({
  cancelLabel,
  confirmLabel,
  children,
  onClose,
  onCancel,
  onConfirm,
  title,
  visible,
  disabled,
  loading,
  ...otherProps
}) {
  const classes = useStyles();

  const content = (
    <>
      <div className="modal-header">
        <IconButton icon={CloseIcon} onClick={onClose} />
        <h2>{title}</h2>
      </div>
      <div className="moda-body">{children}</div>
      <div className="modal-footer">
        <Button
          modifiers={["secondary"]}
          onClick={onCancel || onClose}
          disabled={disabled}
        >
          {cancelLabel}
        </Button>
        <Button
          modifiers={["primary"]}
          onClick={onConfirm}
          type="submit"
          disabled={disabled}
        >
          {confirmLabel}
        </Button>
      </div>
    </>
  );

  return (
    <Modal
      onClose={loading ? undefined : onClose}
      open={visible}
      className={classes.modal}

      {...otherProps}
    >
      <div className={classes.paper}>
        {loading && <Loader />}

        <form className="modal" onSubmit={onConfirm}>
          {content}
        </form>
      </div>
    </Modal>
  );
}

ModalForm.propTypes = {
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
};

ModalForm.defaultProps = {
  cancelLabel: "Cancel",
  confirmLabel: "Confirm",
  title: "",
  visible: false,
  disabled: false,
  loading: false,
};

export default ModalForm;
