import React from 'react';
import Head from "next/head";
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
import { useGlobal } from "../../utils/contexts/global";
import { fetchAllClients } from '../../utils/fetchData';

import useSWR from 'swr';

const ClientComponent = dynamic(() => import("../../components/ClientComponent"));
const Loader = dynamic(() => import("../../components/LoadingSpinner"));

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default function Clients() {
  const { data, error } = useSWR("/api/clients", fetcher);
 /*  const {
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
  }, []); */

  if(error) return <p>Error...</p>;

  return (
    <>
      <Head>
        <title>Helptask - Nossos clientes</title>
        <meta name="description" content="Helptask - Nossos clientes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!data ? (
        <Loader />
      ):(
      <ClientComponent clients={data.data} />
      )}
    </>
  );
}