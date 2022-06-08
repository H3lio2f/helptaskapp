import {Suspense} from 'react';
import Head from "next/head";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { useGlobal } from "../utils/contexts/global";
import { fetchAllTasks } from '../utils/fetchData'

const ClientComponent = dynamic(() => import("../components/ClientComponent"));
const HomeComponent = dynamic(() => import("../components/Home"));
const Loader = dynamic(() => import("../components/LoadingSpinner"));

export default function Home() {
  
  const {
    refresh
  } = useGlobal();

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const handleTasks = async () => {
    const tasks = await fetchAllTasks();
    setTasks(tasks.data);
    setLoading(false);
  }

  useEffect(() => {
    handleTasks();
  }, []);

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
      <HomeComponent tasks={tasks} />
    </>
  );
}
