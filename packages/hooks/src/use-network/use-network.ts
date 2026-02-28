import { useCallback, useEffect, useState } from "react";

import { useWindowEvent } from "../use-window-event/use-window-event";

export interface UserNetworkReturnValue {
  online: boolean;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: "slow-2g" | "2g" | "3g" | "4g";
  rtt?: number;
  saveData?: boolean;
  type?:
    | "bluetooth"
    | "cellular"
    | "ethernet"
    | "wifi"
    | "wimax"
    | "none"
    | "other"
    | "unknown";
}

interface NavigatorConnectionLike extends EventTarget {
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: UserNetworkReturnValue["effectiveType"];
  rtt?: number;
  saveData?: boolean;
  type?: UserNetworkReturnValue["type"];
}

interface NavigatorWithConnection extends Navigator {
  connection?: NavigatorConnectionLike;
  mozConnection?: NavigatorConnectionLike;
  webkitConnection?: NavigatorConnectionLike;
}

const getNavigatorConnection = (
  nav: NavigatorWithConnection
): NavigatorConnectionLike | undefined =>
  nav.connection || nav.mozConnection || nav.webkitConnection;

const getConnection = (): Omit<UserNetworkReturnValue, "online"> => {
  if (typeof navigator === "undefined") {
    return {};
  }

  const runtimeNavigator = navigator as NavigatorWithConnection;
  const connection = getNavigatorConnection(runtimeNavigator);

  if (!connection) {
    return {};
  }

  return {
    downlink: connection.downlink,
    downlinkMax: connection.downlinkMax,
    effectiveType: connection.effectiveType,
    rtt: connection.rtt,
    saveData: connection.saveData,
    type: connection.type,
  };
};

/**
 * Reports online/offline state and, when supported, Network Information API
 * values.
 *
 * Automatically updates on browser online/offline events and connection
 * changes.
 *
 */
export const useNetwork = (): UserNetworkReturnValue => {
  const [status, setStatus] = useState<UserNetworkReturnValue>({
    online: true,
  });

  const handleConnectionChange = useCallback(() => {
    setStatus((current) => ({ ...current, ...getConnection() }));
  }, []);

  useWindowEvent("online", () =>
    setStatus({ online: true, ...getConnection() })
  );
  useWindowEvent("offline", () =>
    setStatus({ online: false, ...getConnection() })
  );

  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }

    const runtimeNavigator = navigator as NavigatorWithConnection;
    const connection = getNavigatorConnection(runtimeNavigator);

    if (connection) {
      setStatus({ online: runtimeNavigator.onLine, ...getConnection() });
      connection.addEventListener("change", handleConnectionChange);
      return () => {
        connection.removeEventListener("change", handleConnectionChange);
      };
    }

    if (typeof runtimeNavigator.onLine === "boolean") {
      setStatus((current) => ({ ...current, online: runtimeNavigator.onLine }));
    }
  }, [handleConnectionChange]);

  return status;
};

export type UseNetworkReturnValue = UserNetworkReturnValue;
