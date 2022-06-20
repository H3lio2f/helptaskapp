import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import PhoneInput from "react-phone-input-2";
import pt from 'react-phone-input-2/lang/pt.json';
import Swal from "sweetalert2";
import * as yup from "yup";
import { Container } from "../../styles/addCard";
import { useGlobal } from "../../utils/contexts/global";
import { ButtonContainer } from "../Buttons/save";
import { addNewChannel } from "../../utils/persistData";
import Pusher from 'pusher-js';

const pusherConfig = {
  cluster: 'mt1',
  wsHost: '127.0.0.1',
  wsPort: '6001',
  encrypted:false,
  enabledTransports: ['ws'],
  forceTLS: false
};

export default function FormNewChannel() {
  const { enqueueSnackbar } = useSnackbar();
  const { actionDone, setActionDone, setIsOpenChannel, setRefresh, refresh, channels, setChannels } = useGlobal();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: ""
    },
    validationSchema: yup.object().shape({
      name: yup.string().defined("Este campo é obrigatório"),
      description: yup.string().defined("Este campo é obrigatório")
    }),
    onSubmit: (
      {
        name,
        description
      },
      { setSubmitting, resetForm, setErrors }
    ) => {
      addNewChannel({
        name,
        description
      })
        .then(({ data }) => {
         /*  Pusher.logToConsole = true;
          const pusher = new Pusher('ABCDEFG', pusherConfig);
          const channel = pusher.subscribe('channels');
          channel.bind('new-channel', (singleChannel) => {
            setChannels([...channels, singleChannel.channel]);
          });
          console.log("CHANNEL: ", channels); */
          setSubmitting(false);
          setIsOpenChannel(false);
          setRefresh(!refresh);
          enqueueSnackbar(data.message, {
            variant: "success",
          });
        })
        .catch(({ response }) => {
          setSubmitting(false);
          if (response.status === 422) {
            if (response.data.errors.name) {
              setErrors({
                name: `${response.data.errors.name[0]}`,
              });
            }
            if (response.data.errors.description) {
              setErrors({
                description: `${response.data.errors.description[0]}`,
              });
            }
          } else {
            Swal.fire({
              text: `${
                response.mensagem
                  ? response.mensagem
                  : "Erro ao adicionar o canal de recepção"
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
        <div className="first form-control">
          <div className="label-control">
            <label htmlFor="client">Nome canal de recepção*</label>
          </div>
          <input
            className={formik.errors.name ? "client red-border" : "client "}
            id="name"
            type="text"
            placeholder="Escreva o nome do cliente"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="error">{formik.errors.name}</p>
          )}
        </div>

        <div className="form-control first">
        <div className="label-control">
          <label htmlFor="description"></label>
        </div>

        <textarea
          className={
            formik.errors.description
              ? "description red-border"
              : "description "
          }
          id="description"
          name="description"
          type="text"
          rows="10"
          placeholder="Escreva alguma coisa..."
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.description && formik.touched.description && (
          <p className="error">{formik.errors.description}</p>
        )}
      </div>
         <div className="form-button-control-divided">
           <div> </div>
        <ButtonContainer
          type="submit"
          disabled={
            formik.isSubmitting ||
            !!(formik.errors.name && formik.touched.name) ||
            !!(formik.errors.descripion && formik.touched.descripion)
          }
        >
          <span> {formik.isSubmitting ? "A guardar..." : "Guardar"} </span>
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
