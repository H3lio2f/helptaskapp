import moment from "moment";
import {  useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import EditIcon from '@mui/icons-material/Edit';
import {  MenuItem, TextField } from '@mui/material';
import { Container } from "./styles";
import { useGlobal } from "../../utils/contexts/global";
import { showClientDetails } from "../../utils/fetchData";
import useSWR from 'swr';

const FormUpdateClient = dynamic(() => import("../FormUpdateClient/"));
const FormNewTask = dynamic(() => import("../FormNewTask/"));
const CardBase = dynamic(() => import("../AddCard/CardBase"));
const Tasks = dynamic(() => import("../TaskHorizontalViewer/List"));

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

const ClientDetails = ({ client, otherInfo }) => {
  const { data: userLogged } = useSWR("/api/userLogged", fetcher, { revalidateOnMount: true});
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
        <div className="options" style={(userLogged?.user.role === "admin" || userLogged?.user.role === "mannager") ? {}: {display: "none"}}>
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
                  label="Nome do cliente"
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
            <div className="view-control"></div>
              {(userLogged?.user.role === "admin" || userLogged?.user.role === "mannager")  && (
                <button onClick={handleOpenAddcard} >Adicionar nova tarefa +</button>
              )}
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
