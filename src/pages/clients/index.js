import React from 'react';
import Head from "next/head";
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
import { useGlobal } from "../../utils/contexts/global";
import { fetchAllClients } from '../../utils/fetchData'

const ClientComponent = dynamic(() => import("../../components/ClientComponent"));
const Loader = dynamic(() => import("../../components/LoadingSpinner"));

export default function Clients() {
  const {
    refresh
  } = useGlobal();

  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);

  const handleClients = async () => {
    const clients = await fetchAllClients();
    setClients(clients.data);
    setLoading(false);
  }
  
  useEffect(() => {
    handleClients();
  }, []);

  return (
    <>
    {loading && (
      <Loader />
    )}
      <Head>
        <title>Helptask - Nossos clientes</title>
        <meta name="description" content="Helptask - Nossos clientes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClientComponent clients={clients} />
    </>
  );
}