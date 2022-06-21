
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import ButtonAdd from "../Buttons/add";
import Filter from "../Filter";
import Layout from "../Layout";
import SectionTitle from "../SectionTitle";
import { Container } from "../../styles/pages/client";
import { useGlobal } from "../../utils/contexts/global";
import { pusherConfig, pusher } from "../../helpers/websocket";
import {fetchAllClients } from "../../utils/fetchData";
import TableClient from "../TableClient";
import useSWR from 'swr';

const NewClient = dynamic(() => import("../AddCard/NewClient"));

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}
export default function Clients({ clients }) {
  const { data: userLogged } = useSWR("/api/userLogged", fetcher, { revalidateOnMount: true});
  const { setShowNewClient, refresh } = useGlobal();
  const [allClients, setAllClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    if (!searchQuery) {
      setAllClients(clients);
    } else {
      const dataFiltered = allClients.filter((client) => client.name.toLowerCase().includes(searchQuery.toLowerCase()) || client.reference.toLowerCase().includes(searchQuery.toLowerCase()) || client.country.toLowerCase().includes(searchQuery.toLowerCase()) || client.email1.toLowerCase().includes(searchQuery.toLowerCase()) || client.phone1.toLowerCase().includes(searchQuery.toLowerCase()));
      setAllClients(dataFiltered);
    }
  }

  useEffect(() => {
    fetchClients();
  }, [searchQuery])

  const handleWebsocket = () => {
    const channel = pusher.subscribe('clients');
    channel.bind('all-clients', data => {
      setAllClients(data.clients.data);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchAllClients().then(data => {
      handleWebsocket();
    });
  },[refresh]);

  useEffect(() => {
    handleWebsocket();
  },[]);


  const handleKeyDown = async(e) => {
    if (e.keyCode === 13) {
      if (!searchQuery) {
        setAllClients(clients);
      } else {
        const dataFiltered = allClients.filter((client) => client.name.toLowerCase().includes(searchQuery.toLowerCase()) || client.reference.toLowerCase().includes(searchQuery.toLowerCase()) || client.country.toLowerCase().includes(searchQuery.toLowerCase()) || client.email1.toLowerCase().includes(searchQuery.toLowerCase()) || client.phone1.toLowerCase().includes(searchQuery.toLowerCase()));
        setAllClients(dataFiltered);
      }
    }
  }

  return (
    <>
      <NewClient />
      <Layout>
        <Container>
          <div className="inner-main-container">
          <div className="container-top" style={{ display: 'flex', justifyContent: "space-between"}}>
            <SectionTitle>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 15.9375C17.0375 15.9375 18.8375 16.425 20.3 17.0625C21.65 17.6625 22.5 19.0125 22.5 20.475V21.25C22.5 21.9375 21.9375 22.5 21.25 22.5H8.75C8.0625 22.5 7.5 21.9375 7.5 21.25V20.4875C7.5 19.0125 8.35 17.6625 9.7 17.075C11.1625 16.425 12.9625 15.9375 15 15.9375ZM5 16.25C6.375 16.25 7.5 15.125 7.5 13.75C7.5 12.375 6.375 11.25 5 11.25C3.625 11.25 2.5 12.375 2.5 13.75C2.5 15.125 3.625 16.25 5 16.25ZM6.4125 17.625C5.95 17.55 5.4875 17.5 5 17.5C3.7625 17.5 2.5875 17.7625 1.525 18.225C0.6 18.625 0 19.525 0 20.5375V21.25C0 21.9375 0.5625 22.5 1.25 22.5H5.625V20.4875C5.625 19.45 5.9125 18.475 6.4125 17.625ZM25 16.25C26.375 16.25 27.5 15.125 27.5 13.75C27.5 12.375 26.375 11.25 25 11.25C23.625 11.25 22.5 12.375 22.5 13.75C22.5 15.125 23.625 16.25 25 16.25ZM30 20.5375C30 19.525 29.4 18.625 28.475 18.225C27.4125 17.7625 26.2375 17.5 25 17.5C24.5125 17.5 24.05 17.55 23.5875 17.625C24.0875 18.475 24.375 19.45 24.375 20.4875V22.5H28.75C29.4375 22.5 30 21.9375 30 21.25V20.5375ZM15 7.5C17.075 7.5 18.75 9.175 18.75 11.25C18.75 13.325 17.075 15 15 15C12.925 15 11.25 13.325 11.25 11.25C11.25 9.175 12.925 7.5 15 7.5Z"
                  fill="#3498DB"
                />
              </svg>

              <span>Meus clientes</span>
            </SectionTitle>
            {(userLogged?.user.role === "admin" || userLogged?.user.role === "mannager") && (
              <ButtonAdd>Adicionar novo cliente</ButtonAdd>
            )}
            </div>
              <Filter handleKeyDown={handleKeyDown} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {allClients.length > 0 ? (
              <TableClient clients={allClients} />
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
                <span>Nenhum resultado encontrado.</span>
                {/* <a onClick={() => setShowNewClient(true)}>
                  Adicionar o primeiro cliente
                </a> */}
              </div>
            )}
          </div>
        </Container>
      </Layout>
    </>
  );
}

