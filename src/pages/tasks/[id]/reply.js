import Head from "next/head";
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import {Button, Typography } from '@mui/material';
import Layout from "../../../components/Layout";
import { Container } from '../../../styles/pages/taskDetails';
import { useGlobal } from "../../../utils/contexts/global";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import api from '../../../services/api';

const TaskDetails = dynamic(() => import("../../../components/TaskDetails"));
const ReplyDetails = dynamic(() => import("../../../components/ReplyDetails"));



export default function DetailTask({ task }) {
   
  return (
    <>
      <Head>
        <title>Helptask - Respostas</title>
        <meta name="description" content="Helptask - Respostas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <Container>
      <div className="inner-main-container">
        <TaskDetails hideReplyBtn={true} task={task} />
        <ReplyDetails task={task} taskId={task.id} />
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

  return {
    props: {
      task: task.data,
    },
  };
};
