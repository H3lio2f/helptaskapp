import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, FormControl, Menu, MenuItem, Typography, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import moment from "moment";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from "notistack";
import {  useCallback, useEffect, useState } from "react";
import Select from "react-select";
import dynamic from 'next/dynamic';
import Swal from "sweetalert2";
import { useGlobal } from "../../utils/contexts/global";
import Portal from "../Portal/Portal";
import ReplyTask from "../ReplyTask";
import {
  showTaskDetails,
  fetchAllUsers,
  fetchUserLogged
} from "./../../utils/fetchData";
import {
  forwardTask,
  turnTaskActive,
  turnTaskInactive
} from "./../../utils/persistData";
import { Container } from "./styles";
import CardBase from "../AddCard/CardBase";

const FormUpdateTask = dynamic( () => import('../FormUpdateTask/'));

const customStyles = {
  control: (styles, { isDisabled} ) => ({
    ...styles,
    backgroundColor: isDisabled ? "var(--gray-2)" : "white",
    cursor: isDisabled ? 'not-allowed' : 'default',
    marginTop: "-15px",
    border: "1px solid var(--text-color)",
    fontSize: "var(--font-size-7)",
  }),
  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      color: "var(--text-color)",
      cursor: isDisabled ? 'not-allowed' : 'default',
      fontSize: "var(--font-size-7)",
    };
  },
};


