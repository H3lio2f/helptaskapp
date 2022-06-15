import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from "react";
import { Container as List } from "../../../styles/addCard";
import { useGlobal } from "../../../utils/contexts/global";
import { fetchAllLogs } from "../../../utils/fetchData";
import CardBase from "../CardBase";
import Item from "./Item";
import { Container } from "./styles";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

export default function TaskHistoric({ task }) {

  const {
    showHistoricTask, setShowHistoricTask,
    actionDone,
    isOpenUser,
    setIsOpenUser,
  } = useGlobal();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLog = async () => {
    const logs = await fetchAllLogs();
    const filtered = logs.data.filter((log) => log.task_id === task.id);
    console.log(filtered);
    setUsers(filtered);
    setLoading(false);
  }

  useEffect(() => {
    handleLog();
  }, [actionDone]);

  useEffect(() => {
    handleLog();
  }, []);

  return (
    <CardBase isShown={showHistoricTask} setIsShown={setShowHistoricTask}>
      <Container>
        <div className="config-task-top">
          <div className="label">
            <ManageHistoryIcon style={{color: "var(--primary)"}} />

            <span>Histórico da tarefa</span>
          </div>
          <svg
            width="15"
            height="15"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setShowHistoricTask(false)}
          >
            <path
              d="M16.8749 0.903632C16.3874 0.4185 15.5999 0.4185 15.1124 0.903632L8.9999 6.97399L2.8874 0.891192C2.3999 0.406061 1.6124 0.406061 1.1249 0.891192C0.637402 1.37632 0.637402 2.16 1.1249 2.64513L7.2374 8.72793L1.1249 14.8107C0.637402 15.2959 0.637402 16.0795 1.1249 16.5647C1.6124 17.0498 2.3999 17.0498 2.8874 16.5647L8.9999 10.4819L15.1124 16.5647C15.5999 17.0498 16.3874 17.0498 16.8749 16.5647C17.3624 16.0795 17.3624 15.2959 16.8749 14.8107L10.7624 8.72793L16.8749 2.64513C17.3499 2.17244 17.3499 1.37632 16.8749 0.903632Z"
              fill="#636E72"
            />
          </svg>
        </div>
        <List>
          <div className="form-group first-group">
            <div className="config-section">
              <label>#</label>
              
            </div>
            <div className="line"></div>
            {loading && (
                <Box  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: "-20px" }}>
                  <CircularProgress  size={25}  />
                </Box>
              )}
            <div className="config-list">
              {users.map((user) => (
                <Item key={user.id} user={user} />
              ))}
            </div>
          </div>
        </List>
      </Container>
    </CardBase>
  );
}
