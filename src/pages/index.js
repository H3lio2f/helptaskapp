import Head from "next/head";
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { useMemo} from 'react';

const HomeComponent = dynamic(() => import("../components/Home"));
const Loader = dynamic(() => import("../components/LoadingSpinner"));
const Error = dynamic(() => import("../components/Error"));

async function fetcher(url) {
    const res = await fetch(url);
    return res.json();
}

export default function Home({ tasks}) {
  const { data, error } = useSWR("/api/tasks", fetcher, { revalidateOnMount: true, initialData: tasks});
  
  if(error) return <Error />;

  
  /* const allTasks = useMemo( () =>data?.data.filter(task => task.status_control === "waiting"), [tasks]);
 */

  return (
    <>
      <Head>
        <title>Helptask - Minhas Tarefas</title>
        <meta name="description" content="Helptask - Página Incial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!data ? (
        <Loader />
      ):(
      <HomeComponent tasks={data.data} />
      )} 
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      tasks: []
    }, // will be passed to the page component as props
  }
}