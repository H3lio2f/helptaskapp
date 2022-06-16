import Link from "next/link";
import dynamic from 'next/dynamic';
import {destroyCookie } from "nookies";
import { useState,  useMemo } from "react";
import { useAuth } from "../../utils/contexts/auth";
import { Container, BouncyDiv } from "./styles";
import { useRouter } from 'next/router';
import { useGlobal } from "../../utils/contexts/global";

const FormUpdateUser = dynamic(() => import("../FormUpdateUser"));
const CardBase = dynamic(() => import("../AddCard/CardBase"));
const Portal = dynamic(() => import("../Portal/Portal"));

import useSWR from 'swr';
async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}
export default function TopBar() {
  const { data: userLogged } = useSWR("/api/userLogged", fetcher, { revalidateOnMount: true, refreshInterval: 1000});
  const { data: tasks } = useSWR("/api/tasks", fetcher, { revalidateOnMount: true, refreshInterval: 1000}); const router = useRouter();
  const { showAttribueted, setShowAttribueted, isOpenUpdateUser, setIsOpenUpdateUser } = useGlobal();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNoty, setIsOpenNoty] = useState(false);

  const handleOpenUpdatePerfil = () => {
    setIsOpen(false);
    setIsOpenUpdateUser(true);
  }
  const handleToggle = () => {
    setIsOpenNoty(false);
    setShowAttribueted(false);
    setIsOpen(!isOpen)
  };
  const handleToggleNoty = () => {
    setIsOpen(false);
    setIsOpenNoty(!isOpenNoty)
  };
  const { logout } = useAuth();

  const hendlelogout =  () => {
    //destroyCookie(null, "token");
    logout();
    router.reload('/');
  }

  const handleToAssign = () => {
    setShowAttribueted(true);
  }

  const handleClose = () => {
    setIsOpen(false);
    setIsOpenNoty(false);
  }

  const late = useMemo( () =>tasks?.data.filter(task => task.status_control === "waiting"), [tasks]);

  return (
    <>
      <Portal isOpen={isOpenUpdateUser} setIsOpen={() => setIsOpenUpdateUser(false)}>
        <label>Alterar informações do utilizador</label>
        <FormUpdateUser />
      </Portal>
    <Container>
      <div
        style={isOpen || isOpenNoty === true ? { display: "" } : { display: "none" }}
        className="overlay"
        onClick={handleClose}
      ></div>
      <div className="inner-container">
        <BouncyDiv
        lateTaskLength={isOpenNoty === false ? late?.length : 0 }
        className="notify"
        onClick={handleToggleNoty}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 20 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            
          >
            <path
              d="M10 24.8811C11.375 24.8811 12.5 23.7763 12.5 22.426H7.5C7.5 23.7763 8.625 24.8811 10 24.8811ZM17.5 17.5157V11.3778C17.5 7.60911 15.4625 4.45423 11.875 3.61948V2.78473C11.875 1.76584 11.0375 0.943359 10 0.943359C8.9625 0.943359 8.125 1.76584 8.125 2.78473V3.61948C4.55 4.45423 2.5 7.59684 2.5 11.3778V17.5157L0 19.9708V21.1984H20V19.9708L17.5 17.5157ZM15 18.7432H5V11.3778C5 8.33338 6.8875 5.85367 10 5.85367C13.1125 5.85367 15 8.33338 15 11.3778V18.7432Z"
              fill="white"
            />
          </svg>
          <span style={late?.length > 0 ? { color: "var(--error)"} : {} } className="bage">{late?.length}</span>
        </BouncyDiv>
          <div className="noty"
            style={
              isOpenNoty === true && late?.length > 0
                ? { transform: "scale(1)" }
                : { transform: "scale(0)" }
            }
          >
            <div className="dropdown-list">
             <span>{late?.length > 1 ? 'Existem': 'Existe'} {late?.length} {late?.length > 1 ? 'tarefas': 'tarefa'} que {late?.length > 1 ? 'foram criadas': 'foi criada'} há mais de 2 dias, mas ainda não {late?.length > 1 ? 'foram atribuídas a ninguém': 'foi atribuída a ninguém'}.</span>
             {router.pathname !== "/" ? (
                <Link href="/">
                  <a>
                   <button> Vá para lista de tarefas para visualiza-los</button>
                  </a>
                </Link>
             ) : (
                <button onClick={() => handleToAssign()}> {late?.length > 1 ? 'Mostar tarefas': 'Mostar tarefa'}</button>
             )}
            </div>
          </div>

        <div className="user dropdown-container">
          <div className="dropdown-header" onClick={handleToggle}>
            {userLogged?.user.photo ? (
                <img className="photo" src={userLogged.user.photo} />
              ) : (
                <span className="photo">{userLogged?.user.name?.charAt(0)}</span>
            )}
            <div className="logged-in">
              <span>{userLogged?.user.name}</span>
              <p>{userLogged?.user.role === "admin" ? 'administrador': userLogged?.user.role === "agent" ? 'agente' : 'gestor'}</p>
            </div>
            <svg
              width="8"
              height="7"
              viewBox="0 0 8 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0.677246L4.0058 6.32406L7.83743 0.92276L4.38163 0.741855L0 0.677246Z"
                fill="white"
              />
            </svg>
          </div>
          <div
            className="dropdown-list-container"
            style={
              isOpen === true
                ? { transform: "scale(1)" }
                : { transform: "scale(0)" }
            }
          >
            <ul className="dropdown-list">
              <li onClick={() => handleOpenUpdatePerfil()}>
                  <a>Editar perfil</a>
              </li>
              <li>
                <Link href="/logs">
                  <a>Logs de actividade</a>
                </Link>
              </li>
              <li>
                  <a onClick={hendlelogout}>Terminar sesssão</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
    </>
  );
}
