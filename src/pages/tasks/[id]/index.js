import Head from "next/head";
import dynamic from 'next/dynamic';
import Layout from "../../../components/Layout";
import { Container } from '../../../styles/pages/taskDetails';
import { useGlobal } from "../../../utils/contexts/global";
import {  Button, Typography } from '@mui/material';
import Link from 'next/link';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import useSWR from 'swr';
import {useRouter} from 'next/router';

const TaskDetails = dynamic(() => import("../../../components/TaskDetails"));
const ReplyDetails = dynamic(() => import("../../../components/ReplyDetails"));
const Loader = dynamic(() => import("../../../components/LoadingSpinner"));
const Error = dynamic(() => import("../../../components/Error"));

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default function DetailTask() {
    const router = useRouter();
    const { data: task, error } = useSWR(`/api/tasks/${router.query.id}`, fetcher, { revalidateOnMount: true});
    const {
      refresh, setRefresh,
    } = useGlobal();

    if(error) return <Error />;

  return (
    <>
      <Head>
        <title>Helptask | Detalhes</title>
        <meta name="description" content="Helptask - Página Incial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <Container>
      <div className="inner-main-container">
      {!task ? (
          <Loader />
        ):(
          <>
          <TaskDetails hideReplyBtn={false} task={task.data} />
          <div className="attaches" style={task.data.files.length > 0 ? {} : { display: 'none'}}>
            <label>Anexos da tarefa ({task.data.files.length})</label>
            <div className="list">
              {task.data?.files && task.data?.files.map((file, index) => (
                <Link key={index} href={file} passHref>
                  <a target="_blank">
                  <Button  style={{textTransform: 'capitalize', marginRight: '10px', padding: "5px"}} variant="outlined" size="small">
                    <AttachFileOutlinedIcon size="small"  />
                    <Typography variant="h7">anexo {index + 1}</Typography>
                  </Button>
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <ReplyDetails task={task.data} taskId={task.data.id} />
          </>
        )} 
        </div>
      </Container>
      </Layout>
    </>
  );
}