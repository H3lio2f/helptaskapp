import Head from "next/head";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { useGlobal } from "../utils/contexts/global";
import { fetchAllTasks, fetchAllStatus, fetchAllUsers } from '../utils/fetchData'
import api from "../services/api";

const HomeComponent = dynamic(() => import("../components/Home"));
const Loader = dynamic(() => import("../components/LoadingSpinner"));

export default function Home({  tasks, users, status }) {
  
  const {
    refresh,
    setStatus,
    setUsers
  } = useGlobal();

  const [loading, setLoading] = useState(true);
  const [allTasks, setAllTasks] = useState([]);

  const handleTasks = async () => {
    //const tasks = await fetchAllTasks();
    setAllTasks(tasks);
    //const status = await fetchAllStatus();
    setStatus(status);
    //const users = await fetchAllUsers();
    setUsers(users);
    setLoading(false);
  }

  useEffect(() => {
    handleTasks();
  }, []);

  const fetch = async () => {
    const tasks = await fetchAllTasks();
    setAllTasks(tasks.data);
  }

  useEffect(() => {
    fetch();
  }, [refresh]);

  return (
    <>
     {loading === true && (
        <Loader />
      )} 
      <Head>
        <title>Helptask - Minhas Tarefas</title>
        <meta name="description" content="Helptask - Página Incial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeComponent tasks={allTasks} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const { data: tasks } = await api.get("tasks", {
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
    },
  };
}