import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Divider, FormControl, IconButton, Menu, MenuItem, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";
import * as React from 'react';
import {useState, useEffect, useMemo} from 'react';
import Select from "react-select";
import { pusherConfig, pusher } from "../../helpers/websocket";
import { useGlobal } from "../../utils/contexts/global";
import useSWR from 'swr';
import {
  changeTaskStatus,
  forwardTask,
  turnTaskActive,
  turnTaskInactive,
  fetchAllUsers
} from "../../utils/persistData";
import {
  fetchUserLogged
} from "../../utils/fetchData";

import Portal from "../Portal/Portal";

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

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default function Row({ row, labelId }) {
  const { data: users } = useSWR("/api/users", fetcher, { revalidateOnMount: true});
  const { data: status } = useSWR("/api/status", fetcher, { revalidateOnMount: true});
  //const { data: tasks } = useSWR(`/api/tasks`, fetcher, { revalidateOnMount: true, revalidateOnInterval: 1000});
  const { data: userLogged } = useSWR("/api/userLogged", fetcher, { revalidateOnInterval: 1000});
 
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    actionDone,
    setActionDone,
    isOpenForward,
    setIsOpenForward,
    refresh, setRefresh,
    user: userAuthenticated
  } = useGlobal();
    
  const [optionsUsers, setOptionsUsers] = React.useState([]);
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  //const late = useMemo( () =>tasks?.data.filter(task => task.id === row.id), [tasks]);
 
  /*Menu Option */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElStatus(null);
  };

  /*Menu Status */
  const [anchorElStatus, setAnchorElStatus] = React.useState(null);
  const openStatus = Boolean(anchorElStatus);
  const handleClickStatus = (event) => {
    setAnchorElStatus(event.currentTarget);
  };

  const fetchUsers = async () => {
    let newSet = new Set();
    const channel = pusher.subscribe('users');
    channel.bind('all-users', data => {
      data.users.map((user) => {
        if (userLogged?.user.id === user.id) {
          newSet.add({ label: "(Eu mesmo)", value: userLogged?.user.id });
        } else {
          newSet.add({ label: user.name, value: user.id });
        }
      });
      setOptionsUsers([...newSet]);
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    handleUsers();
  }, [refresh]);

  const handleUsers = () => {
    fetchAllUsers().then(data => {
      fetchUsers();
    });
  }


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
          setActionDone(!actionDone);
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

    const hendleChange = (id) => {
      changeTaskStatus(row.id, id)
        .then(({ message }) => {
          //setActionDone(!actionDone);
          //setRefresh(!refresh);
          /* enqueueSnackbar(message, {
            variant: "success",
          }); */
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
        //setRefresh(!refresh);
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
    <TableRow
        tabIndex={-1}
        key={row.name}
        style={{ cursor: "pointer"}}
    >
        <TableCell style={row.remain_percent == 100 ? { width: "5px", background: "transparent", borderLeft: "4px solid var(--error)"} : {}} >
        </TableCell>
        <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
        >{row.name}
        </TableCell>
        <TableCell align="left" style={{ color: "var(--primary)"}}>
            {/* <Link href={`clients/${row.client.id}`}>
               {row.client.name}
            </Link> */}
        </TableCell>
        <TableCell align="left">{moment(row.dueDate).format("DD/MM/YYYY")}</TableCell>
        <TableCell align="left">{row.type_name}</TableCell>
        <TableCell align="left">{row.user ? userLogged?.user.id === row.user.id ? "(Eu)" : row.user_name : 'sem atribuição'}</TableCell>
        <TableCell align="left">
        <>
          <Button onClick={handleClickStatus} size="small" variant="outlined" style={{textTransform: 'lowercase', color: `${row.statusColor}`, borderColor: `${row.statusColor}`, width: "120px"}}>
              { row.status_name}
          </Button>
          <StyledMenu
            anchorEl={anchorElStatus}
            id="account-menu"
            open={openStatus}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Typography ml={2} pt={5} variant="h7">Mudar estado para:</Typography>
            <Divider />
            {(userLogged?.user.role === "admin" || userLogged?.user.role === "mannager")  ? (
              <>
                {status?.data.map(statu =>  (
                  <MenuItem style={{ color: `${statu.color}`}} key={statu.id} onClick={() => hendleChange(statu.id)} disableRipple>
                    {statu.name}
                  </MenuItem>
                ))}
              </>
            ) : (
              <>
                 {status?.data.map(statu => statu.id !== 4 &&  (
                  <MenuItem style={{ color: `${statu.color}`}} key={statu.id} onClick={() => hendleChange(statu.id)} disableRipple>
                    {statu.name}
                  </MenuItem>
                ))}
              </>
            )}
           
        </StyledMenu>
        </>
        </TableCell>

        <TableCell align="right">
        {row.active === 1 && (
          [
          <Link href={`tasks/${row.id}`} passHref>
            <Button onClick={() => router.push(`tasks/${row.id}`)} style={{textTransform: 'capitalize', width: "125px"}} variant="outlined" size="small">
              {row.replies.length > 0 ? 
                  [
                    <ReplyAllOutlinedIcon size="small"  />,
                    <Typography ml={2} variant="h7">Ler({row.replies.length})</Typography>
                  ]
                : 
                  [
                    <ReplyAllOutlinedIcon size="small"  />,
                    <Typography ml={2} variant="h7">responder</Typography>
                  ]
                }
            </Button>
          </Link>,
          
            <Button
              style={(userLogged?.user.role === "admin" || userLogged?.user.role === "mannager") ? {textTransform: 'none', marginLeft: "15px"} : {display: "none"}}
              size="small"
              variant="text"
              onClick={() => handleOpenForward(row.id)}
            >
            Atribuir
            </Button>
          
          ]
        )}
        <>
        {(userLogged?.user.role === "admin" || userLogged?.user.role === "mannager") ? (

            <Tooltip title="Opções">
              <IconButton
                  onClick={handleClickOptions}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
              >
                  <SettingsIcon />
              </IconButton>
            </Tooltip>
        ): (

            <Link href={`/tasks/${row.id}`} underline="none" shallow style={(userLogged?.user.role === "admin" || userLogged?.user.role === "mannager")  ? {}: {display: "none"}}>
              <a style={{ marginLeft: "30px"}}>
                <Button
                  size="small"
                  variant="text"
                >
                    <VisibilityIcon style={{ marginRight: "5px"}} />
                    Visualizar
                </Button>
              </a>
            </Link>
        )}

        <StyledMenu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
            elevation: 0,
            sx: {
                overflow: 'visible',
                mt: 1.5,
                '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
                },
                '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                },
            },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {row.active === 1 &&
              [
              <Link href={`/tasks/${row.id}`} underline="none" shallow>
                <a>
                <MenuItem disableRipple>
                    <VisibilityIcon />
                    Visualizar
                </MenuItem>
                </a>
              </Link>
              ]
            }
            {row.active === 1 ? (
              <MenuItem onClick={() => handleInactive(row.id)} disableRipple style={(userLogged?.user.role === "admin" || userLogged?.user.role === "mannager") ? {}: {display: "none"}}>
                <BrowserNotSupportedIcon />
                  Tornar Inactivo
              </MenuItem>
            ) : (
              <MenuItem onClick={() => handleActive(row.id)} disableRipple style={(userLogged?.user.role === "admin" || userLogged?.user.role === "mannager")  ? {}: {display: "none"}}>
                <BrowserNotSupportedIcon />
                Tornar Activa
              </MenuItem>
            )}
            {row.active === 1 &&
              [
              <Divider sx={{ my: 0.5 }} />,
              <MenuItem onClick={() => handleOpenForward(row.id)} disableRipple style={(userLogged?.user.role === "admin" || userLogged?.user.role === "mannager") ? {}: {display: "none"}}>
                <CompareArrowsIcon />
                Atribuir
              </MenuItem>
              ]
            }
        </StyledMenu>
        
        </>
        </TableCell>
    </TableRow>
    </>
    );
}
