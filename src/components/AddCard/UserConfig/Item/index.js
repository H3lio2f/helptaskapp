import { useRouter } from "next/router";
import React, { useState } from "react";
import FormUpdateUser from "../../../FormUpdateUser";
import Portal from "../../../Portal/Portal";
import { Container } from "./styles";

export default function Item({ user }) {
  const [isOpenUser, setIsOpenUser] = useState(false);

  return (
    <>
      <Portal isOpen={isOpenUser} setIsOpen={setIsOpenUser}>
        <label>Editar Utilizador</label>
        <FormUpdateUser />
      </Portal>
      <Container className="item" /* onDoubleClick={() => setIsOpenUser(true)} */ >
        <div className="top">
          {user.photo ? (
              <img className="photo" src={user.photo} />
            ) : (
              <span className="avatar">{user.name?.charAt(0)}</span>
          )}
          <span>{user.name}</span>
        </div>
      </Container>
    </>
  );
}
