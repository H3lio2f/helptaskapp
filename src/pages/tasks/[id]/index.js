import Head from "next/head";
import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback, Fragment } from 'react';
import { parseCookies } from "nookies";
import Layout from "../../../components/Layout";
import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import EditIcon from '@mui/icons-material/Edit';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import { Container } from '../../../styles/pages/taskDetails';
import { useGlobal } from "../../../utils/contexts/global";
import { Box, Button, Divider, FormControl, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";
import Link from 'next/link';
import {
  changeTaskStatus,
  forwardTask,
  turnTaskActive,
  turnTaskInactive
} from "../../../utils/persistData";
import api from '../../../services/api';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import useSWR from 'swr';
import {useRouter} from 'next/router';

const TaskDetails = dynamic(() => import("../../../components/TaskDetails"));
const ReplyDetails = dynamic(() => import("../../../components/ReplyDetails"));
const Loader = dynamic(() => import("../../../components/LoadingSpinner"));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default function DetailTask() {
    const router = useRouter();
    const { data: task, error } = useSWR(`/api/tasks/${router.query.id}`, fetcher, { revalidateOnMount: true});
    const { enqueueSnackbar } = useSnackbar();
    const {
      isOpenForward,
      setIsOpenForward,
      refresh, setRefresh,
    } = useGlobal();
  

    const handleInactive = (id) => {
      turnTaskInactive(id)
        .then(({ message }) => {
          setRefresh(!refresh);
          enqueueSnackbar(message, {
            variant: "success",
          });
        })
        .catch(({ response }) => {
          Swal.fire({
            text: `${
              response.data.message
                ? response.data.message
                : "Erro ao mudar o estado da tarefa"
            }`,
            icon: "warning",
            confirmButtonColor: "var(--primary)",
          });
        });
    };

    const handleActive = (id) => {
      turnTaskActive(id)
        .then(({ message }) => {
          setRefresh(!refresh);
          enqueueSnackbar(message, {
            variant: "success",
          });
        })
        .catch(({ response }) => {
          Swal.fire({
            text: `${
              response.data.message
                ? response.data.message
                : "Erro ao mudar o estado da tarefa"
            }`,
            icon: "warning",
            confirmButtonColor: "var(--primary)",
          });
        });
    };

    const handleForward = () => {
      setLoading(true);
      forwardTask(localStorage.getItem("task_id"), user)
      .then(({ message }) => {
        setLoading(false);
        setRefresh(!refresh);
        setIsOpenForward(false);
        enqueueSnackbar(message, {
          variant: "success",
        });
      })
      .catch(({ response }) => {
        Swal.fire({
          text: `${
            response.data.message
              ? response.data.message
              : "Erro ao reencaminhar a tarefa"
          }`,
          icon: "error",
          confirmButtonColor: "var(--primary)",
        });
      });
    }

    const handleOpenForward = (id) => {
      localStorage.setItem("task_id", id);
      setIsOpenForward(true);
    }

if(error) return <p>Error...</p>;

  return (
    <>
      <Head>
        <title>Helptask | Detalhes</title>
        <meta name="description" content="Helptask - P??gina Incial" />
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