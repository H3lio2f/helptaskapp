import Cookies from "js-cookie";
import api from "../services/api";

export const addNewClient = async ({
  reference,
  name,
  country,
  city,
  address,
  email1,
  email2,
  phone1,
  phone2,
  photo
}) => {

  const token = Cookies.get("token");

  let data = new FormData();
  data.append('reference', reference);
  data.append('name', name);
  data.append('country', country);
  data.append('city', city);
  data.append('address', address);
  data.append('email1', email1);
  data.append('email2', email2);
  data.append('phone1', phone1);
  data.append('phone2', phone2);
  data.append('active', 1);

  if(photo){
    data.append("photo", photo);
  }

  const client = await api.post("/clients", data,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return client;
};

export const updateUser = async ({
  id,
  name,
  email,
  country,
  phone,
  photo,
  role
}) => {

  const token = Cookies.get("token");

  const role_name = role.value;

  let data = new FormData();
  data.append('name', name);
  data.append('email', email);
  data.append('country', country);
  data.append('phone', phone);
  data.append('role', role_name);

  if(photo){
    data.append("photo", photo);
  }

  const user = await api.post(`/users/${id}/update`, data,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return user;
};

export const addNewUser = async ({ 
  name, 
  email, 
  password, 
  role,
  country,
  phone,
  photo
}) => {

  const token = Cookies.get("token");

  let data = new FormData();
  data.append('name', name);
  data.append('email', email);
  data.append('password', password);
  data.append('role', role);
  data.append('country', country);
  data.append('phone', phone);

  if(photo){
    data.append("photo", photo);
  }

  const user = await api.post("/register", data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return user;
};

export const updateClient = async ({
  id,
  reference,
  name,
  country,
  city,
  address,
  email1,
  email2,
  phone1,
  phone2,
  active,
}) => {

  const token = Cookies.get("token");
  
  const client = await api.post(
    `/clients/${id}/update`,
    {
      reference,
      name,
      country,
      city,
      address,
      email1,
      email2,
      phone1,
      phone2,
      active,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return client;
};


export const deleteClient = async (id) => {
  const token = Cookies.get("token");

  const data = await api.delete(`/clients/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const deleteGroup = async (id) => {
   const token = Cookies.get("token");

  const data = await api.delete(`/groups/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const deleteType = async (id) => {
  const token = Cookies.get("token");

  const data = await api.delete(`/types/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const deleteChannel = async (id) => {
  const token = Cookies.get("token");

  const data = await api.delete(`/channels/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const addNewReply = async ({
  taskId,
  content,
  files
}) => {

  const token = Cookies.get("token");

  let data = new FormData();
  data.append('message', content);
  
  if(files){
    for (var [key, value] of Object.entries(files)) {
      data.append(`filename[${key}]`, files[key]);
    }
  }

  const reply = await api.post(`/tasks/${taskId}/storeReplies`, data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return reply;
};


export const addNewTask = async ({
  name,
  description,
  user_id,
  client_id,
  type_id,
  group_id,
  area_id,
  dueDate,
  channel_id,
  agent_id,
  status_id,
  files
}) => {

  const token = Cookies.get("token");

  let data = new FormData();
  data.append('name', name);
  data.append('description', description);
  data.append('user_id', user_id);
  data.append('client_id', client_id);
  data.append('type_id', type_id);
  data.append('group_id', group_id);
  data.append('area_id', area_id);
  data.append('dueDate', dueDate);
  data.append('channel_id', channel_id);
  data.append('agent_id', agent_id);
  data.append('status_id', status_id);
  
  if(files){
    for (var [key, value] of Object.entries(files)) {
      data.append(`filename[${key}]`, files[key]);
    }
  }

  const task = await api.post("/tasks", data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return task;
};

export const updateTask = async ({
  id,
  name,
  description,
  user_id,
  client_id,
  type_id,
  group_id,
  area_id,
  dueDate,
  channel_id,
  status_id,
  files
}) => {

  const token = Cookies.get("token");
  
  const client = client_id.value;
  const channel = channel_id.value;
  const type = type_id.value;
  const group = group_id.value;
  const status = status_id.value;
  const area = area_id.value;
  const user = user_id.value;

  console.log(group_id);

  let data = new FormData();
  data.append('name', name);
  data.append('description', description);
  data.append('user_id', user);
  data.append('client_id', client);
  data.append('type_id', type);
  data.append('group_id', group);
  data.append('area_id', area);
  data.append('dueDate', dueDate);
  data.append('channel_id', channel);
  data.append('status_id', status);
  
  if(files){
    for (var [key, value] of Object.entries(files)) {
      data.append(`filename[${key}]`, files[key]);
    }
  }

  const task = await api.post(`/tasks/${id}/update`, data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return task;
};

export const turnTaskInactive = async (id) => {
  const token = Cookies.get("token");

  const task = await api.patch(`/tasks/${id}/turnInactive`,
  {
    status_id: 0
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return task.data;
};

export const turnTaskActive = async (id) => {
  const token = Cookies.get("token");

  const task = await api.patch(`/tasks/${id}/turnActive`, {
    status_id: 1
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return task.data;
};

export const changeTaskStatus = async (taskId, id) => {
  const token = Cookies.get("token");

  const task = await api.patch(`/tasks/${taskId}/changeStatus`, {
    status_id: id
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return task.data;
};



export const deleteTask = async (id) => {
  const token = Cookies.get("token");
  
  const data = await api.delete(`/tasks/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const addNewChannel = async ({
  name,
  description
}) => {
  const token = Cookies.get("token");
  
  const channel = await api.post(
    "/channels",
    {
      name,
      description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return channel;
};

export const forwardTask = async (id, user) => {
  const token = Cookies.get("token");

  const task = await api.patch(
    `/tasks/${id}/forward`,
    {
      user_id: user
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return task.data;
};

export const addNewType = async ({
  name,
  description
}) => {
  const token = Cookies.get("token");

  const type = await api.post(
    "/types",
    {
      name,
      description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return type;
};

export const addNewStatus = async ({
  name,
  description,
  color
}) => {

  const token = Cookies.get("token");
  
  const type = await api.post(
    "/status",
    {
      name,
      description,
      color
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return type;
};

export const addNewGroup = async ({
  name,
  description,
  user_id
}) => {

  const token = Cookies.get("token");
  
  const group = await api.post(
    "/groups",
    {
      name,
      description,
      user_id
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return group;
};

export const updateChannel = async ({
  id,
  name,
  description
}) => {

  const token = Cookies.get("token");
  
  const channel = await api.put(
    `/channels/${id}`,
    {
    name,
    description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return channel;
};

export const updateType = async ({
  id,
  name,
  description
}) => {
  
  const token = Cookies.get("token");

  const type = await api.put(
    `/types/${id}`,
    {
    name,
    description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return type;
};

export const updateGroup = async ({
  id,
  name,
  description
}) => {

   const token = Cookies.get("token");
  
  const group = await api.put(
    `/groups/${id}`,
    {
    name,
    description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return group;
};

export const importExcel = async ({ file }) => {

  const token = Cookies.get("token");

  let data = new FormData();
  data.append('file', file);

  const excel = api.post(`/imports`, data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return excel;
};