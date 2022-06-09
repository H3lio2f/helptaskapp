import Head from "next/head";
import { parseCookies } from "nookies";
import Layout from "../../../components/Layout";
import ClientDetails from "../../../components/ClientDetails";
import { Container } from '../../../styles/pages/clientDetails';


export default function DetailClient({ client, otherInfo }) {
  return (
    <>
      <Head>
        <title>Helptask - Página Incial</title>
        <meta name="description" content="Helptask - Página Incial" />
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

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const apiClient = getAPIClient(ctx);
  const { token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const { data: client } = await apiClient.get(`/clients/${id}`);

  return {
    props: {
      client: client.data,
      otherInfo: {
        opened_tasks: client.opened_tasks,
        closed_tasks: client.closed_tasks,
        recent_task_date: client.latest_task_date?.created_at ?? null
      }
    },
  };
};

