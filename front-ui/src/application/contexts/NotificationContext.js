import React, { createContext, useState, useMemo, useCallback } from "react";
import NotificacionMessage from "./../components/NotificacionMessage";

const NotificationContext = createContext(null);

const defaultConfig = {
    duration: 3000,
    mountingElement: document.body
};
const removeById = (id) => (prev) => prev.length > 0 ? prev.filter((a) => a.id !== id) : prev

function NotificationProvider({ children, config }) {
    const [notificationList, setNotificationList] = useState([]);
    const { duration, mountingElement } = {
        ...defaultConfig,
        ...config
    };

    const handleClose = useCallback(
        id => {
            clearTimeout(id);
            setNotificationList(removeById(id));
        },
        [setNotificationList]
    );

    const notify = useMemo(() => {
        const notifyFn = notification => {
            const id = setTimeout(() => {
                setNotificationList(removeById(id));
            }, duration);
            setNotificationList(list => [...list, { id, ...notification }]);
        };

        const notifyStatus = status => notification =>
            notifyFn({ ...notification, status });

        notifyFn.success = notifyStatus("success");

        return notifyFn;
    }, [setNotificationList, duration]);

    return (
        <>
            <NotificationContext.Provider value={notify}>
                {children}
            </NotificationContext.Provider>
            <NotificacionMessage
                notifications={notificationList}
                onClose={handleClose}
                mountingElement={mountingElement}
            />
        </>
    );
}

export { NotificationContext, NotificationProvider };
