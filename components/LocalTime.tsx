"use client";

import { useSyncExternalStore } from "react";

const TIME_ZONE = "America/Denver";
const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});

function subscribe(callback: () => void) {
  const id = setInterval(callback, 30000);
  return () => clearInterval(id);
}

function getSnapshot() {
  return Date.now();
}

function getServerSnapshot() {
  return null;
}

export function LocalTime() {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (now === null) return null;

  const date = new Date(now);
  return (
    <time dateTime={date.toISOString()}>{`, ${formatter.format(date)}`}</time>
  );
}
