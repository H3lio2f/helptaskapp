import BrowserNotSupportedIcon from '@mui/icons-material/BrowserNotSupported';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import EditIcon from '@mui/icons-material/Edit';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Divider, FormControl, IconButton, Menu, MenuItem, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from "notistack";
import * as React from 'react';
import Select from "react-select";
import Swal from "sweetalert2";
import { useGlobal } from "../../utils/contexts/global";
import {
  changeTaskStatus,
  forwardTask,
  turnTaskActive,
  turnTaskInactive
} from "../../utils/persistData";
import {
  fetchAllStatus
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

export default function Row({ row, labelId }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    actionDone,
    setActionDone,
    isOpenForward,
    setIsOpenForward,
    refresh, setRefresh,
    users,
    user: userAuthenticated,
    status,
    setStatus
  } = useGlobal();
  const [user, setUser] = React.useState('');

  const fetchStatus = async () => {
    const { data} = await fetchAllStatus();
    setStatus(data);
  }

  React.useEffect(() => {
    fetchStatus();
  }, []);

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

  const [optionsUsers, setOptionsUsers] = React.useState([]);

  React.useEffect(() => {
    let newSet = new Set();
    users.map((user) => {
      if (userAuthenticated.id === user.id) {
        newSet.add({ label: "(EU)", value: user.id });
      } else {
        newSet.add({ label: user.name, value: user.id });
      }
    });
    setOptionsUsers([...newSet]);
  }, []);

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

    const hendleChange = (id) => {
      changeTaskStatus(row.id, id)
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

    const [loading, setLoading] = React.useState(false);

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
        //hover
        //onClick={() => router.push(`tasks/${row.id}`)}
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
        >
        {row.name}
        </TableCell>
        <TableCell align="left" style={{ color: "var(--primary)"}}>
            <Link href={`clients/${row.client.id}`}>
               {row.client.name}
            </Link>
        </TableCell>
        <TableCell align="left">{moment(row.dueDate).format("DD/MM/YYYY")}</TableCell>
        <TableCell align="left">{row.type.name}</TableCell>
        <TableCell align="left">{userAuthenticated.id === row.user?.id ? "(Eu)" : row.user_name}</TableCell>
        <TableCell align="left">
        <>
          <Button onClick={handleClickStatus} size="small" variant="outlined" style={{textTransform: 'lowercase', color: `${row.statusColor}`, borderColor: `${row.statusColor}`, width: "120px"}}>
              {row.status.name}
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
            {status.map(statu =>  (
              <MenuItem style={{ color: `${statu.color}`}} key={statu.id} onClick={() => hendleChange(statu.id)} disableRipple>
                {statu.name}
              </MenuItem>
            ))}
        </StyledMenu>
        </>
        </TableCell>

        <TableCell align="right">
        {row.active === 1 && (
          [
          <Link href={`tasks/${row.id}/reply`} passHref>
            <Button onClick={() => router.push(`tasks/${row.id}/reply`)} style={{textTransform: 'capitalize', width: "125px"}} variant="outlined" size="small">
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
          style={{textTransform: 'none', marginLeft: "15px"}}
          size="small"
          variant="text"
          onClick={() => handleOpenForward(row.id)}
          >
          Atribuir
          </Button>
          ]
        )}
        <>
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
              <Link href={`/tasks/${row.id}/edit`} underline="none" shallow>
                <a>
                <MenuItem disableRipple>
                  <EditIcon />
                  Editar
                </MenuItem>
                </a>
              </Link>,
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
              <MenuItem onClick={() => handleInactive(row.id)} disableRipple>
                <BrowserNotSupportedIcon />
                  Tornar Inactivo
              </MenuItem>
            ) : (
              <MenuItem onClick={() => handleActive(row.id)} disableRipple>
                <BrowserNotSupportedIcon />
                Tornar Activa
              </MenuItem>
            )}
            {row.active === 1 &&
              [
              <Divider sx={{ my: 0.5 }} />,
              <MenuItem onClick={() => handleOpenForward(row.id)} disableRipple>
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