import Head from "next/head";
import dynamic from 'next/dynamic';
import useSWR from 'swr';

const HomeComponent = dynamic(() => import("../components/Home"));
const Loader = dynamic(() => import("../components/LoadingSpinner"));

async function fetcher(url) {
    const res = await fetch(url);
    return res.json();
}

export default function Home() {
   const { data, error } = useSWR("/api/tasks", fetcher);
  

  if(error) return <p>Error...</p>;


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


/* import axios from 'axios';
export function getStaticProps(context){
  
  axios.get("http://localhost:3000/api/tasks").then(({data} )=> {
    console.log(data.json());
  });
  
  return {
    props: {
      tasks: []
    }
  }
}
 */
