import Link from "next/link";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { useAuth } from "../../utils/contexts/auth";
import { Container, BouncyDiv } from "./styles";
import { useRouter } from 'next/router';
import { useGlobal } from "../../utils/contexts/global";
import { fetchUserLogged, fetchAllTasks } from "../../utils/fetchData";


export default function TopBar() {
  const router = useRouter();
  const { showAttribueted, setShowAttribueted } = useGlobal();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNoty, setIsOpenNoty] = useState(false);

  const [user, setUser] = useState();
  const [filteredLate, setFilteredLate] = useState();

  const handleToggle = () => {
    setIsOpenNoty(false);
    setIsOpen(!isOpen)
  };
  const handleToggleNoty = () => {
    setIsOpen(false);
    setIsOpenNoty(!isOpenNoty)
  };
  const { logout } = useAuth();

  const hendlelogout =  () => {
    logout();
    router.reload();
  }

  const handleToAssign = () => {
    setShowAttribueted(!showAttribueted);
  }

  const handleClose = () => {
    setIsOpen(false);
    setIsOpenNoty(false);
  }

  const handleLateTasks = async () => {
    const { data: tasks } = await fetchAllTasks();
    const filteredLate = tasks.filter(task => task.status_control === "waiting");
    setFilteredLate(filteredLate.length);
  }

  const handleUserLogged = async () => {
    const user = await fetchUserLogged();
    setUser(user.user);
  }

  useEffect(() => {
    handleUserLogged();
    handleLateTasks();
  }, []);

  return (
    <Container>
      <div
        style={isOpen || isOpenNoty === true ? { display: "" } : { display: "none" }}
        className="overlay"
        onClick={handleClose}
      ></div>
      <div className="inner-container">
        <BouncyDiv
        lateTaskLength={isOpenNoty === false ? filteredLate : 0 }
        className="notify">
          <svg
            width="30"
            height="30"
            viewBox="0 0 20 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleToggleNoty}
          >
            <path
              d="M10 24.8811C11.375 24.8811 12.5 23.7763 12.5 22.426H7.5C7.5 23.7763 8.625 24.8811 10 24.8811ZM17.5 17.5157V11.3778C17.5 7.60911 15.4625 4.45423 11.875 3.61948V2.78473C11.875 1.76584 11.0375 0.943359 10 0.943359C8.9625 0.943359 8.125 1.76584 8.125 2.78473V3.61948C4.55 4.45423 2.5 7.59684 2.5 11.3778V17.5157L0 19.9708V21.1984H20V19.9708L17.5 17.5157ZM15 18.7432H5V11.3778C5 8.33338 6.8875 5.85367 10 5.85367C13.1125 5.85367 15 8.33338 15 11.3778V18.7432Z"
              fill="white"
            />
          </svg>
          <span style={filteredLate > 0 ? { color: "var(--error)"} : {} } className="bage">{filteredLate}</span>
        </BouncyDiv>
          <div className="noty"
            style={
              isOpenNoty === true && filteredLate > 0
                ? { transform: "scale(1)" }
                : { transform: "scale(0)" }
            }
          >
            <div className="dropdown-list">
             <span>{filteredLate > 1 ? 'Existem': 'Existe'} {filteredLate} {filteredLate > 1 ? 'tarefas': 'tarefa'} que {filteredLate > 1 ? 'foram criadas': 'foi criada'} há mais de 2 dias, mas ainda não {filteredLate > 1 ? 'foram atribuídas a ninguém': 'foi atribuída a ninguém'}.</span>
             {router.pathname !== "/" ? (
                <Link href="/">
                  <a>
                   <button> Ir para lista das tarefas para visualizar</button>
                  </a>
                </Link>
             ) : (
                <button onClick={handleToAssign}> {filteredLate > 1 ? 'Mostar tarefas': 'Mostar tarefa'}</button>
             )}
            </div>
          </div>

        <div className="user dropdown-container">
          <div className="dropdown-header" onClick={handleToggle}>
            {user?.photo ? (
                <img className="photo" src={user.photo} />
              ) : (
                <span className="photo">{user?.name?.charAt(0)}</span>
            )}
            <div className="logged-in">
              <span>{user?.name}</span>
              <p>{user?.role}</p>
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
              <li>
                <Link href="#">
                  <a>Editar perfil</a>
                </Link>
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
  );
}
