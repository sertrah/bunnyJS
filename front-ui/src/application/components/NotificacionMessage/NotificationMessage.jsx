import React from "react";
import { createPortal } from "react-dom";

function NotificationMessage({ notifications, mountingElement }) {
  return createPortal(
    <div className="notification-container top-right">
      {notifications.map(({ id, title, message }) => (
        <div key={id} className="notify-styleee">
          <strong> {title}</strong>
          {message}
        </div>
      ))}
    </div>,
    mountingElement
  );
}

NotificationMessage.defaultProps = {
  notifications: [],
  mountingElement: document.body,
};

export default NotificationMessage;
