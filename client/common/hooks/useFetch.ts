import { useState } from "react";
import { Intent, useAlertsStore } from "../stores/alerts.store";
import { fetchClientSide } from "../utils/fetchClientSide";

type Feedback = {
  intent: Intent;
  message: string;
};

type FeedbackInput =
  | {
      basedOn: "status";
      map: Record<number, Feedback>;
    }
  | {
      basedOn: "outcome";
      map: Partial<Record<"success" | "rejection", Feedback>>;
    };

export function useFetch(fetcher = fetchClientSide) {
  const [loading, setLoading] = useState(false);
  const addAlert = useAlertsStore((state) => state.addAlert);

  const statefulFetch = async (
    input: RequestInfo | URL,
    init?: RequestInit & { feedback?: FeedbackInput }
  ) => {
    setLoading(true);
    return fetcher(input, init)
      .then(async (res) => {
        let alert: Feedback | undefined;
        const feedback = init?.feedback;
        const alerts: Feedback[] = [];
        switch (feedback?.basedOn) {
          case "outcome":
            alert = feedback.map[res.ok ? "success" : "rejection"];
            break;
          case "status":
            alert = feedback.map[res.status];
            break;
        }
        if (alert) {
          alerts.push(alert);
        }
        if (!res.ok) {
          if (alerts.length === 0)
            alerts.push({
              intent: "danger",
              message: `Request failed with status ${res.status} ${res.statusText}`,
            });
          const body = await res.json();
          if (body.message) {
            Array.isArray(body.message)
              ? body.message.forEach((message: string) =>
                  alerts.push({
                    intent: "warning",
                    message,
                  })
                )
              : alerts.push({
                  intent: "warning",
                  message: body.message,
                });
          }
        }
        alerts.forEach((alert) => addAlert(alert));
        setLoading(false);
        return res;
      })
      .catch((err) => {
        addAlert({ intent: "danger", message: err.message });
        setLoading(false);
        throw err;
      });
  };

  return [statefulFetch, loading] as const;
}
