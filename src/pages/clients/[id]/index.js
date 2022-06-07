import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import ClientDetails from "../../../components/ClientDetails";
import { useGlobal } from "../../../utils/contexts/global";
import { Container } from '../../../styles/pages/clientDetails';
import api from '../../../services/api';

export default function DetailClient({ client, otherInfo,  tasks, users, status, userLogged }) {
  
  const {
    setUser,
    setUsers,
    setStatus,
    actionDone,
    setFilteredLate
  } = useGlobal();

  const [loading, setLoading] = useState(true);


  const fetchFilteredLate = async () => {
    const filteredLate = tasks.filter(task => task.status_control === "late");
    setFilteredLate(filteredLate.length);
  }

  useEffect(() => {
    setUser(userLogged);
    fetchFilteredLate();
    setUsers(users);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFilteredLate();
  }, [actionDone]);

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

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const { data: client } = await api.get(`/clients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const {data: tasks} = await api.get('tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: user} = await api.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: users } = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      client: client.data,
      otherInfo: {
        opened_tasks: client.opened_tasks,
        closed_tasks: client.closed_tasks,
        recent_task_date: client.latest_task_date
      },
      tasks: tasks.data,
      users: users.data,
      userLogged: user.user
    },
  };
};

