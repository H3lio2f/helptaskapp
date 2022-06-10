import React from 'react';
import Head from "next/head";
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
import { useGlobal } from "../../utils/contexts/global";
import { fetchAllClients } from '../../utils/fetchData'
import api from "../../services/api";

const ClientComponent = dynamic(() => import("../../components/ClientComponent"));
const Loader = dynamic(() => import("../../components/LoadingSpinner"));

export default function Clients({ clients }) {
  const {
    refresh
  } = useGlobal();

  const [loading, setLoading] = useState(true);
  const [allClients, setAllClients] = useState([]);

  const handleClients = async () => {
    //const clients = await fetchAllClients();
    setAllClients(clients);
    setLoading(false);
  }
  
  useEffect(() => {
    handleClients();
  }, []);

  const fetch = async () => {
    const clients = await fetchAllClients();
    setAllClients(clients.data);
  }

  useEffect(() => {
    fetch();
  }, [refresh]);


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
      <ClientComponent clients={allClients} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const { data: clients } = await api.get("/clients", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      clients: clients.data,
    },
  };
}