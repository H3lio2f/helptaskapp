import Head from "next/head";
import { useEffect, useState } from "react";
import LogComponent from '../../components/LogComponent';
import { useGlobal } from "../../utils/contexts/global";
import Loader from '../../components/LoadingSpinner';
import { fetchAllLogs } from '../../utils/fetchData'

export default function Logs() {

  const {
    refresh
  } = useGlobal();

  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);

  const handleLogs = async () => {
    const logs = await fetchAllLogs();
    setLogs(logs.data);
    setLoading(false);
  }
  
  useEffect(() => {
    handleLogs();
  }, []);

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