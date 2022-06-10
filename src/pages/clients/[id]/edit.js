import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useGlobal } from "../../../utils/contexts/global";
import { Container } from '../../../styles/pages/taskDetails';
import FormUpdateClient from "../../../components/FormUpdateClient";
import api from '../../../services/api';


export default function EditClient({ client }) {
  const {
    refresh
  } = useGlobal();

  return (
    <>
      <Head>
        <title>Helptask - Eidtar Cliente</title>
        <meta name="description" content="Helptask - Editar Cliente" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <Container>
      <div className="inner-main-container">
        <FormUpdateClient client={client} />
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
      client: client.data
    },
  };
};

