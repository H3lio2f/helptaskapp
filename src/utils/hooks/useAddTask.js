import { useRouter } from "next/router";
import { useCallback } from "react";
import { useGlobal } from "../contexts/global";

export default function useAddTask() {
  const { showNewTask, setShowNewTask, setShowNewClient } = useGlobal();

  return [setShowNewTask, setShowNewClient];
}
