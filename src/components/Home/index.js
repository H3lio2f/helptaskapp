import React, { useEffect, useState } from "react";
import { Container } from "../../styles/pages/home";
import { useGlobal } from "../../utils/contexts/global";
import { fetchAllTasks } from "../../utils/fetchData";
import dynamic from 'next/dynamic'
import ButtonAdd from "../Buttons/add";
import Filter from "../Filter/";
import Layout from "../Layout";
import SectionTitle from "../SectionTitle";
import TableTask from "../TableTask";
import moment from 'moment';
import useSWR from 'swr';

const NewTask = dynamic(() => import('../AddCard/NewTask'))

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default function Home({ tasks }) {
  const { data: userLogged } = useSWR("/api/userLogged", fetcher, { revalidateOnMount: true});
  const { refresh, showAttribueted } = useGlobal();
  const [allTasks, setAllTasks] = useState([]);
  const [checked, setChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleFilterBy, setToogleFilterBy] = useState(false);

  const fetchTasks = async () => {
    if (!searchQuery) {
      if(checked === true) {
        setAllTasks(tasks);
      }else{
        const filterActive = tasks.filter((task) => task.active === 1);
        setAllTasks(filterActive);
      }
    } else {
      const dataFiltered = tasks.filter((task) => task.name.toLowerCase().includes(searchQuery.toLowerCase()) || task.status_control.toLowerCase().includes(searchQuery.toLowerCase())  || task.client_name.toLowerCase().includes(searchQuery.toLowerCase()) || task.type_name.toLowerCase().includes(searchQuery.toLowerCase()) || task.user_name.toLowerCase().includes(searchQuery.toLowerCase()) || task.status_name.toLowerCase().includes(searchQuery.toLowerCase()) || task.dueDate.includes(moment(searchQuery).format('DD/MM/YYYY')));
      if(checked === true) {
        setAllTasks(dataFiltered);
      }else{
        let filterActive = dataFiltered.filter((task) => task.active === 1);
        if(searchQuery === "waiting"){
          filterActive = dataFiltered.filter((task) => task.active === 1 || task.active === 0);
        }
        setAllTasks(filterActive);
      }
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [searchQuery, toggleFilterBy])

  useEffect(() => {
    fetchAllTasks().then(data => {
      setAllTasks(data.data);
    });
  },[refresh]);

  useEffect(() => {
    setSearchQuery("");
  },[]);

  useEffect(() => {
    fetchAllTasks().then(data => {
      setAllTasks(data.data);
    });
  },[]);

  const handleKeyDown = async(e) => {
    if (e.keyCode === 13) {
      if (!searchQuery) {
        if(checked === true) {
          setAllTasks(tasks);
        }else{
          const filterActive = tasks.filter((task) => task.active == 1);
          setAllTasks(filterActive);
        }
      } else {
        const dataFiltered = tasks.filter((task) => task.name.toLowerCase().includes(searchQuery.toLowerCase()) || task.client_name.toLowerCase().includes(searchQuery.toLowerCase()) || task.type_name.toLowerCase().includes(searchQuery.toLowerCase()) || task.user_name.toLowerCase().includes(searchQuery.toLowerCase()) || task.status_name.toLowerCase().includes(searchQuery.toLowerCase()) || task.dueDate.includes(moment(searchQuery).format('DD/MM/YYYY')));
        if(checked === true) {
          setAllTasks(dataFiltered);
        }else{
          const filterActive = dataFiltered.filter((task) => task.active === 1);
          setAllTasks(filterActive);
        }
      }
    }
  }

  const handleWaiting = () => {
    setSearchQuery("em espera");
    setToogleFilterBy(!toggleFilterBy);
  };

  const handleInProgress = () => {
    setSearchQuery("em andamento");
    setToogleFilterBy(!toggleFilterBy);
  };

  const handleClosed = () => {
    setSearchQuery("fechado");
    setToogleFilterBy(!toggleFilterBy);
  };

  const handleToAssign = () => {
    setSearchQuery("por atribuir");
    setToogleFilterBy(!toggleFilterBy);
  };

  useEffect(() => {
    handleToAssignLate();
  }, [showAttribueted])

  const handleToAssignLate = () => {
    setSearchQuery("waiting");
    setToogleFilterBy(!toggleFilterBy);
  };

  const handleAll = () => {
    setSearchQuery("");
    setToogleFilterBy(!toggleFilterBy);
  };

  const handleSeeInactive = () => {
    setChecked(!checked);
    setToogleFilterBy(!toggleFilterBy);
  }


  return (
    <>
      <NewTask />
      <Layout>
        <Container>
          <div className="inner-main-container">
            <div className="container-top">
            <SectionTitle>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.2625 9.2625L18.225 3.225C17.7625 2.7625 17.125 2.5 16.4625 2.5H7.5C6.125 2.5 5.0125 3.625 5.0125 5L5 25C5 26.375 6.1125 27.5 7.4875 27.5H22.5C23.875 27.5 25 26.375 25 25V11.0375C25 10.375 24.7375 9.7375 24.2625 9.2625ZM12.7875 21.6125L10.1375 18.9625C9.65 18.475 9.65 17.6875 10.1375 17.2C10.625 16.7125 11.4125 16.7125 11.9 17.2L13.6625 18.9625L18.0875 14.5375C18.575 14.05 19.3625 14.05 19.85 14.5375C20.3375 15.025 20.3375 15.8125 19.85 16.3L14.55 21.6C14.075 22.1 13.275 22.1 12.7875 21.6125ZM17.5 11.25C16.8125 11.25 16.25 10.6875 16.25 10V4.375L23.125 11.25H17.5Z"
                  fill="#3498DB"
                />
              </svg>
              <span>Minhas tarefas</span>
            </SectionTitle>
                <div className="top-control">
                  <div className="task-visibity" style={allTasks.length === 0 && tasks.length === 0 ? { opacity: "0"} : { opacity: "1"}}>
                    <input
                      id="visibility"
                      type="checkbox"
                      checked={checked}
                      onChange={handleSeeInactive}
                    />
                    <label htmlFor="visibility">Mostar tarefas inactivas</label>
                  </div>
                  <div className="status" onClick={handleToAssign} style={allTasks.length === 0 && tasks.length === 0  ? { opacity: "0"} : { opacity: "1"}}>
                    <div
                      style={{ background: "#e74c3c" }}
                      className="color"
                    ></div>
                    <label>Por Atribuir</label>
                  </div>
                  <div className="status" onClick={handleWaiting} style={allTasks.length === 0 && tasks.length === 0  ? { opacity: "0"} : { opacity: "1"}}>
                    <div
                      style={{
                        background:
                          "#e67e22",
                        border: "1px solid var(--gray-2)",
                      }}
                      className="color"
                    ></div>
                    <label>Em Espera</label>
                  </div>
                  <div className="status" onClick={handleInProgress} style={allTasks.length === 0 && tasks.length === 0  ? { opacity: "0"} : { opacity: "1"}}>
                    <div
                      style={{ background: "#f1c40f" }}
                      className="color"
                    ></div>
                    <label>Em Andamento</label>
                  </div>
                  <div className="status" onClick={handleClosed} style={allTasks.length === 0 && tasks.length === 0  ? { opacity: "0"} : { opacity: "1"}}>
                    <div
                      style={{ background: "#27AE60" }}
                      className="color"
                    ></div>
                    <label>Fechado</label>
                  </div>
                  <div className="status" onClick={handleAll} style={allTasks.length === 0 && tasks.length === 0  ? { opacity: "0"} : { opacity: "1"}}>
                    <div
                      style={{ background: "var(--primary)" }}
                      className="color"
                    ></div>
                    <label>Todas</label>
                  </div>
      
                  <div className="view-control"></div>
                  {(userLogged?.user.role === "admin" || userLogged?.user.role === "mannager")  && (
                    <ButtonAdd>Adicionar nova tarefa</ButtonAdd>
                  )}
                </div>
            </div>
              <Filter handleKeyDown={handleKeyDown} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              
            {allTasks.length > 0 ? (
              <TableTask tasks={allTasks} />
            ) : (
              <div className="empty-list">
                <svg
                  width="70"
                  height="64"
                  viewBox="0 0 300 184"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M297.269 44.566C297.255 44.5478 297.248 44.5283 297.232 44.5095L264.648 3.94125C264.281 3.48609 263.868 3.09391 263.428 2.74329C262.025 1.07978 259.951 0 257.605 0H42.3941C40.0469 0 37.9763 1.07849 36.5731 2.74329C36.1329 3.09391 35.7186 3.4822 35.3492 3.94125L2.76862 44.5095C2.75368 44.5283 2.74654 44.5478 2.73161 44.566C1.07459 45.9691 0 48.0372 0 50.3766V175.737C0 179.957 3.42181 183.38 7.64226 183.38H292.358C296.578 183.38 300 179.957 300 175.737V50.3766C300.001 48.0372 298.925 45.9691 297.269 44.566ZM265.249 29.0958L276.205 42.7343H265.249V29.0958ZM249.964 15.2852V42.7337H192.738C191.106 42.7337 189.521 43.2564 188.207 44.2225L150.004 72.3366L111.793 44.2186C110.48 43.2564 108.893 42.7337 107.262 42.7337H50.0357V15.2852H249.964ZM34.7525 42.7343H23.7968L34.7525 29.0958V42.7343V42.7343ZM284.717 168.095H15.2845V58.0188H104.755L145.474 87.9827C148.168 89.9605 151.84 89.9644 154.534 87.9795L195.244 58.0182H284.717V168.095V168.095Z"
                    fill="#636E72"
                  />
                </svg>
                <span>Nenhuma resultado encontrado.</span>
              </div>
            )}
          </div>
        </Container>
      </Layout>
    </>
  );
}