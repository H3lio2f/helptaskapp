import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useGlobal } from "../../../utils/contexts/global";
import { Container } from '../../../styles/pages/clientDetails';
import dynamic from 'next/dynamic';
import api from '../../../services/api';
import useSWR from 'swr';
import {useRouter} from 'next/router';

const Loader = dynamic(() => import("../../../components/LoadingSpinner"));
const ClientDetails = dynamic(() => import("../../../components/ClientDetails"));


async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default function DetailClient() {
  const router = useRouter();
  const { data: client, error } = useSWR(`/api/clients/${router.query.id}`, fetcher, { revalidateOnMount: true});
  
  const otherInfo = {
    opened_tasks: client?.opened_tasks,
    closed_tasks: client?.closed_tasks,
    recent_task_date: client?.latest_task_date
  }

  if(error) return <p>Error...</p>;

  return (
    <>
      <Head>
        <title>Helptask - Detalhes do cliente</title>
        <meta name="description" content="Helptask - Detalhes do cliente" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <Container>
      <div className="inner-main-container">
      {!client ? (
        <Loader />
      ):(
        <ClientDetails client={client?.data} otherInfo={otherInfo} />
      )} 
      </div>
      </Container>
      </Layout>
    </>
  );
}
