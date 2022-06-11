import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useEffect, useState } from 'react';
import PhoneInput from "react-phone-input-2";
import pt from 'react-phone-input-2/lang/pt.json';
import Select from "react-select";
import Swal from "sweetalert2";
import * as yup from "yup";
import { Container } from "../../styles/addCard";
import { useGlobal } from "../../utils/contexts/global";
import { ButtonContainer } from "../Buttons/save";
import { fetchAllGroups } from "./../../utils/fetchData";
/* import { addNewAgent } from "./../../utils/persistData"; */

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


export default function FormNewAgent() {
  const { enqueueSnackbar } = useSnackbar();
  const { actionDone, setActionDone, setIsOpenAgent } = useGlobal();
  const [groups, setGroups] = useState([]);
   const [optionsGroups, setOptionsGroups] = useState([]);

  useEffect(() => {
    fetchAllGroups().then((data) => {
      setGroups(data.data);
    });
    let newSet = new Set();
    groups.map((group) => {
      newSet.add({ label: group.name, value: group.id });
    });
    setOptionsGroups([...newSet]);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      country: "",
      city: "",
      phone: "",
      group_id: "",
      "user_id": ""
    },
    validationSchema: yup.object().shape({
      name: yup.string().defined("Este campo é obrigatório"),
      country: yup.string().defined("Este campo é obrigatório"),
      city: yup.string().defined("Este campo é obrigatório"),
      phone: yup.string().defined("Este campo é obrigatório"),
      //group_id: yup.string().defined("Este campo é obrigatório"),
    }),
    onSubmit: (
      {
        name,
        country,
        city,
        phone,
        group_id,
        user_id,
      },
      { setSubmitting, resetForm, setErrors }
    ) => {
      /* addNewAgent({
        name,
        country,
        city,
        phone,
        group_id: 1,
        user_id
      })
        .then(({ data }) => {
          setSubmitting(false);
          setActionDone(!actionDone);
          setIsOpenAgent(false);
          enqueueSnackbar(data.message, {
            variant: "success",
          });
        })
        .catch(({ response }) => {
          console.log(response);
          setSubmitting(false);
          if (response.status === 422) {
            if (response.data.errors.name) {
              setErrors({
                name: `${response.data.errors.name[0]}`,
              });
            }
            if (response.data.errors.country) {
              setErrors({
                country: `${response.data.errors.country[0]}`,
              });
            }if (response.data.errors.city) {
              setErrors({
                city: `${response.data.errors.city[0]}`,
              });
            }
            if (response.data.errors.group_id) {
              setErrors({
                group_id: `${response.data.errors.group_id[0]}`,
              });
            }
          } else {
            Swal.fire({
              text: `${
                response.mensagem
                  ? response.mensagem
                  : "Erro ao adicionar o agente"
              }`,
              icon: "error",
              confirmButtonColor: "var(--primary)",
            });
          }
        }); */
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
            <label htmlFor="subject">País*</label>
            </div>
          </div>
          <input
            className={formik.errors.country ? "subject red-border" : "subject "}
            id="country"
            type="text"
            placeholder="Digite agluma coisa..."
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
          <div className="label">
            <label htmlFor="subject">Cidade*</label>
            </div>
          </div>
          <input
            className={formik.errors.city ? "subject red-border" : "subject "}
            id="city"
            type="text"
            placeholder="Digite agluma coisa..."
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.city && formik.touched.city && (
            <p className="error">{formik.errors.city}</p>
          )}
       </div>
       <div className="phone">
            <div className="label-control">
              <label htmlFor="phone1">Número de telefone*</label>
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
          <div className="form-control">
          <div className="label-control">
          <div className="label">
            <label htmlFor="channel">Grupo</label>
            </div>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            label="Single select"
            isClearable
            isSearchable
            id="group_id"
            instanceId="group_id"
            options={optionsGroups}
            onChange={async (option) => {
              if (option) {
                const { value } = option;
                formik.setFieldValue("group_id", value);
                setActionDone(!actionDone);
              } else {
                formik.setFieldValue("group_id", "");
                setActionDone(!actionDone);
              }
            }}
          />
          {formik.errors.group_id && formik.touched.group_id && (
            <p className="error">{formik.errors.group_id}</p>
          )}
        </div>

         <div className="form-button-control-divided">
        <ButtonContainer
          type="submit"
          disabled={
            formik.isSubmitting ||
            !!(formik.errors.name && formik.touched.name) ||
            !!(formik.errors.country && formik.touched.country) ||
            !!(formik.errors.city && formik.touched.city) ||
            !!(formik.errors.phone && formik.touched.phone)
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
