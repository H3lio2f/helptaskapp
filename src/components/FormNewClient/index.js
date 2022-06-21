import { Button } from '@mui/material';
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import PhoneInput from "react-phone-input-2";
import pt from 'react-phone-input-2/lang/pt.json';
import Swal from "sweetalert2";
import * as yup from "yup";
import { Container } from "../../styles/addCard";
import { useGlobal } from "../../utils/contexts/global";
import { addNewClient } from "../../utils/persistData";
import { ButtonContainer } from "../Buttons/save";

export default function FormNewClient() {
  const { enqueueSnackbar } = useSnackbar();
  const { actionDone, setActionDone, setIsOpenClient, setRefresh, refresh } = useGlobal();

  const formik = useFormik({
    initialValues: {
      reference: "",
      name: "",
      country: "",
      city: "",
      address: "",
      email1: "",
      email2: "",
      phone1: "",
      phone2: "",
      photo: null
    },
    validationSchema: yup.object().shape({
      reference: yup.string().defined("Este campo é obrigatório"),
      name: yup.string().defined("Este campo é obrigatório"),
      address: yup.string().defined("Este campo é obrigatório"),
      country: yup.string().defined("Este campo é obrigatório"),
      city: yup.string().defined("Este campo é obrigatório"),
      email1: yup
        .string()
        .defined("Este campo é obrigatório")
        .email("Este email não é inválido!"),
      email2: yup
        .string()
        .email("Este email não é inválido!"),
      phone1: yup
        .string()
        .typeError("Número telefone invalido")
        .defined("Este campo é obrigatório"),
      phone2: yup
        .string()
        .typeError("Número telefone invalido")
    }),
    onSubmit: (
      {
        reference,
        name,
        country,
        city,
        address,
        email1,
        email2,
        phone1,
        phone2,
        photo,
      },
      { setSubmitting, resetForm, setErrors }
    ) => {
      addNewClient({
        reference,
        name,
        country,
        city,
        address,
        email1,
        email2,
        phone1,
        phone2,
        photo
      })
        .then(({ data }) => {
          setSubmitting(false);
          setIsOpenClient(false);
          setRefresh(!refresh);
          setActionDone(!actionDone);
          resetForm({});
          enqueueSnackbar(data.message, {
            variant: "success",
          });
        })
        .catch(({ response }) => {
          console.log(response);
          setSubmitting(false);
          if (response.status === 422) {
            console.log(response);
            if (response.data.errors.reference) {
              setErrors({
                reference: `${response.data.errors.reference[0]}`,
              });
            }
          } else {
            Swal.fire({
              text: `${
                response.mensagem
                  ? response.mensagem
                  : "Erro ao adicionar o cliente"
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
      <div className="first form-control-divided">
        <div className="form-control">
          <div className="label-control">
            <label htmlFor="client">Referência*</label>
          </div>
          <input
            className={
              formik.errors.reference ? "client red-border" : "client "
            }
            id="reference"
            type="text"
            placeholder="Escreva o código de referência do cliente"
            value={formik.values.reference}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.reference && formik.touched.reference && (
            <p className="error">{formik.errors.reference}</p>
          )}
        </div>
        <div className="form-control">
          <div className="label-control">
            <label htmlFor="client">Nome completo*</label>
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
      </div>

      <div className="form-group">
        <label>Localização</label>
        <div className="line"></div>
        <div className="form-control-divided">
          <div className="form-control">
            <div className="label-control">
              <label htmlFor="client">País*</label>
            </div>
            <input
              className={
                formik.errors.country ? "client red-border" : "client "
              }
              id="country"
              type="text"
              placeholder="Escreva o nome do cliente"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.country && formik.touched.country && (
              <p className="error">{formik.errors.country}</p>
            )}
          </div>
          <div className="form-control">
            <div className="label-control">
              <label htmlFor="client">Cidade*</label>
            </div>
            <input
              className={formik.errors.city ? "client red-border" : "client "}
              id="city"
              type="text"
              placeholder="Escreva o nome do cliente"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.city && formik.touched.city && (
              <p className="error">{formik.errors.city}</p>
            )}
          </div>
        </div>
        <div className="form-control">
          <div className="label-control">
            <label htmlFor="address">Morada</label>
          </div>
          <input
            className={formik.errors.address ? "red-border" : " "}
            id="address"
            name="address"
            type="text"
            placeholder="Escreva a morada"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.address && formik.touched.address && (
            <p className="error">{formik.errors.address}</p>
          )}
        </div>
      </div>

      <div className="form-group">
        <label>Contactos</label>
        <div className="line"></div>
        <div className="form-control-divided">
          <div className="form-control">
            <div className="label-control">
              <label htmlFor="email1">E-mail*</label>
            </div>
            <input
              className={formik.errors.email1 ? "red-border" : " "}
              id="email1"
              type="email1"
              placeholder="example@email.com"
              value={formik.values.email1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email1 && formik.touched.email1 && (
              <p className="error">{formik.errors.email1}</p>
            )}
          </div>
          <div className="form-control">
            <div className="label-control">
              <label htmlFor="other-email">E-mail alternativo</label>
            </div>
            <input
              id="other-email"
              type="email"
              name="email2"
              placeholder="example@email.com"
              value={formik.values.email2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="form-control-divided">
          <div className="phone">
            <div className="label-control">
              <label htmlFor="phone1">Número de telefone*</label>
            </div>
            <PhoneInput
              localization={pt}
              inputClass={formik.errors.phone1 ? "red-border" : " "}
              enableSearch={false}
              name="phone1"
              country={"ao"}
              value={formik.values.phone1}
              onBlur={formik.handleBlur}
              placeholder="Telefone"
              onChange={ value => formik.setFieldValue('phone1', value)}
            />
            {formik.errors.phone1 && formik.touched.phone1 && (
              <p className="error">{formik.errors.phone1}</p>
            )}
          </div>
          <div className=" phone">
            <div className="label-control">
              <label htmlFor="other-phone">
                Número de telefone alternativo
              </label>
            </div>
            <PhoneInput
              localization={pt}
              country={"ao"}
              value={formik.values.phone2}
              onBlur={formik.handleBlur}
              placeholder="Telefone"
              onChange={ value => formik.setFieldValue('phone2', value)}
            />
          </div>
        </div>
      </div>

      <div className="form-button-control-divided">
        <div>
        <input
          style={{ display: 'none' }}
          onChange={event => {
              formik.setFieldValue('photo', event.target.files[0]);
            }}
          name="photo"
          id="raised-button-file"
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button variant="raised" component="span" >
            Carregar fotografia (Opcional)
          </Button>
        </label>
        </div>

        <ButtonContainer
          type="submit"
          disabled={
            formik.isSubmitting ||
            !!(formik.errors.name && formik.touched.name) ||
            !!(formik.errors.address && formik.touched.address) ||
            !!(formik.errors.country && formik.touched.country) ||
            !!(formik.errors.city && formik.touched.city) ||
            !!(formik.errors.email1 && formik.touched.email1) ||
            !!(formik.errors.phone1 && formik.touched.phone1)
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