const TaskDetails = ({ task, hideReplyBtn }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {  actionDone,
    setActionDone,
    isOpenForward,
    setIsOpenForward,
    refresh, setRefresh,
    openReply, setOpenReply,
    showUpdateTask, setShowUpdateTask
   } = useGlobal();
  const [optionsUsers, setOptionsUsers] = useState([]);
  const [singleTask, setSingleTask] = useState(task);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLogged, setUserLogged] = useState();

  useEffect(() => {
    handleUserLogged();
    setSingleTask(task);
  }, []);

  const handleUserLogged = async () => {
    const user = await fetchUserLogged();
    setUserLogged(user.user);
  }
  const handleTask = async () => {
    const tasks = await showTaskDetails(task.id);
    setSingleTask(tasks.data);
  }

  useEffect(() => {
    handleTask();
    handleUserLogged();
  }, [refresh])

  useEffect(() => {
    fetchAllUsers().then((data) => {
      setUsers(data.data);
    });
    let newSet = new Set();
    users.map((user) => {
      if (userLogged.id === user.id) {
        newSet.add({ label: "(Eu mesmo)", value: userLogged.id });
      } else {
        newSet.add({ label: user.name, value: user.id });
      }
    });
    setOptionsUsers([...newSet]);
  }, []);

  const handleInactive = (id) => {
    turnTaskInactive(id)
      .then(({ message }) => {
        setActionDone(!actionDone);
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
        setActionDone(!actionDone);
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
    setActionDone(!actionDone);
    localStorage.setItem("task_id", id);
    setIsOpenForward(true);
  }

  return (
    <>
      <Portal isOpen={isOpenForward} setIsOpen={setIsOpenForward}>
        <label>Atribuir tarefa a: </label>
        <Box sx={{ minWidth: 120 }}  mt={5} mb={15}>
          <Select
            styles={customStyles}
            placeholder="selecione um utilizador"
            isClearable
            isSearchable
            id="user_id"
            instanceId="user_id"
            options={optionsUsers}
            onChange={(option) => {
              if (option) {
                setUser(option.value);
              } else {
                setUser("");
              }
            }}
          />
          <FormControl
          style={{ marginTop: "30px", float: "right"}} mt={2}>
            <Button disabled={loading} onClick={() => handleForward()} style={{ background: "var(--primary)"}} variant="contained">{loading ? 'A atribuir...' : 'Confirmar'}</Button>
          </FormControl>
        </Box>
      </Portal>
      <CardBase isShown={showUpdateTask} setIsShown={() => setShowUpdateTask(false)}>
        <FormUpdateTask task={singleTask} />
      </CardBase>
      <div className="options">
          {!hideReplyBtn && (
            <>          
          <MenuItem disableRipple onClick={ () => setShowUpdateTask(true)}>
              <EditIcon />
              Editar
          </MenuItem>
          {singleTask.active === 1 ? (
              <MenuItem onClick={() => handleInactive(singleTask.id)} disableRipple>
                <BrowserNotSupportedIcon />
                  Tornar Inactivo
              </MenuItem>
            ) : (
              <MenuItem onClick={() => handleActive(singleTask.id)} disableRipple>
                <BrowserNotSupportedIcon />
                Tornar Activa
              </MenuItem>
            )}
          <MenuItem onClick={() => handleOpenForward(singleTask.id)} disableRipple>
            <CompareArrowsIcon />
            Atribuir
            </MenuItem>
            </>
          )}
      </div>
      <Container
        className="task-details"
        statusColor={singleTask.statusColor.toLowerCase()}
        percent={singleTask.remain_percent}
      >
        <div className="all-info">
          <div className="row subjemect">
              <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Assunto"
                value={singleTask.name}
                InputProps={{
                  readOnly: true,
                }}
              /> 
          </div>
          <div className="row client">
              <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Cliente"
                value={singleTask.client_name}
                InputProps={{
                  readOnly: true,
                }}
              />
          </div>
        <div className="row attr">
            <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Atribuído a:"
                value={singleTask.user ? singleTask.user_name : 'sem atribuição'}
                InputProps={{
                  readOnly: true,
                }}
              />
            {/* <span className="username">
              {singleTask.user
                ? singleTask.user_name
                : singleTask.agent_id
                ? singleTask.agent
                : singleTask.group
                ? singleTask.group
                : "sem atribuição "}
               {singleTask.user && ` (${moment(singleTask.updated_at).format("DD/MMMM/YYYY HH:MM")})`} 
            </span> */}
        </div>
        <div className="row group">
            <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Grupo"
                value={singleTask.group_name}
                InputProps={{
                  readOnly: true,
                }}
              />
        </div>
        <div className="row area">
            <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Área"
                value={singleTask.area.name}
                InputProps={{
                  readOnly: true,
                }}
              />
        </div>
        <div className="row channel">
            <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Canal de recepção"
                value={singleTask.channel_name}
                InputProps={{
                  readOnly: true,
                }}
              />
        </div>
        <div className="row status">
            <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Estado da tarefa"
                value={singleTask.status_name}
                InputProps={{
                  readOnly: true,
                }}
              />
        </div>
        <div className="row type">
            <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Tipo de tarefa"
                value={singleTask.type_name}
                InputProps={{
                  readOnly: true,
                }}
              />
        </div>
        <div className="row channel">
            <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Canal de recepção"
                value={singleTask.channel_name}
                InputProps={{
                  readOnly: true,
                }}
              />
        </div>
        <div className="row due">
              <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Data da criação"
                value={moment(singleTask.created_at).format("DD/MMMM/YYYY HH:MM")}
                InputProps={{
                  readOnly: true,
                }}
              />
          </div>
          <div className="row due">
              <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Prazo de conclusão"
                value={moment(singleTask.dueDate).format("DD/MMMM/YYYY HH:MM")}
                InputProps={{
                  readOnly: true,
                }}
              />
          </div>
          <div className="row left_time">
              <TextField
                fullWidth
                id="outlined-read-only-input"
                label="Tempo em falta:"
                error={singleTask.remain_percent === 100}
                value={`${singleTask.remain_hour} ( ${singleTask.remain_percent}% )`}
                InputProps={{
                  readOnly: true,
                }}
              />
          </div>
       
        <div className="row description">
              <TextField
                fullWidth
                multiline
                rows={4}
                style={{
                  grid: '1/3',
                  flex: 1
                }}
                id="outlined-read-only-input"
                label="Descrição:"
                value={singleTask.description}
                InputProps={{
                  readOnly: true,
                }}
              />
          </div>
      </div>
      </Container>
    </>
  );
};

export default TaskDetails;
