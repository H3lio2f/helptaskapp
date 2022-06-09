import { useFormik } from "formik";
import { Button } from '@mui/material';
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Container } from "../../styles/addCard";
import { useGlobal } from "../../utils/contexts/global";
import { addNewReply } from "../../utils/persistData";
import { ButtonContainer } from "../Buttons/save";


export default function FormReplyTask({ taskId }) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { setActionDone, actionDone, setLoading, setOpenReply, refresh, setRefresh } = useGlobal();
  const [files, setFiles] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      content: "",
      files: null
    },
    validationSchema: yup.object().shape({
      content: yup.string().defined("Este campo é obrigatório"),
    }),
    onSubmit: (
      {
        content,
        files
      },
      { setSubmitting, resetForm, setErrors }
    ) => {
      addNewReply({
        taskId,
        content,
        files
      }).then(({ data }) => {
          setSubmitting(false);
          setActionDone(!actionDone);
          resetForm({});
          enqueueSnackbar(data.message, {
            variant: "success",
          });
        })
        .catch(({ response }) => {
          setSubmitting(false);
          if (response?.status === 422) {
            if (response.data.errors.message) {
              setErrors({
                content: `${response.data.errors.message[0]}`,
              });
            }
          } else {
            Swal.fire({
              text: `${
                response.mensagem
                  ? response.mensagem
                  : "Erro ao adicionar comentário"
              }`,
              icon: "error",
              confirmButtonColor: "var(--primary)",
            });
          }
        });
    },
  });

  return (
    <Container onSubmit={formik.handleSubmit}>
       <div className="form-control first">
        <div className="label-control">
        
        </div>
        <textarea
          className={formik.errors.content ? "client red-border" : "client "}
          id="content"
          type="text"
          rows="12"
          placeholder="Escreva a sua resposta..."
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
         {formik.errors.content && formik.touched.content && (
            <p className="error">{formik.errors.content}</p>
          )}
      </div>
      <div className="form-button-control-divided">
        <div>
          <input
              /* style={{ display: 'none' }} */
              id="raised-button-file"
              multiple
              name="files"
              type="file"
              onChange={event => {
                formik.setFieldValue('files', event.target.files);
                setFiles(event.target.files.length);
              }}
            />
            <label style={{ display: 'flex', alignItems: "center"}} htmlFor="raised-button-file">
              <Button variant="raised" component="span">
                {files ? `${files} ${files > 0 ? 'anexos' : 'anexo'} ${files > 0 ? 'carregados' : 'carregado'}` : "Carregar anexos (Opcional)"}
              </Button>
            </label>
        </div>
        <ButtonContainer
          type="submit"
          disabled={
            formik.isSubmitting ||
            !!(formik.errors.content && formik.touched.content)
          }
        >
          <span> {formik.isSubmitting ? "A responder..." : "Responder"} </span>
          {formik.isSubmitting === true ? (
            <svg
              width="15"
              height="17"
              viewBox="0 0 12 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 19.5H0.500835L0.509656 14.2167L4.35444 10.3527L4.70578 9.99956L4.354 9.64689L0.509656 5.79291L0.500834 0.5H11.5V5.80253L7.64689 9.646L7.29245 9.99956L7.64645 10.3536L11.5 14.2071V19.5ZM10.5 14.5V14.2929L10.3536 14.1464L6.35355 10.1464L6 9.79289L5.64645 10.1464L1.64645 14.1464L1.5 14.2929V14.5V18V18.5H2H10H10.5V18V14.5Z"
                fill="white"
                stroke="white"
              />
            </svg>
          ) : (
            <svg
              width="15"
              height="13"
              viewBox="0 0 18 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.99989 10.1698L2.52989 6.69982C2.13989 6.30982 1.50989 6.30982 1.11989 6.69982C0.729893 7.08982 0.729893 7.71982 1.11989 8.10982L5.29989 12.2898C5.68989 12.6798 6.31989 12.6798 6.70989 12.2898L17.2899 1.70982C17.6799 1.31982 17.6799 0.689824 17.2899 0.299824C16.8999 -0.0901758 16.2699 -0.0901758 15.8799 0.299824L5.99989 10.1698Z"
                fill="white"
              />
            </svg>
          )}
        </ButtonContainer>
      </div>
    </Container>
  );
}
