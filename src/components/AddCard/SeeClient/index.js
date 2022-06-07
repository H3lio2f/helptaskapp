import { useEffect, useState } from "react";
import { showClientDetails } from "../../../utils/fetchData";
import { useRouter } from "next/router";
import FormUpdateClient from "../../FormUpdateClient/";
import CardBase from "../CardBase";
import { Container } from "./styles";

export default function SeeClient({
  isShown,
  setIsShown,
  client
}) {
  const {
    query: { id },
  } = useRouter();
  return (
    <CardBase isShown={isShown} setIsShown={setIsShown}>
      <Container>
        <div className="new-client-top">
          <span>Editar as informações do cliente</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setSeeClient(false)}
          >
            <path
              d="M16.8749 0.903632C16.3874 0.4185 15.5999 0.4185 15.1124 0.903632L8.9999 6.97399L2.8874 0.891192C2.3999 0.406061 1.6124 0.406061 1.1249 0.891192C0.637402 1.37632 0.637402 2.16 1.1249 2.64513L7.2374 8.72793L1.1249 14.8107C0.637402 15.2959 0.637402 16.0795 1.1249 16.5647C1.6124 17.0498 2.3999 17.0498 2.8874 16.5647L8.9999 10.4819L15.1124 16.5647C15.5999 17.0498 16.3874 17.0498 16.8749 16.5647C17.3624 16.0795 17.3624 15.2959 16.8749 14.8107L10.7624 8.72793L16.8749 2.64513C17.3499 2.17244 17.3499 1.37632 16.8749 0.903632Z"
              fill="#636E72"
            />
          </svg>
        </div>
        <FormUpdateClient client={client} />
      </Container>
    </CardBase>
  );
}
