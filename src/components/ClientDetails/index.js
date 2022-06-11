import moment from "moment";
import {  useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { alpha, styled } from '@mui/material/styles';
import {  Menu, MenuItem, TextField } from '@mui/material';
import { Container } from "./styles";
import Tasks from "../TaskHorizontalViewer/List";
import FormUpdateClient from "../FormUpdateClient/";
import FormNewTask from "../FormNewTask/";
import CardBase from "../AddCard/CardBase";
import { useGlobal } from "../../utils/contexts/global";
import { showClientDetails } from "../../utils/fetchData";

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
  const { setShowNewTask, showNewTask, showUpdateClient, setShowUpdateClient, setActionDone, actionDone, refresh } = useGlobal();
  const [singleClient, setSingleClient] = useState(client);

  const handleOpenAddcard = () => {
    setShowNewTask(true);
    setActionDone(!actionDone);
  }
  useEffect(() => {
    setSingleClient(client);
  }, [])

  const handleClient = async () => {
    const clients = await showClientDetails(client.id);
    setSingleClient(clients.data);
  }

  useEffect(() => {
    handleClient();
  }, [refresh])

  return (
    <Container className="client-details" >
    <CardBase isShown={showNewTask} setIsShown={setShowNewTask}>
      <FormNewTask client={singleClient} actionDoneFromClient={actionDone}/>
    </CardBase>
    <CardBase isShown={showUpdateClient} setIsShown={() => setShowUpdateClient(false)}>
      <FormUpdateClient client={singleClient} />
    </CardBase>
        <div className="options">
          <MenuItem disableRipple onClick={ () => setShowUpdateClient(true)}>
            <EditIcon />
            Editar
          </MenuItem>
        </div>
        <div className="top-detail">
            <div className="photo">
              {!singleClient.photo === null ? (
                  <img className="avatar" src={singleClient.photo} />
              ) : (
                <div className="avatar">{`${singleClient?.name?.charAt(0).toUpperCase()}${singleClient.name?.charAt(1).toUpperCase()}`}</div>
              )}
            </div>
            <div className="list-info">
              
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Referência"
                  value={singleClient.reference}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Nome do singleCliente"
                  value={singleClient.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
              <TextField
                fullWidth
                  id="outlined-read-only-input"
                  label="País"
                  value={singleClient.country}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Cidade"
                  value={singleClient.city}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
              <TextField
                fullWidth
                  id="outlined-read-only-input"
                  label="Endereço"
                  value={singleClient.address}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Email Principal"
                  value={singleClient.email1}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Email alternativo"
                  value={singleClient.email2}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Telefone principal"
                  value={singleClient.phone1}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Telefone alternativo"
                  value={singleClient.phone2}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              
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
          {singleClient.tasks.length > 0 && (
            <div className="tasks">
              <Tasks tasks={singleClient.tasks} />
            </div>
          )}
    </Container>
  );
};

export default ClientDetails;
