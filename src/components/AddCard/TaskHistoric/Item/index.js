import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import Swal from "sweetalert2";
/* import { deleteUser } from "../../../../utils/persistData"; */
import FormUpdateUser from "../../../FormUpdateUser";
import Portal from "../../../Portal/Portal";
import { Container } from "./styles";

export default function Item({ user }) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [isOpenUser, setIsOpenUser] = useState(false);
  const handleOpen = () => {
    setIsOpenUser(true);
    //router.push(`?user=${user.id}`, undefined, { shallow: false });
  };

  return (
    <>
      <Portal isOpen={isOpenUser} setIsOpen={setIsOpenUser}>
        <label>Editar tipo de tarefa</label>
        <FormUpdateUser />
      </Portal>
      <Container className="item"  >
        <div className="top">
          {user.photo ? (
              <img className="photo" src={user.photo} />
            ) : (
              <span className="avatar">{user.name?.charAt(0)}</span>
          )}
          <span>{user.description}</span>
        </div>
      </Container>
    </>
  );
}
