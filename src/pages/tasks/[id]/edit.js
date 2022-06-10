import Head from "next/head";
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { parseCookies } from "nookies";
import Layout from "../../../components/Layout";
import { Container } from '../../../styles/pages/taskDetails';
import { useGlobal } from "../../../utils/contexts/global";

import api from '../../../services/api';

const FormUpdateTask = dynamic(() => import("../../../components/FormUpdateTask"));


export default function EditTask({ task}) {

  const {
      refresh
    } = useGlobal();
    
  return (
    <>
      <Head>
        <title>Helptask | Editar</title>
        <meta name="description" content="Helptask - Página Incial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <Container>
      <div className="inner-main-container">
        <FormUpdateTask task={task} />
      </div>
      </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context){
  const { token } = context.req.cookies;

  const { data: task } = await api.get(`/tasks/${context.params.id}`, {
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
      task: task.data
    },
  };
};

