import { Button } from '@mui/material';
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useState, useEffect } from 'react';
import PhoneInput from "react-phone-input-2";
import pt from 'react-phone-input-2/lang/pt.json';
import Select from "react-select";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Container } from "../../styles/addCard";
import { useGlobal } from "../../utils/contexts/global";
import { updateUser } from "../../utils/persistData";
import { ButtonContainer } from "../Buttons/save";

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    marginTop: "10px",
    border: "1px solid var(--text-color)",
    fontSize: "var(--font-size-7)",
  }),
  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      color: "var(--text-color)",
      fontSize: "var(--font-size-7)",
    };
  },
};

import useSWR from 'swr';
async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

export default function FormUpdateUser() {
  const { data: userLogged } = useSWR("/api/userLogged", fetcher, { revalidateOnMount: true, refreshInterval: 1000});
  const { enqueueSnackbar } = useSnackbar();
  const { refresh, setRefresh, setIsOpenUpdateUser } = useGlobal();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [preview, setPreview] = useState();

  const dropdownOptions = [
    { label: 'Admninistrador', value: 'admin' },
    { label: 'Gerente', value: 'manneger' },
    { label: 'Agente', value: 'agent' },
]

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userLogged?.user.name,
      email: userLogged?.user.email,
      role: { label: `${userLogged?.user.role}`, value: `${userLogged?.user.role}`},
      country: userLogged?.user.country,
      phone: userLogged?.user.phone,
      photo: null
    },
    validationSchema: yup.object().shape({
      name: yup.string().defined("Este campo é obrigatório"),
      email: yup.string().defined("Este campo é obrigatório"),
      country: yup.string().defined("Este campo é obrigatório"),
      role: yup.object().defined("Este campo é obrigatório"),
    }),
    onSubmit: (
      {
        name,
        email,
        password,
        role,
        country,
        phone,
        photo
      },
      { setSubmitting, resetForm, setErrors }
    ) => {
      updateUser({
        id: userLogged?.user.id,
        name,
        email,
        role,
        country,
        phone,
        photo
      })
        .then(({ data }) => {
          setSubmitting(false);
          setIsOpenUpdateUser(false);
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
            if (response.data.errors.email) {
              setErrors({
                email: `${response.data.errors.email[0]}`,
              });
            }
            if (response.data.errors.password) {
              setErrors({
                password: `${response.data.errors.password[0]}`,
              });
            }
            if (response.data.errors.country) {
              setErrors({
                country: `${response.data.errors.country[0]}`,
              });
            }
            if (response.data.errors.role) {
              setErrors({
                role: `${response.data.errors.role[0]}`,
              });
            }
          } else {
            Swal.fire({
              text: `${
                response.mensagem
                  ? response.mensagem
                  : "Erro ao adicionar o utilizador"
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
        <div className="form-control">
          <div className="label-control">
          <div className="label">
            <label htmlFor="subject">Nome completo*</label>
            </div>
          </div>
          <input
            className={formik.errors.name ? "subject red-border" : "subject "}
            id="name"
            name='name'
            type="text"
            placeholder="Escreva agluma coisa..."
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="error">{formik.errors.name}</p>
          )}
       </div>
       <div className="form-control">
          <div className="label-control">
          <div className="label">
            <label htmlFor="subject">Email*</label>
            </div>
          </div>
          <input
            className={formik.errors.email ? "subject red-border" : "subject "}
            id="email"
            type="email"
            placeholder="Escreva agluma coisa..."
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="error">{formik.errors.email}</p>
          )}
       </div>

       {/* <div className="form-control">
          <div className="label-control">
          <div className="label">
            <label htmlFor="subject">Palavra-Passe*</label>
            </div>
          </div>
          <input
            className={
              formik.errors.password ? "password red-border" : "password "
            }
            type={passwordVisibility ? "text" : "password"}
            name="password"
            placeholder="Palavra-passe"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="error">{formik.errors.password}</p>
          )}
        </div> */}
        <div className="form-control-divided">
          <div className="form-control">
            <div className="label-control">
              <label htmlFor="client">País*</label>
            </div>
            <input
              className={formik.errors.country ? "client red-border" : "client "}
              id="country"
              type="text"
              placeholder="Escreva o país"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.country && formik.touched.country && (
              <p className="error">{formik.errors.country}</p>
            )}
          </div>
          <div className="phone">
            <div className="label-control">
              <label htmlFor="phone">Número de telefone*</label>
            </div>
            <PhoneInput
              localization={pt}
              inputClass={formik.errors.phone ? "red-border" : " "}
              enableSearch={false}
              name="phone"
              country={"ao"}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              placeholder="Telefone"
              onChange={ value => formik.setFieldValue('phone', value)}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="error">{formik.errors.phone}</p>
            )}
          </div>
        </div>
        <div className="form-control" style={{ display: "none"}}>
          <div className="label-control">
          <div className="label">
            <label htmlFor="subject">Nível de acesso*</label>
            </div>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            placeholder="Selecione o nível de acesso"
            isClearable
            isSearchable
            id="role"
            instanceId="role"
            options={dropdownOptions}
            value={formik.values.role}
            noOptionsMessage={() => 'Sem nível de acesso!'}
            onChange={async (option) => {
              if (option) {
                const { value } = option;
                formik.setFieldValue("role", {label: option.label, value:option.value});
              } else {
                formik.setFieldValue("role", "");
              }
            }}
          />

          {formik.errors.role && formik.touched.role && (
            <p className="error">{formik.errors.role}</p>
          )}
       </div>

        <div className="form-button-control-divided">
        <div>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            onChange={event => {
                formik.setFieldValue('photo', event.target.files[0]);
                setPreview(URL.createObjectURL(event.target.files[0]));
              }}
            name="photo"
            id="raised-button-file"
            type="file"
          />
          <label style={{ display: 'flex', alignItems: "center"}} htmlFor="raised-button-file">
            {preview && (<img width="22px" height="22px" src={preview} alt="image" />)}
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
            !!(formik.errors.email && formik.touched.email) ||
            !!(formik.errors.country && formik.touched.country) ||
            !!(formik.errors.role && formik.touched.role)
          }
        >
          <span> {formik.isSubmitting ? "A guardar alterações..." : "Guardar"} </span>
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
