import React from 'react';
import Head from "next/head";
import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
import { useGlobal } from "../../utils/contexts/global";
import api from '../../services/api';

const ClientComponent = dynamic(() => import("../../components/ClientComponent"));
const Loader = dynamic(() => import("../../components/LoadingSpinner"));

export default function Clients({ clients, tasks, users, status, userLogged }) {

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
    setStatus(status);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFilteredLate();
  }, [actionDone]);

  return (
    <>
    {loading === true && (
      <Loader />
    )}
      <Head>
        <title>Helptask - Nossos clientes</title>
        <meta name="description" content="Helptask - Nossos clientes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClientComponent clients={clients} />
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

  const { data: clients } = await api.get("/clients", {
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
      clients: clients.data,
      tasks: tasks.data,
      users: users.data,
      status: status.data,
      userLogged: user.user
    },
  };
};
