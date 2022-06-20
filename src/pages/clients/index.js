import React, { useState, useEffect} from 'react';
import Head from "next/head";
import dynamic from 'next/dynamic'
import useSWR from 'swr';
import { useGlobal } from "../../utils/contexts/global";
import { fetchAllClients } from "../../utils/fetchData";
import Pusher from 'pusher-js';

const pusherConfig = {
  cluster: 'mt1',
  wsHost: '127.0.0.1',
  wsPort: '6001',
  encrypted:false,
  enabledTransports: ['ws'],
  forceTLS: false
};

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
    Pusher.logToConsole = true
    const pusher = new Pusher('ABCDEFG', pusherConfig);

    const channel = pusher.subscribe('clients');
    channel.bind('all-clients', data => {
      setClients(data.clients);
      setLoading(false);
    });
  }

  useEffect(() => {
    handleWebsocket();
  }, []);

  useEffect(() => {
    handleTypes();
  }, [refresh]);

  const handleTypes = () => {
    fetchAllClients().then(data => {
    setClients(data.data);
    setLoading(false);
    });
  }

  return (
    <>
      <Head>
        <title>Helptask - Nossos clientes</title>
        <meta name="description" content="Helptask - Nossos clientes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClientComponent clients={clients} />
      
    </>
  );
}

