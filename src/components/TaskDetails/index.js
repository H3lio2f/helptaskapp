import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Divider, FormControl, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import moment from "moment";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from "notistack";
import { Fragment, useCallback, useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { useGlobal } from "../../utils/contexts/global";
import { ButtonReply } from "../Buttons/reply";
import Portal from "../Portal/Portal";
import ReplyTask from "../ReplyTask";
import {
  showTaskDetails
} from "./../../utils/fetchData";
import {
  forwardTask,
  turnTaskActive,
  turnTaskInactive
} from "./../../utils/persistData";
import { Container } from "./styles";



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



const TaskDetails = ({ task, hideReplyBtn }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);
  const {  actionDone,
    setActionDone,
    isOpenForward,
    setIsOpenForward,
    refresh, setRefresh,
    showAttribueted,
    users,
    user: userAuthenticated,
    status,
    openReply, setOpenReply } = useGlobal();
  const handleToggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const [optionsUsers, setOptionsUsers] = useState([]);
  const [singleTask, setSingleTask] = useState(task);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSingleTask(task);
  }, []);


  useEffect(() => {
    const fetch = async() => {
      const task = await showTaskDetails(router.query.id);
      setSingleTask(task.data);
    }
    fetch();
  }, [actionDone, refresh])

  useEffect(() => {
    let newSet = new Set();
    users.map((user) => {
      if (userAuthenticated.id === user.id) {
        newSet.add({ label: "(EU)", value: user.id });
      } else {
        newSet.add({ label: user.name, value: user.id });
      }
    });
    setOptionsUsers([...newSet]);
  }, [actionDone]);

  /*Menu Option */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            placeholder="selecione um usuário"
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
      <ReplyTask shadown={true} isShown={openReply} setIsShown={() => setOpenReply(false)} task={task} taskId={router.query.id} />
      <div className="options">
          {!hideReplyBtn && (
            <>
            <MenuItem disableRipple>
              <Link href={`/tasks/${singleTask.id}/reply`} passHref>
                <Button style={{textTransform: 'capitalize', width: "125px"}} variant="outlined" size="small">
                  {singleTask.replies.length > 0 ? (
                      <>
                        <ReplyAllOutlinedIcon size="small"  />
                        <Typography ml={2} variant="h7">Ler({singleTask.replies.length})</Typography>
                      </>
                    ): (
                      <>
                        <ReplyAllOutlinedIcon size="small"  />
                        <Typography ml={2} variant="h7">responder</Typography>
                      </>
                    )}
                </Button>
              </Link>
            </MenuItem>
          
          <MenuItem disableRipple>
            <Link href={`/tasks/${singleTask.id}/edit`}>
            <a style={{ display: "flex", alignItems: "center"}}>
              <EditIcon />
              Editar
              </a>
            </Link>
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
            <label>Assunto: </label>
            <span>{singleTask.name}</span>
        </div>
        <div className="row client">
            <label>Cliente: </label>
            <span>
            <Link href={`/clients/${singleTask.client.id}`}>
              <a>
                {singleTask.client_name}
              </a>
              </Link>
            </span>
        </div>
        <div className="row attr">
            <label>Atribuído a: </label>
            <span className="username">
              {singleTask.user
                ? singleTask.user_name
                : singleTask.agent_id
                ? singleTask.agent
                : singleTask.group
                ? singleTask.group
                : "sem atribuição "}
               {singleTask.user && ` (${moment(singleTask.updated_at).format("DD/MMMM/YYYY HH:MM")})`} 
            </span>
        </div>
        <div className="row type">
            <label>Tipo de tarefa: </label>
            <span>{singleTask.type_name}</span>
        </div>
        <div className="row channel">
            <label>Canal : </label>
            <span>{singleTask.channel_name}</span>
        </div>
        <div className="double_row">
          <div className="row due">
              <label>Prazo: </label>
              <span>{moment(singleTask.dueDate).format("DD/MMMM/YYYY HH:MM")}</span>
          </div>
          <div className="row left_time">
              <label>Tempo em falta: </label>
              <span
                 style={
                  singleTask.remain_percent === 100
                    ? { color: "var(--error)", fontWeight: "bold" }
                    : {}
                }
              >{singleTask.remain_hour} ( {singleTask.remain_percent}% )</span>
          </div>
        </div>
        <div className="row description">
              <label>Descrição: </label>
              <span>{singleTask.description}</span>
          </div>
      </div>
      </Container>
    </>
  );
};

export default TaskDetails;
