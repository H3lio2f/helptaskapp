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

 /*  const handleDelete = (id) => {
    deleteUser(id)
      .then(({ message }) => {
        //router.push('/clients', undefined, { shallow: true });
        setActionDone(!actionDone);
        enqueueSnackbar(message, {
          variant: "success",
        });
      })
      .catch(({ response }) => {
        Swal.fire({
          text: `${
            response.data.message ? response.data.message : "Erro ao excluir"
          }`,
          icon: "error",
          confirmButtonColor: "var(--primary)",
        });
      });
  }; */

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
          <span>{user.name}</span>
        </div>
        {/* <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => handleDelete(user.id)}
        >
          <path
            d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM13.59 5L10 8.59L6.41 5L5 6.41L8.59 10L5 13.59L6.41 15L10 11.41L13.59 15L15 13.59L11.41 10L15 6.41L13.59 5Z"
            fill="#706C6C"
          />
        </svg> */}
      </Container>
    </>
  );
}
