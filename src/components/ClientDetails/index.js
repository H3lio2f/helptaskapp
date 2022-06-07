import moment from "moment";
import {  useState, useEffect, Fragment } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { alpha, styled } from '@mui/material/styles';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Container, Options } from "./styles";
import Tasks from "../TaskHorizontalViewer/List";
import FormUpdateClient from "../FormUpdateClient/";
import FormNewTask from "../FormNewTask/";
import CardBase from "../AddCard/CardBase";
import ButtonAdd from "../Buttons/add";
import { useGlobal } from "../../utils/contexts/global";
import Link from 'next/link';

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


const ClientDetails = ({ client, otherInfo }) => {
  const { setShowNewTask, showNewTask, setActionDone, actionDone } = useGlobal();
  const [open, setOpen] = useState(false);

  const handleOpenAddcard = () => {
    setShowNewTask(true);
    setActionDone(!actionDone);
  }

  return (
    <Container className="client-details" >
    <CardBase isShown={showNewTask} setIsShown={setShowNewTask}>
      <FormNewTask client={client} actionDoneFromClient={actionDone}/>
    </CardBase>
    <CardBase isShown={open} setIsShown={setOpen}>
      <FormUpdateClient client={client} />
    </CardBase>
        <div className="options">
          <MenuItem disableRipple>
            <Link href={`/clients/${client.id}/edit`}>
            <a style={{ display: "flex", alignItems: "center"}}>
              <EditIcon />
              Editar
              </a>
            </Link>
          </MenuItem>
        </div>
        <div className="top-detail">

            {client.photo ? (
                <img className="avatar" src={client.photo} />
            ) : (
              <div className="avatar">{`${client.name.charAt(0).toUpperCase()}${client.name.charAt(1).toUpperCase()}`}</div>
            )}

            <div className="info">
              <label>Referência</label>
              <span>{client.reference}</span>
            </div>
            <div className="info">
              <label>Nome Completo</label>
              <span>{client.name}</span>
            </div>
            <div className="info">
              <label>País</label>
              <span>{client.country}</span>
            </div>
            <div className="info">
              <label>Cidade</label>
              <span>{client.city}</span>
            </div>
            <div className="info">
              <label>Endereço</label>
              <span>{client.address}</span>
            </div>
            <div className="info">
              <label>Email Principal</label>
              <span>{client.email1}</span>
            </div>
            <div className="info">
              <label>Email secundário</label>
              <span>{client.email2}</span>
            </div>
            <div className="info">
              <label>Telefone Principal</label>
              <span>{client.phone1}</span>
            </div>
            <div className="info">
              <label>Telefone secundário</label>
              <span>{client.phone2}</span>
            </div>

        </div>
        <div className="history">
          <div className="history-top">
            <label>Histórico de tarefas</label>
            <button onClick={handleOpenAddcard} >Adicionar nova tarefa +</button>
          </div>
          <div className="task-histories">
            <div>
              <label>Em andamento</label>
              <span>{otherInfo.opened_tasks}</span>
            </div>
            <div>
              <label>Fechadas</label>
              <span>{otherInfo.closed_tasks}</span>
            </div>
            {otherInfo.latest_task_date != null && (
            <div>
              <label>Data da Tarefa mais recente</label>
              <p>{moment(otherInfo.latest_task_date).format("DD/MMMM/YYYY HH:MM")}</p>
            </div>
            )}
          </div>
        </div>
          {client.tasks.length > 0 && (
            <div className="tasks">
              <Tasks tasks={client.tasks} />
            </div>
          )}
    </Container>
  );
};

export default ClientDetails;
