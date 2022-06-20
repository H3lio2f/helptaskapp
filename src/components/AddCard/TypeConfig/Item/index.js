import React from "react";
import { useSnackbar } from "notistack";
import Swal from "sweetalert2";
import { Container } from "./styles";
import Portal from '../../../Portal/Portal';
import { useGlobal } from "../../../../utils/contexts/global";
import FormUpdateType from '../../../FormUpdateType';
import {useState} from 'react';
import { deleteType } from "../../../../utils/persistData";

export default function Item({ type }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenChannel, setIsOpenChannel] = useState(false);
    const { refresh, setRefresh } = useGlobal();
  const handleOpen = () => {
    setIsOpenChannel(true);
  }

  const handleDelete = (id) => {
    deleteType(id)
      .then(({ message }) => {
        setRefresh(!refresh);
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
  };

  return (
    <>
    <Portal isOpen={isOpenChannel} setIsOpen={setIsOpenChannel}>
      <label>
        Editar tipo de tarefa
      </label>
      <FormUpdateType type={type}/>
    </Portal>
    <Container className="item" onDoubleClick={handleOpen}>
      <span>{type.name}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => handleDelete(type.id)}
      >
        <path
          d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM13.59 5L10 8.59L6.41 5L5 6.41L8.59 10L5 13.59L6.41 15L10 11.41L13.59 15L15 13.59L11.41 10L15 6.41L13.59 5Z"
          fill="#706C6C"
        />
      </svg>
    </Container>
    </>
  );
}
