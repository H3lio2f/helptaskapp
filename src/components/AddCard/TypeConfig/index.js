import {Box, CircularProgress} from '@mui/material';
import { useEffect, useState } from 'react';
import { Container as List } from "../../../styles/addCard";
import { useGlobal } from "../../../utils/contexts/global";
import { fetchAllTypes } from "../../../utils/fetchData";
import FormNewType from '../../FormNewType';
import Portal from '../../Portal/Portal';
import CardBase from "../CardBase";
import Item from './Item';
import { Container } from "./styles";
import Pusher from 'pusher-js';

const pusherConfig = {
  cluster: 'mt1',
  wsHost: '127.0.0.1',
  wsPort: '6001',
  encrypted:false,
  enabledTransports: ['ws'],
  forceTLS: false
};

export default function TypeConfig() {
  const { showTypeConfig, setShowTypeConfig, refresh, isOpenType, setIsOpenType } = useGlobal();
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePortalType = () => {
    setIsOpenType(true);
  }

  const handleWebsocket = () => {
    Pusher.logToConsole = true
    const pusher = new Pusher('ABCDEFG', pusherConfig);

    const channel = pusher.subscribe('types');
    channel.bind('all-types', data => {
      setTypes(data.types);
      setLoading(false);
    });
  }

  useEffect(() => {
    handleWebsocket();
  }, []);

  useEffect(() => {
    handleTypes();
  }, [refresh]);

  const handleTypes = () => {
    fetchAllTypes().then(data => {
    setTypes(data.data);
    setLoading(false);
    });
  }

  return (
    <CardBase isShown={showTypeConfig} setIsShown={setShowTypeConfig}>
    <Portal isOpen={isOpenType} setIsOpen={setIsOpenType}>
      <label>
        Adicionar novo tipo de tarefa
      </label>
      <FormNewType />
    </Portal>
      <Container>
        <div className="config-task-top">
          <div className="label">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.25 8.99984C15.25 8.80817 15.2416 8.62484 15.225 8.43317L16.775 7.25817C17.1083 7.00817 17.2 6.5415 16.9916 6.17484L15.4333 3.48317C15.225 3.1165 14.775 2.9665 14.3916 3.13317L12.6 3.8915C12.2916 3.67484 11.9666 3.48317 11.625 3.32484L11.3833 1.39984C11.3333 0.983171 10.975 0.666504 10.5583 0.666504H7.44997C7.02497 0.666504 6.66663 0.983171 6.61663 1.39984L6.37497 3.32484C6.0333 3.48317 5.7083 3.67484 5.39997 3.8915L3.6083 3.13317C3.22497 2.9665 2.77497 3.1165 2.56663 3.48317L1.0083 6.18317C0.799965 6.54984 0.891632 7.00817 1.22497 7.2665L2.77497 8.4415C2.7583 8.62484 2.74997 8.80817 2.74997 8.99984C2.74997 9.1915 2.7583 9.37484 2.77497 9.5665L1.22497 10.7415C0.891632 10.9915 0.799965 11.4582 1.0083 11.8248L2.56663 14.5165C2.77497 14.8832 3.22497 15.0332 3.6083 14.8665L5.39997 14.1082C5.7083 14.3248 6.0333 14.5165 6.37497 14.6748L6.61663 16.5998C6.66663 17.0165 7.02497 17.3332 7.44163 17.3332H10.55C10.9666 17.3332 11.325 17.0165 11.375 16.5998L11.6166 14.6748C11.9583 14.5165 12.2833 14.3248 12.5916 14.1082L14.3833 14.8665C14.7666 15.0332 15.2166 14.8832 15.425 14.5165L16.9833 11.8248C17.1916 11.4582 17.1 10.9998 16.7666 10.7415L15.2166 9.5665C15.2416 9.37484 15.25 9.1915 15.25 8.99984ZM9.0333 11.9165C7.42497 11.9165 6.11663 10.6082 6.11663 8.99984C6.11663 7.3915 7.42497 6.08317 9.0333 6.08317C10.6416 6.08317 11.95 7.3915 11.95 8.99984C11.95 10.6082 10.6416 11.9165 9.0333 11.9165Z"
                fill="#3498DB"
              />
            </svg>

            <span>Configurações de tipo de tarefa</span>
          </div>
          <svg
            width="15"
            height="15"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setShowTypeConfig(false)}
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
              <label>Tipos de tarefa</label>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handlePortalType}
              >
                <path
                  d="M9.00008 0.666504C4.40008 0.666504 0.666748 4.39984 0.666748 8.99984C0.666748 13.5998 4.40008 17.3332 9.00008 17.3332C13.6001 17.3332 17.3334 13.5998 17.3334 8.99984C17.3334 4.39984 13.6001 0.666504 9.00008 0.666504ZM13.1667 9.83317H9.83342V13.1665H8.16675V9.83317H4.83342V8.1665H8.16675V4.83317H9.83342V8.1665H13.1667V9.83317Z"
                  fill="#3498DB"
                />
              </svg>
            </div>
            <div className="line"></div>
              {loading && (
                <Box  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: "-20px" }}>
                  <CircularProgress  size={25}  />
                </Box>
              )}
            <div className="config-list">
              {types.map((type) => (
                <Item key={type.id} type={type} />
              ))}
            </div>
          </div>
        </List>
      </Container>
    </CardBase>
  );
}
