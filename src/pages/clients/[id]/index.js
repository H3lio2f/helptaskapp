import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useGlobal } from "../../../utils/contexts/global";
import { Container } from '../../../styles/pages/clientDetails';
import dynamic from 'next/dynamic';
import api from '../../../services/api';
<<<<<<< HEAD
import { showClientDetails } from "../../../utils/fetchData";
=======
import useSWR from 'swr';
import {useRouter} from 'next/router';
>>>>>>> deda98b53046292b24b39a46c61abd9695b44f9a

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

  const [singleClient, setSingleClient] = useState({});

  useEffect(() => {
    setSingleClient(client);
  }, [])

  useEffect(() => {
    showClientDetails(client.id).then(data => {
      setSingleClient(data.data);
      console.log(data.data);
    })
  }, [refresh])

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
<<<<<<< HEAD
        <ClientDetails client={singleClient} otherInfo={otherInfo} />
=======
      {!client ? (
        <Loader />
      ):(
        <ClientDetails client={client?.data} otherInfo={otherInfo} />
      )} 
>>>>>>> deda98b53046292b24b39a46c61abd9695b44f9a
      </div>
      </Container>
      </Layout>
    </>
  );
}
