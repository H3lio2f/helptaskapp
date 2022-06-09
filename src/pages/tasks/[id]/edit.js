import Head from "next/head";
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { parseCookies } from "nookies";
import Layout from "../../../components/Layout";
import { Container } from '../../../styles/pages/taskDetails';
import { useGlobal } from "../../../utils/contexts/global";

import api from '../../../services/api';

const FormUpdateTask = dynamic(() => import("../../../components/FormUpdateTask"));


export default function EditTask({ task, tasks,
  users,
  status,
  groups,
  types,
  userLogged 
}) {

  const {
      setUser,
      setUsers,
      setStatus,
      setGroups,
      setTypes,
      actionDone,
      refresh,
      setFilteredLate,
    } = useGlobal();

    const fetchFilteredLate = async () => {
      const filteredLate = tasks.filter(task => task.status_control === "late");
      setFilteredLate(filteredLate.length);
    }
  
    useEffect(() => {
      setUser(userLogged);
      fetchFilteredLate();
      setUsers(users);
      setStatus(status);
      setGroups(groups);
      setTypes(types);
    }, []);
  
    useEffect(() => {
      fetchFilteredLate();
    }, [actionDone, refresh]);
    
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

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const { data: task } = await api.get(`/tasks/${context.params.id}`, {
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
  const { data: status } = await api.get("/status", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  return {
    props: {
      task: task.data,
      tasks: tasks.data,
      users: users.data,
      status: status.data,
      userLogged: user.user
    },
  };
};

