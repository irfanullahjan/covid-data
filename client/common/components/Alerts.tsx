"use client";

import { useEffect } from "react";
import { Alert as RsAlert, AlertProps } from "reactstrap";
import { TIMEOUT_ALERT } from "../../constants";
import { useAlertsStore } from "../stores/alerts.store";
import styles from "./Alerts.module.scss";

export function Alerts() {
  const { alerts, removeAlert } = useAlertsStore((store) => ({
    alerts: store.alerts,
    removeAlert: store.removeAlert,
  }));

  return (
    <div className={styles.Alerts}>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          id={alert.id}
          className={styles.Alert}
          color={alert.intent}
          toggle={() => removeAlert(alert.id)}
        >
          {alert.message}
        </Alert>
      ))}
    </div>
  );
}

function Alert(props: AlertProps & { id: string }) {
  const removeAlert = useAlertsStore((store) => store.removeAlert);

  useEffect(() => {
    const timeout = setTimeout(() => removeAlert(props.id), TIMEOUT_ALERT);
    return () => clearTimeout(timeout);
  }, [props.id, removeAlert]);

  return <RsAlert {...props} />;
}
