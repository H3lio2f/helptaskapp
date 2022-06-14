import Head from "next/head";
import dynamic from 'next/dynamic'
import useSWR from 'swr';

const LogComponent = dynamic(() => import("../../components/LogComponent"));
const Loader = dynamic(() => import("../../components/LoadingSpinner"));
const Error = dynamic(() => import("../../components/Error"));

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}
export default function Logs() {
  const { data, error } = useSWR("/api/logs", fetcher, { revalidateOnMount: true});

  if(error) return <Error />;

  return (
    <>
      <Head>
        <title>Helptask - Histórico de actividades</title>
        <meta name="description" content="Helptask - Histórico de actividades" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!data ? (
        <Loader />
      ):(
      <LogComponent logs={data.data} />
      )}
    </>
  );
}