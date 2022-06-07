import dynamic from 'next/dynamic';
import Head from "next/head";
import { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import SectionTitle from "../../components/SectionTitle";
import api from '../../services/api';
import { Container } from "../../styles/pages/configuration";
import { useGlobal } from "../../utils/contexts/global";

const AgentConfig = dynamic(() => import("../../components/AddCard/AgentConfig"));
const ChannelConfig = dynamic(() => import("../../components/AddCard/ChannelConfig"));
const ClientConfig = dynamic(() => import("../../components/AddCard/ClientConfig"));
const GroupConfig = dynamic(() => import("../../components/AddCard/GroupConfig"));
const TaskConfig = dynamic(() => import("../../components/AddCard/TaskConfig"));
const TypeConfig = dynamic(() => import("../../components/AddCard/TypeConfig"));
const UserConfig = dynamic(() => import("../../components/AddCard/UserConfig"));

const Loader = dynamic(() => import("../../components/LoadingSpinner"));


export default function Configurations({
  tasks,
  users,
  status,
  userLogged }) {
  const {
    refresh,
    setShowTaskConfig,
    setShowChannelConfig,
    setShowGroupConfig,
    setShowTypeConfig,
    setShowUserConfig,
    setShowClientConfig,
    setUser,
    setUsers,
    setStatus,
    actionDone,
    setFilteredLate
  } = useGlobal();

  const [loading, setLoading] = useState(true);

  const fetchFilteredLate = async () => {
    const filteredLate = tasks.filter(task => task.status_control === "late");
    setFilteredLate(filteredLate.length);
  }

  useEffect(() => {
    setUser(userLogged);
    fetchFilteredLate();
    setUsers(users);
    setStatus(status);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFilteredLate();
  }, [actionDone]);

  return (
    <>
    {loading === true && (
      <Loader />
    )}
      <Head>
        <title>Helptask - Configurações</title>
        <meta name="description" content="Helptask - Configurações" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Container>
          <TaskConfig />
          <ClientConfig />
          <UserConfig />
          <ChannelConfig />
          <GroupConfig />
          <TypeConfig />
          <div className="inner-main-container">
            <SectionTitle>
              <svg
                width="30"
                height="30"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5625 14.4998C23.5625 14.2219 23.5504 13.9561 23.5262 13.6782L25.7737 11.9744C26.2571 11.6119 26.39 10.9353 26.0879 10.4036L23.8283 6.50067C23.5262 5.969 22.8737 5.7515 22.3179 5.99317L19.72 7.09275C19.2729 6.77859 18.8017 6.50067 18.3062 6.27109L17.9558 3.47984C17.8833 2.87567 17.3637 2.4165 16.7596 2.4165H12.2525C11.6362 2.4165 11.1167 2.87567 11.0442 3.47984L10.6937 6.27109C10.1983 6.50067 9.72708 6.77859 9.27999 7.09275L6.68208 5.99317C6.12624 5.7515 5.47374 5.969 5.17166 6.50067L2.91208 10.4157C2.60999 10.9473 2.74291 11.6119 3.22624 11.9865L5.47374 13.6903C5.44958 13.9561 5.43749 14.2219 5.43749 14.4998C5.43749 14.7778 5.44958 15.0436 5.47374 15.3215L3.22624 17.0253C2.74291 17.3878 2.60999 18.0644 2.91208 18.5961L5.17166 22.499C5.47374 23.0307 6.12624 23.2482 6.68208 23.0065L9.27999 21.9069C9.72708 22.2211 10.1983 22.499 10.6937 22.7286L11.0442 25.5198C11.1167 26.124 11.6362 26.5832 12.2404 26.5832H16.7475C17.3517 26.5832 17.8712 26.124 17.9437 25.5198L18.2942 22.7286C18.7896 22.499 19.2608 22.2211 19.7079 21.9069L22.3058 23.0065C22.8617 23.2482 23.5142 23.0307 23.8162 22.499L26.0758 18.5961C26.3779 18.0644 26.245 17.3998 25.7617 17.0253L23.5142 15.3215C23.5504 15.0436 23.5625 14.7778 23.5625 14.4998ZM14.5483 18.729C12.2162 18.729 10.3192 16.8319 10.3192 14.4998C10.3192 12.1678 12.2162 10.2707 14.5483 10.2707C16.8804 10.2707 18.7775 12.1678 18.7775 14.4998C18.7775 16.8319 16.8804 18.729 14.5483 18.729Z"
                  fill="#3498DB"
                />
              </svg>

              <span>Minhas configurações</span>
            </SectionTitle>

            <div className="configurations">
              <div
                className="configurations-item"
                onClick={() => setShowClientConfig(true)}
              >
                <svg
                  width="50"
                  height="26"
                  viewBox="0 0 70 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M35 20.1875C39.7542 20.1875 43.9542 21.325 47.3667 22.8125C50.5167 24.2125 52.5 27.3625 52.5 30.775V32.5833C52.5 34.1875 51.1875 35.5 49.5833 35.5H20.4167C18.8125 35.5 17.5 34.1875 17.5 32.5833V30.8042C17.5 27.3625 19.4833 24.2125 22.6333 22.8417C26.0458 21.325 30.2458 20.1875 35 20.1875ZM11.6667 20.9167C14.875 20.9167 17.5 18.2917 17.5 15.0833C17.5 11.875 14.875 9.25 11.6667 9.25C8.45833 9.25 5.83333 11.875 5.83333 15.0833C5.83333 18.2917 8.45833 20.9167 11.6667 20.9167ZM14.9625 24.125C13.8833 23.95 12.8042 23.8333 11.6667 23.8333C8.77917 23.8333 6.0375 24.4458 3.55833 25.525C1.4 26.4583 0 28.5583 0 30.9208V32.5833C0 34.1875 1.3125 35.5 2.91667 35.5H13.125V30.8042C13.125 28.3833 13.7958 26.1083 14.9625 24.125ZM58.3333 20.9167C61.5417 20.9167 64.1667 18.2917 64.1667 15.0833C64.1667 11.875 61.5417 9.25 58.3333 9.25C55.125 9.25 52.5 11.875 52.5 15.0833C52.5 18.2917 55.125 20.9167 58.3333 20.9167ZM70 30.9208C70 28.5583 68.6 26.4583 66.4417 25.525C63.9625 24.4458 61.2208 23.8333 58.3333 23.8333C57.1958 23.8333 56.1167 23.95 55.0375 24.125C56.2042 26.1083 56.875 28.3833 56.875 30.8042V35.5H67.0833C68.6875 35.5 70 34.1875 70 32.5833V30.9208ZM35 0.5C39.8417 0.5 43.75 4.40833 43.75 9.25C43.75 14.0917 39.8417 18 35 18C30.1583 18 26.25 14.0917 26.25 9.25C26.25 4.40833 30.1583 0.5 35 0.5Z"
                    fill="#706C6C"
                  />
                </svg>

                <span>Clientes</span>
              </div>

              <div
                className="configurations-item"
                onClick={() => setShowUserConfig(true)}
              >
                <svg
                  width="39"
                  height="41"
                  viewBox="0 0 59 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.1667 23.9998C30.61 23.9998 35.8333 18.7765 35.8333 12.3332C35.8333 5.88985 30.61 0.666504 24.1667 0.666504C17.7233 0.666504 12.5 5.88985 12.5 12.3332C12.5 18.7765 17.7233 23.9998 24.1667 23.9998Z"
                    fill="#706C6C"
                  />
                  <path
                    d="M26.1208 26.9748C25.4792 26.9457 24.8375 26.9165 24.1667 26.9165C17.1083 26.9165 10.5167 28.8707 4.88749 32.2248C2.32083 33.7415 0.833328 36.5998 0.833328 39.604V47.3332H27.8417C25.5375 44.0373 24.1667 40.0123 24.1667 35.6665C24.1667 32.5457 24.8958 29.629 26.1208 26.9748Z"
                    fill="#706C6C"
                  />
                  <path
                    d="M55.5208 35.6663C55.5208 35.0247 55.4333 34.4413 55.3458 33.8288L58.6708 30.883L55.7542 25.8372L51.525 27.2663C50.5917 26.4788 49.5417 25.8663 48.375 25.4288L47.5 21.083H41.6667L40.7917 25.4288C39.625 25.8663 38.575 26.4788 37.6417 27.2663L33.4125 25.8372L30.4958 30.883L33.8208 33.8288C33.7333 34.4413 33.6458 35.0247 33.6458 35.6663C33.6458 36.308 33.7333 36.8913 33.8208 37.5038L30.4958 40.4497L33.4125 45.4955L37.6417 44.0663C38.575 44.8538 39.625 45.4663 40.7917 45.9038L41.6667 50.2497H47.5L48.375 45.9038C49.5417 45.4663 50.5917 44.8538 51.525 44.0663L55.7542 45.4955L58.6708 40.4497L55.3458 37.5038C55.4333 36.8913 55.5208 36.308 55.5208 35.6663ZM44.5833 41.4997C41.375 41.4997 38.75 38.8747 38.75 35.6663C38.75 32.458 41.375 29.833 44.5833 29.833C47.7917 29.833 50.4167 32.458 50.4167 35.6663C50.4167 38.8747 47.7917 41.4997 44.5833 41.4997Z"
                    fill="#706C6C"
                  />
                </svg>

                <span>Utilizadores</span>
              </div>
              <div
                className="configurations-item"
                onClick={() => setShowChannelConfig(true)}
              >
                <svg
                width="50"
                height="38"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5625 14.4998C23.5625 14.2219 23.5504 13.9561 23.5262 13.6782L25.7737 11.9744C26.2571 11.6119 26.39 10.9353 26.0879 10.4036L23.8283 6.50067C23.5262 5.969 22.8737 5.7515 22.3179 5.99317L19.72 7.09275C19.2729 6.77859 18.8017 6.50067 18.3062 6.27109L17.9558 3.47984C17.8833 2.87567 17.3637 2.4165 16.7596 2.4165H12.2525C11.6362 2.4165 11.1167 2.87567 11.0442 3.47984L10.6937 6.27109C10.1983 6.50067 9.72708 6.77859 9.27999 7.09275L6.68208 5.99317C6.12624 5.7515 5.47374 5.969 5.17166 6.50067L2.91208 10.4157C2.60999 10.9473 2.74291 11.6119 3.22624 11.9865L5.47374 13.6903C5.44958 13.9561 5.43749 14.2219 5.43749 14.4998C5.43749 14.7778 5.44958 15.0436 5.47374 15.3215L3.22624 17.0253C2.74291 17.3878 2.60999 18.0644 2.91208 18.5961L5.17166 22.499C5.47374 23.0307 6.12624 23.2482 6.68208 23.0065L9.27999 21.9069C9.72708 22.2211 10.1983 22.499 10.6937 22.7286L11.0442 25.5198C11.1167 26.124 11.6362 26.5832 12.2404 26.5832H16.7475C17.3517 26.5832 17.8712 26.124 17.9437 25.5198L18.2942 22.7286C18.7896 22.499 19.2608 22.2211 19.7079 21.9069L22.3058 23.0065C22.8617 23.2482 23.5142 23.0307 23.8162 22.499L26.0758 18.5961C26.3779 18.0644 26.245 17.3998 25.7617 17.0253L23.5142 15.3215C23.5504 15.0436 23.5625 14.7778 23.5625 14.4998ZM14.5483 18.729C12.2162 18.729 10.3192 16.8319 10.3192 14.4998C10.3192 12.1678 12.2162 10.2707 14.5483 10.2707C16.8804 10.2707 18.7775 12.1678 18.7775 14.4998C18.7775 16.8319 16.8804 18.729 14.5483 18.729Z"
                  fill="#706C6C"
                />
              </svg>
                <span>Canal de recepção da tarefa</span>
              </div>
              <div
                className="configurations-item"
                onClick={() => setShowGroupConfig(true)}
              >
                <svg
                width="50"
                height="38"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5625 14.4998C23.5625 14.2219 23.5504 13.9561 23.5262 13.6782L25.7737 11.9744C26.2571 11.6119 26.39 10.9353 26.0879 10.4036L23.8283 6.50067C23.5262 5.969 22.8737 5.7515 22.3179 5.99317L19.72 7.09275C19.2729 6.77859 18.8017 6.50067 18.3062 6.27109L17.9558 3.47984C17.8833 2.87567 17.3637 2.4165 16.7596 2.4165H12.2525C11.6362 2.4165 11.1167 2.87567 11.0442 3.47984L10.6937 6.27109C10.1983 6.50067 9.72708 6.77859 9.27999 7.09275L6.68208 5.99317C6.12624 5.7515 5.47374 5.969 5.17166 6.50067L2.91208 10.4157C2.60999 10.9473 2.74291 11.6119 3.22624 11.9865L5.47374 13.6903C5.44958 13.9561 5.43749 14.2219 5.43749 14.4998C5.43749 14.7778 5.44958 15.0436 5.47374 15.3215L3.22624 17.0253C2.74291 17.3878 2.60999 18.0644 2.91208 18.5961L5.17166 22.499C5.47374 23.0307 6.12624 23.2482 6.68208 23.0065L9.27999 21.9069C9.72708 22.2211 10.1983 22.499 10.6937 22.7286L11.0442 25.5198C11.1167 26.124 11.6362 26.5832 12.2404 26.5832H16.7475C17.3517 26.5832 17.8712 26.124 17.9437 25.5198L18.2942 22.7286C18.7896 22.499 19.2608 22.2211 19.7079 21.9069L22.3058 23.0065C22.8617 23.2482 23.5142 23.0307 23.8162 22.499L26.0758 18.5961C26.3779 18.0644 26.245 17.3998 25.7617 17.0253L23.5142 15.3215C23.5504 15.0436 23.5625 14.7778 23.5625 14.4998ZM14.5483 18.729C12.2162 18.729 10.3192 16.8319 10.3192 14.4998C10.3192 12.1678 12.2162 10.2707 14.5483 10.2707C16.8804 10.2707 18.7775 12.1678 18.7775 14.4998C18.7775 16.8319 16.8804 18.729 14.5483 18.729Z"
                  fill="#706C6C"
                />
              </svg>
                <span>Grupo</span>
              </div>
              <div
                className="configurations-item"
                onClick={() => setShowTypeConfig(true)}
              >
                <svg
                width="50"
                height="38"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5625 14.4998C23.5625 14.2219 23.5504 13.9561 23.5262 13.6782L25.7737 11.9744C26.2571 11.6119 26.39 10.9353 26.0879 10.4036L23.8283 6.50067C23.5262 5.969 22.8737 5.7515 22.3179 5.99317L19.72 7.09275C19.2729 6.77859 18.8017 6.50067 18.3062 6.27109L17.9558 3.47984C17.8833 2.87567 17.3637 2.4165 16.7596 2.4165H12.2525C11.6362 2.4165 11.1167 2.87567 11.0442 3.47984L10.6937 6.27109C10.1983 6.50067 9.72708 6.77859 9.27999 7.09275L6.68208 5.99317C6.12624 5.7515 5.47374 5.969 5.17166 6.50067L2.91208 10.4157C2.60999 10.9473 2.74291 11.6119 3.22624 11.9865L5.47374 13.6903C5.44958 13.9561 5.43749 14.2219 5.43749 14.4998C5.43749 14.7778 5.44958 15.0436 5.47374 15.3215L3.22624 17.0253C2.74291 17.3878 2.60999 18.0644 2.91208 18.5961L5.17166 22.499C5.47374 23.0307 6.12624 23.2482 6.68208 23.0065L9.27999 21.9069C9.72708 22.2211 10.1983 22.499 10.6937 22.7286L11.0442 25.5198C11.1167 26.124 11.6362 26.5832 12.2404 26.5832H16.7475C17.3517 26.5832 17.8712 26.124 17.9437 25.5198L18.2942 22.7286C18.7896 22.499 19.2608 22.2211 19.7079 21.9069L22.3058 23.0065C22.8617 23.2482 23.5142 23.0307 23.8162 22.499L26.0758 18.5961C26.3779 18.0644 26.245 17.3998 25.7617 17.0253L23.5142 15.3215C23.5504 15.0436 23.5625 14.7778 23.5625 14.4998ZM14.5483 18.729C12.2162 18.729 10.3192 16.8319 10.3192 14.4998C10.3192 12.1678 12.2162 10.2707 14.5483 10.2707C16.8804 10.2707 18.7775 12.1678 18.7775 14.4998C18.7775 16.8319 16.8804 18.729 14.5483 18.729Z"
                  fill="#706C6C"
                />
              </svg>
                <span>Tipo de tarefa</span>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
}


export async function getServerSideProps(context){

  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const {data: tasks} = await api.get('tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: clients } = await api.get("/clients", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: users } = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: status } = await api.get("/status", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: user} = await api.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: types } = await api.get("/types", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: channels } = await api.get("/channels", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: groups } = await api.get("/groups", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data: areas } = await api.get("/areas", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    props: {
      tasks: tasks.data,
      userLogged: user.user,
      clients: clients.data,
      users: users.data,
      types: types.data,
      status: status.data,
      channels: channels.data,
      groups: groups.data,
      areas: areas.data
    },
  };
};