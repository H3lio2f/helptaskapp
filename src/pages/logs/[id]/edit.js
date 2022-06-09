import Head from "next/head";
import { parseCookies } from "nookies";
import Layout from "../../../components/Layout";
import { getAPIClient } from "../../../services/axios";
import { Container } from '../../../styles/pages/taskDetails';
import FormUpdateClient from "../../../components/FormUpdateClient";


export default function EditClient({ client }) {
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
    },
  };
};

