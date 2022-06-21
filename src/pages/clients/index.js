import React, { useState, useEffect} from 'react';
import Head from "next/head";
import dynamic from 'next/dynamic'
import useSWR from 'swr';
import { useGlobal } from "../../utils/contexts/global";
import { fetchAllClients } from "../../utils/fetchData";
import { pusherConfig, pusher } from "../../helpers/websocket";

const ClientComponent = dynamic(() => import("../../components/ClientComponent"));
const Loader = dynamic(() => import("../../components/LoadingSpinner"));
const Error = dynamic(() => import("../../components/Error"));

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default function Clients() {
  const { refresh } = useGlobal();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleWebsocket = () => {
    const channel = pusher.subscribe('clients');
    channel.bind('all-clients', data => {
      setClients(data.clients.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    handleWebsocket();
  }, []);

  useEffect(() => {
    handleClients();
  }, [refresh]);

  const handleClients = () => {
    fetchAllClients().then(data => {
    handleWebsocket();
    });
  }

  return (
    <>
      <Head>
        <title>Helptask - Nossos clientes</title>
        <meta name="description" content="Helptask - Nossos clientes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && ( <Loader />)}
      <ClientComponent clients={clients} />
    </>
  );
}

