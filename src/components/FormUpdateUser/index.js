import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Container } from "../../styles/addCard";
import { useGlobal } from "../../utils/contexts/global";
import { addNewUser } from "../../utils/persistData";
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

export default function FormUpdateUser() {
  const { enqueueSnackbar } = useSnackbar();
  const { actionDone, setActionDone, setIsOpenUser } = useGlobal();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const dropdownOptions = [
    { label: "Admninistrador", value: "admin" },
    { label: "Gerente", value: "manneger" },
    { label: "Agente", value: "agent" },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().defined("Este campo é obrigatório"),
      email: yup.string().defined("Este campo é obrigatório"),
      password: yup.string().defined("Este campo é obrigatório"),
    }),
    onSubmit: (
      { name, email, password, role },
      { setSubmitting, resetForm, setErrors }
    ) => {
      addNewUser({
        name,
        email,
        password,
        role,
      })
        .then(({ data }) => {
          setSubmitting(false);
          setActionDone(!actionDone);
          setIsOpenUser(false);
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
                  : "Erro ao adicionar utilizador"
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
          type="text"
          placeholder="Digite agluma coisa..."
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
          placeholder="Digite agluma coisa..."
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email && (
          <p className="error">{formik.errors.email}</p>
        )}
      </div>

      <div className="form-control">
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
        {/* {passwordVisibility ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="svg-eye"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              <path
                d="M9.99999 4.99992C13.1583 4.99992 15.975 6.77492 17.35 9.58325C15.975 12.3916 13.1583 14.1666 9.99999 14.1666C6.84166 14.1666 4.02499 12.3916 2.64999 9.58325C4.02499 6.77492 6.84166 4.99992 9.99999 4.99992ZM9.99999 3.33325C5.83333 3.33325 2.27499 5.92492 0.833328 9.58325C2.27499 13.2416 5.83333 15.8333 9.99999 15.8333C14.1667 15.8333 17.725 13.2416 19.1667 9.58325C17.725 5.92492 14.1667 3.33325 9.99999 3.33325ZM9.99999 7.49992C11.15 7.49992 12.0833 8.43325 12.0833 9.58325C12.0833 10.7333 11.15 11.6666 9.99999 11.6666C8.84999 11.6666 7.91666 10.7333 7.91666 9.58325C7.91666 8.43325 8.84999 7.49992 9.99999 7.49992ZM9.99999 5.83325C7.93333 5.83325 6.24999 7.51659 6.24999 9.58325C6.24999 11.6499 7.93333 13.3333 9.99999 13.3333C12.0667 13.3333 13.75 11.6499 13.75 9.58325C13.75 7.51659 12.0667 5.83325 9.99999 5.83325Z"
                fill="#636E72"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="svg-eye"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              <path
                d="M10 5.83333C12.3 5.83333 14.1667 7.7 14.1667 10C14.1667 10.5417 14.0583 11.05 13.8667 11.525L16.3 13.9583C17.5583 12.9083 18.55 11.55 19.1583 10C17.7167 6.34167 14.1583 3.75 9.99167 3.75C8.825 3.75 7.70834 3.95833 6.675 4.33333L8.475 6.13333C8.95 5.94167 9.45834 5.83333 10 5.83333ZM1.66667 3.55833L3.56667 5.45833L3.95 5.84167C2.56667 6.91667 1.48334 8.35 0.833336 10C2.275 13.6583 5.83334 16.25 10 16.25C11.2917 16.25 12.525 16 13.65 15.55L14 15.9L16.4417 18.3333L17.5 17.275L2.725 2.5L1.66667 3.55833ZM6.275 8.16667L7.56667 9.45834C7.525 9.63334 7.5 9.81667 7.5 10C7.5 11.3833 8.61667 12.5 10 12.5C10.1833 12.5 10.3667 12.475 10.5417 12.4333L11.8333 13.725C11.275 14 10.6583 14.1667 10 14.1667C7.7 14.1667 5.83334 12.3 5.83334 10C5.83334 9.34167 6 8.725 6.275 8.16667ZM9.86667 7.51667L12.4917 10.1417L12.5083 10.0083C12.5083 8.625 11.3917 7.50833 10.0083 7.50833L9.86667 7.51667Z"
                fill="#636E72"
              />
            </svg>
          )} */}
      </div>
      <div className="form-control">
        <div className="label-control">
          <div className="label">
            <label htmlFor="subject">Funcção*</label>
          </div>
        </div>
        {/* <select
            className={formik.errors.role ? "subject red-border" : "subject "}
            id="role"
            name="role"
            value={formik.values.role}
            onBlur={formik.handleBlur}
            onChange={async (e) => {
              const { value } = e.target;
              setFieldValue('role', value);
            }}
          >
            <option value="agent">Agente</option>
            <option value="manager">Gerente</option>
            <option value="admin">Administrador</option>
          </select> */}

        <Select
          styles={customStyles}
          classNamePrefix="select"
          label="Single select"
          isClearable
          isSearchable
          id="role"
          instanceId="role"
          options={dropdownOptions}
          onChange={async (option) => {
            if (option) {
              const { value } = option;
              formik.setFieldValue("role", value);
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
        <ButtonContainer
          type="submit"
          disabled={
            formik.isSubmitting ||
            !!(formik.errors.name && formik.touched.name) ||
            !!(formik.errors.email && formik.touched.email) ||
            !!(formik.errors.password && formik.touched.password)
          }
        >
          <span> {formik.isSubmitting ? "Guardando..." : "Guardar"} </span>
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
