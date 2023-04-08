import { create } from "zustand";

export type Intent = "primary" | "success" | "warning" | "danger";
export interface IAlert {
  id: string;
  intent: Intent;
  message: string;
}

interface IAlertsStore {
  alerts: IAlert[];
  addAlert: (alert: Omit<IAlert, "id">) => void;
  removeAlert: (id: IAlert["id"]) => void;
}

export const useAlertsStore = create<IAlertsStore>((set) => ({
  alerts: [],
  addAlert: (alert) =>
    set(({ alerts }) => {
      const id = alerts.length > 0 ? +alerts[alerts.length - 1].id + 1 : 1;
      return {
        alerts: [...alerts, { ...alert, id: id.toString() }],
      };
    }),
  removeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),
}));
