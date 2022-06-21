import Head from "next/head";
import dynamic from 'next/dynamic';
import React, { useState, useEffect} from 'react';
import { useGlobal } from "../utils/contexts/global";
import { fetchAllTasks } from "../utils/fetchData";
import { pusherConfig, pusher } from "../helpers/websocket";

const HomeComponent = dynamic(() => import("../components/Home"));
const Loader = dynamic(() => import("../components/LoadingSpinner"));
const Error = dynamic(() => import("../components/Error"));

export default function Home() {
  const { refresh } = useGlobal();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleWebsocket = () => {
    const channel = pusher.subscribe('tasks');
    channel.bind('all-tasks', data => {
      setTasks(data.tasks.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    handleWebsocket();
  }, []);

  useEffect(() => {
    handleTasks();
  }, [refresh]);

  const handleTasks = () => {
    fetchAllTasks().then(data => {
    handleWebsocket();
    });
  }


  return (
    <>
      <Head>
        <title>Helptask - Minhas Tarefas</title>
        <meta name="description" content="Helptask - Página Incial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && ( <Loader />)}
      <HomeComponent tasks={tasks} />
      
    </>
  );
}
