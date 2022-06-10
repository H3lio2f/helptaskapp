import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import ClientDetails from "../../../components/ClientDetails";
import { useGlobal } from "../../../utils/contexts/global";
import { Container } from '../../../styles/pages/clientDetails';
import api from '../../../services/api';

export default function DetailClient({ client, otherInfo}) {
  
  const {
    refresh
  } = useGlobal();

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
        <ClientDetails client={client} otherInfo={otherInfo} />
      </div>
      </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context){
  const { id} = context.params;
  const { token } = context.req.cookies;

  const { data: client } = await api.get(`/clients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {
      client: client.data,
      otherInfo: {
        opened_tasks: client.opened_tasks,
        closed_tasks: client.closed_tasks,
        recent_task_date: client.latest_task_date
      }
    },
  };
};

