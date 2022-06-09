import Head from "next/head";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { useGlobal } from "../utils/contexts/global";
import api from "../services/api";
import tasks from "../../tasks.json";

import HomeComponent from '../components/Home';
//const HomeComponent = dynamic(() => import("../components/Home"));
const Loader = dynamic(() => import("../components/LoadingSpinner"));

export default function Home(/* { tasks, users, status, userLogged } */) {
  /* const { setUser, setUsers, setStatus, actionDone, setFilteredLate, refresh, setTasks } =
    useGlobal();

  const [loading, setLoading] = useState(true);

  const fetchFilteredLate = async () => {
    const filteredLate = tasks.filter((task) => task.status_control === "late");
    setFilteredLate(filteredLate.length);
  };

  useEffect(() => {
    setUser(userLogged);
    fetchFilteredLate();
    setUsers(users);
    setStatus(status);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFilteredLate();
  }, [actionDone]); */

  return (
    <>
    {/* {loading === true && (
      <Loader />
    )} */}
      <Head>
        <title>Helptask - Minhas Tarefas</title>
        <meta name="description" content="Helptask - Página Incial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeComponent tasks={tasks.tasks} />
    </>
  );
}
/* 
export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const { data: tasks } = await api.get("tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: user } = await api.get("/user/me", {
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
      tasks: tasks.data,
      users: users.data,
      status: status.data,
      userLogged: user.user,
    },
  };
}
 */