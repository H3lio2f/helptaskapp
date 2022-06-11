import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import {  useState, } from "react";
import EditIcon from '@mui/icons-material/Edit';
import {  Button, MenuItem, TextField } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';


function Form({ client}) {
    const { enqueueSnackbar } = useSnackbar();
    const [editable, setEditable] = useState(false);

  const formik = useFormik({
    initialValues: {
      reference: client.reference,
      name: client.name,
      country: client.country,
      city: client.city,
      address: client.address,
      email1: client.email1,
      email2: client.email2,
      phone1: client.phone1,
      phone2: client.phone2,
      active: client.active,
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
      phone1: yup
        .number()
        .typeError("Número telefone invalido")
        .defined("Este campo é obrigatório"),
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
        active,
      },
      { setSubmitting, resetForm, setErrors,  }
    ) => {
      updateClient({
        id: client.id,
        reference,
        name,
        country,
        city,
        address,
        email1,
        email2,
        phone1,
        phone2,
        active,
      }).then(({ data }) => {
          setSubmitting(false);
          setActionDone(!actionDone);
          enqueueSnackbar(data.message, {
            variant: "success",
          });
        }).catch(( {response} ) => {
          setSubmitting(false);
          setActionDone(!actionDone);
          if (response?.status === 422) {
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
      <form onSubmit={formik.handleSubmit}>
          <div className="options">
          {editable ? (
            <button 
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
              <SaveAsIcon />
              {formik.isSubmitting ? "A guardar..." : "Guardar alterações"}
            </button>
          ): (
          <MenuItem  onClick={ () => setEditable(true)}>
            <EditIcon />
            Editar
          </MenuItem>
          )}
        </div>
        <div className="top-detail">
            <div className="photo">
              {!client.photo === null ? (
                  <img className="avatar" src={client.photo} />
              ) : (
                <div className="avatar">{`${client.name.charAt(0).toUpperCase()}${client.name.charAt(1).toUpperCase()}`}</div>
              )}
            </div>
            <div className="list-info">
              
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Referência"
                  defaultValue={client.reference}
                  value={formik.values.reference}
                  disabled={!editable}
                  InputProps={{
                    readOnly: !editable,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Nome do cliente"
                  error={Boolean(formik.errors.name)}
                  helperText={formik.errors.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  
                />
              </div>
              <div className="info">
              <TextField
                fullWidth
                  id="outlined-read-only-input"
                  label="País"
                  defaultValue={client.country}
                  value={formik.values.country}
                  disabled={!editable}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Cidade"
                  defaultValue={client.city}
                  value={formik.values.city}
                  disabled={!editable}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
              <TextField
                fullWidth
                  id="outlined-read-only-input"
                  label="Endereço"
                  defaultValue={client.address}
                  value={formik.values.address}
                  disabled={!editable}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Email Principal"
                  defaultValue={client.email1}
                  value={formik.values.email1}
                  disabled={!editable}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Email alternativo"
                  defaultValue={client.email2}
                  value={formik.values.email2}
                  disabled={!editable}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Telefone principal"
                  defaultValue={client.phone1}
                  value={formik.values.phone1}
                  disabled={!editable}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="info">
                <TextField
                  fullWidth
                  id="outlined-read-only-input"
                  label="Telefone alternativo"
                  defaultValue={client.phone2}
                  value={formik.values.phone2}
                  disabled={!editable}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              
            </div>
        </div>
      </form>
  );
}

export default Form;