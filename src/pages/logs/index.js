import Head from "next/head";
import { useEffect, useState } from "react";
import LogComponent from '../../components/LogComponent';
import { useGlobal } from "../../utils/contexts/global";
import api from '../../services/api';
import Loader from '../../components/LoadingSpinner';

export default function Clients({ logs, tasks, users, status, userLogged }) {

  const {
    setUser,
    setUsers,
    setStatus,
    actionDone,
    setFilteredLate
  } = useGlobal();

  const [loading, setLoading] = useState(true);

  const fetchFilteredLate = async () => {
    const filteredLate = tasks.filter(task => task.status_control === "late");
    setFilteredLate(filteredLate.length);
  }

  useEffect(() => {
    setUser(userLogged);
    fetchFilteredLate();
    setUsers(users);
    setStatus(status);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFilteredLate();
  }, [actionDone]);

  return (
    <>
    {loading === true && (
      <Loader />
    )}
      <Head>
        <title>Helptask - Histórico de actividades</title>
        <meta name="description" content="Helptask - Histórico de actividades" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LogComponent logs={logs} />
    </>
  );
}

export async function getServerSideProps(context){
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const { data: logs } = await api.get("/logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {data: tasks} = await api.get('tasks', {
   headers: {
     Authorization: `Bearer ${token}`,
   },
 });
  const { data: user} = await api.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: users } = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: status } = await api.get("/status", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      logs: logs.data,
      tasks: tasks.data,
      users: users.data,
      status: status.data,
      userLogged: user.user
    },
  };
};
