import Cookies from "js-cookie";
import api from "../services/api";

export const showClientDetails = async (id) => {
  const token = Cookies.get("token");

  const client = await api.get(`/clients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return client.data;
};

export const showChannelDetails = async (id) => {
  const token = Cookies.get("token");

  const channel = await api.get(`/channels/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return channel.data;
};

export const showTaskDetails = async (id) => {
  const token = Cookies.get("token");

  const task = await api.get(`/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return task.data;
};

export const fetchAllTasks = async () => {
  const token = Cookies.get("token");
  const tasks = await api.get(`/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return tasks.data;
};

export const fetchAllUsers = async () => {
  const token = Cookies.get("token");

  const users = await api.get("users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return users.data;
};

export const fetchAllClients = async () => {
  const token = Cookies.get("token");

  const clients = await api.get("clients", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return clients.data;
};

export const fetchAllLogs = async () => {
  const token = Cookies.get("token");

  const logs = await api.get("logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return logs.data;
};

export const fetchUserLogged = async () => {
  const token = Cookies.get("token");

  const user = await api.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return user.data;
};

export const fetchAllStatus = async () => {
  const token = Cookies.get("token");

  const status = await api.get(`/status`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return status.data;
};

export const fetchAllTypes = async () => {
  const token = Cookies.get("token");

  const types = await api.get("/types", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return types.data;
};

export const fetchAllChannels = async () => {
  const token = Cookies.get("token");

  const channels = await api.get("/channels", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return channels.data;
};

export const fetchAllGroups = async () => {
  const token = Cookies.get("token");

  const group = await api.get("/groups", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return group.data;
};

export const fetchAllAreas = async () => {
  const token = Cookies.get("token");

  const areas = await api.get("/areas", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return areas.data;
};

export const tasksByStatus = async (id) => {
  const token = Cookies.get("token");

  const tasks = await api.get(`/tasksByStatus/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return tasks.data;
};

export const fetchAreasOfGroup = async (id) => {
  const token = Cookies.get("token");
  console.log(id);
  const areas = await api.get(`/groups/${id}/areas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return areas.data;
};

export const fetchAgentsGroup = async (id) => {
  const token = Cookies.get("token");

  const areas = await api.get(`/groups/${id}/agents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return areas.data;
};
