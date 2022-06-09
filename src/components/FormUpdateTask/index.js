import moment from 'moment';
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import * as yup from "yup";
import { Container } from "../../styles/addCard";
import { useAuth } from "../../utils/contexts/auth";
import { useGlobal } from "../../utils/contexts/global";
import {
  fetchAllChannels,
  fetchAllClients,
  fetchAllGroups,
  fetchAllStatus,
  fetchAllTypes,
  fetchAllUsers,
  fetchAgentsGroup,
  fetchAreasOfGroup
} from "../../utils/fetchData";
import { updateTask } from "../../utils/persistData";
import { ButtonContainer } from "../Buttons/save";
import { SelftAttribuated} from './styles';

const customStyles = {
  control: (styles, { isDisabled} ) => ({
    ...styles,
    backgroundColor: isDisabled ? "var(--gray-2)" : "white",
    cursor: isDisabled ? 'not-allowed' : 'default',
    marginTop: "10px",
    border: "1px solid var(--text-color)",
    fontSize: "var(--font-size-7)",
  }),
  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      color: "var(--text-color)",
      cursor: isDisabled ? 'not-allowed' : 'default',
      fontSize: "var(--font-size-7)",
    };
  },
};

const FormUpdateTask = ({ task }) => {
  const { user: userAuthenticated } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { actionDone, setActionDone, groups, status, users } = useGlobal();
  const [channels, setChannels] = useState([]);
  const [clients, setClients] = useState([]);
  const [areasOfGroup, setAreasOfGroup] = useState([]);
  const [checked, setChecked] = useState(false);
  const [tommorrowDay, setTommorrowDay] = useState("");

  const [optionsClients, setOptionsClients] = useState([]);
  const [optionsUsers, setOptionsUsers] = useState([]);
  const [optionsChannels, setOptionsChannels] = useState([]);
  const [optionsStatus, setOptionsStatus] = useState([]);
  const [optionsGroups, setOptionsGroups] = useState([]);
  const [optionsAreaOfGroups, setOptionsAreaOfGroups] = useState([]);
  const [optionsAgentsGroup, setOptionsAgentsGroup] = useState([]);
  const [optionsTypes, setOptionsTypes] = useState([]);
  const [enableStatus, setEnableStatus] = useState(false);

  const handleAreasOfGroup = useCallback(
    (id) => {
      fetchAreasOfGroup(id).then((data) => {
        let newSet = new Set();
        data.data.map((area) => {
          newSet.add({ label: area.name, value: area.id });
        });
        setOptionsAreaOfGroups([...newSet]);
      });
    },
    []
  );


  useEffect(() => {
    fetchAllGroups().then(data => {
      let newSet = new Set();
      data.data.map((group) => {
        newSet.add({ label: group.name, value: group.id });
      });
      setOptionsGroups([...newSet]);
    })
  }, []);

  useEffect(() => {
    let newSet = new Set();
    status.map((statu) => {
      if(statu.id !== 5){
        newSet.add({ label: statu.name, value: statu.id });
      }
    });
    setOptionsStatus([...newSet]);
  }, []);

  useEffect(() => {
    fetchAllTypes().then((data) => {
      let newSet = new Set();
        data.data.map((type) => {
          newSet.add({ label: type.name, value: type.id });
        });
        setOptionsTypes([...newSet]);
      });
  }, []);


  useEffect(() => {
    let newSet = new Set();
    users.map((user) => {
      if (userAuthenticated.id === user.id) {
        newSet.add({ label: "(EU)", value: user.id });
      } else {
        newSet.add({ label: user.name, value: user.id });
      }
    });
    setOptionsUsers([...newSet]);
  }, []);

  useEffect(() => {
    fetchAllChannels().then((data) => {
      setChannels(data.data);
    });
    let newSet = new Set();
    channels.map((channel) => {
      newSet.add({ label: channel.name, value: channel.id });
    });
    setOptionsChannels([...newSet]);
  }, []);

  useEffect(() => {
    fetchAllClients().then((data) => {
      setClients(data.data);
    });
    let newSet = new Set();
    clients.map((client) => {
      newSet.add({ label: client.name, value: client.id });
    });
    setOptionsClients([...newSet]);
  }, []);



  useEffect(() => {
    fetchAreasOfGroup(task.group.id).then((data) => {
      setAreasOfGroup(data.data);
    });
  }, []);

  useEffect(() => {
    let today = new Date();
    let plusOneDay = moment(today).add(1, 'days');
    setTommorrowDay(plusOneDay.format("YYYY-MM-DDTHH:MM"));
  }, [])


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: task.name,
      description: task.description,
      user_id: task.user ? { label: `${task.user.name}`, value: `${task.user.id}`}: "",
      client_id: { label: `${task.client.name}`, value: `${task.client.id}`},
      type_id: { label: `${task.type.name}`, value: `${task.type.id}`},
      group_id: task.group ? { label: `${task.group.name}`, value: `${task.group.id}`} : '',
      area_id: task.area ? { label: `${task.area.name}`, value: `${task.area.id}`}: "",
      status_id: { label: `${task.status.name}`, value: `${task.status.id}`},
      dueDate: moment(task.dueDate).format("YYYY-MM-DDTHH:MM"),
      channel_id: { label: `${task.channel.name}`, value: `${task.channel.id}`},
      files: null,
      agent_id: ""
    },
    validationSchema: yup.object().shape({
      name: yup.string().defined("Este campo é obrigatório"),
      description: yup.string().defined("Este campo é obrigatório"),
      client_id: yup.object().defined("Este campo é obrigatório"),
      type_id: yup.object().defined("Este campo é obrigatório"),
      dueDate: yup.string().defined("Este campo é obrigatório"),
      channel_id: yup.object().defined("Este campo é obrigatório")
    }),
    onSubmit: (
      {
        name,
        description,
        user_id,
        client_id,
        type_id,
        group_id,
        area_id,
        dueDate,
        channel_id,
        agent_id,
        status_id,
        files
      },
      { setSubmitting, resetForm }
    ) => {
      updateTask({
        id: task.id,
        name,
        description,
        user_id,
        client_id,
        type_id,
        group_id,
        area_id,
        dueDate,
        channel_id,
        agent_id,
        status_id,
        files
      })
        .then(({ data }) => {
          setSubmitting(false);
          setActionDone(!actionDone);
          enqueueSnackbar(data.message, {
            variant: "success",
          });
        })
        .catch(({response}) => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Container style={{ width: "85%", margin: "0 auto", background: "var(--gray-4)", padding: "20px 50px"}} onSubmit={formik.handleSubmit}>
      <div className="form-control">
        <div className="label-control">
          <div className="label">
            <label htmlFor="channel">Cliente</label>
          </div>
        </div>
        <Select
          styles={customStyles}
          classNamePrefix="select"
          placeholder="Selecione um clinte existente"
          isClearable
          isSearchable
          id="client_id"
          instanceId="client_id"
          isDisabled={true}
          value={formik.values.client_id}
          options={optionsClients}
          noOptionsMessage={() => 'Sem clientes!'}
          onChange={(option) => {
            if (option) {
              formik.setFieldValue("client_id", {label: option.label, value:option.value});
            } else {
              formik.setFieldValue("client_id", "");
            }
          }}
        />
        {formik.errors.client_id && formik.touched.client_id && (
          <p className="error">{formik.errors.client_id}</p>
        )}
      </div>

      <div className="form-control-divided">
        <div className="form-control">
          <div className="label-control">
          <div className="label">
            <label htmlFor="channel">Grupo</label>
            </div>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            placeholder="Selecione um grupo"
            isClearable
            isSearchable
            id="group_id"
            instanceId="group_id"
            value={formik.values.group_id}
            options={optionsGroups}
            noOptionsMessage={() => 'Sem clientes!'}
            onChange={async (option) => {
              if (option) {
                formik.setFieldValue("area_id", "");
                formik.setFieldValue("agent_id", "");
                formik.setFieldValue("group_id", {label: option.label, value: option.value});
                handleAreasOfGroup(option.value);
                setActionDone(!actionDone);
              } else {
                formik.setFieldValue("group_id", "");
                formik.setFieldValue("area_id", "");
                formik.setFieldValue("agent_id", "");
                setOptionsAreaOfGroups([]);
                setOptionsAgentsGroup([]);
                setActionDone(!actionDone);
              }
            }}
          />
          {formik.errors.group_id && formik.touched.group_id && (
            <p className="error">{formik.errors.group_id}</p>
          )}
        </div>
        <div className="form-control">
          <div className="label-control">
          <div className="label">
            <label htmlFor="channel">Área</label>
            </div>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            placeholder="Selecione uma área"
            isClearable
            isSearchable
            id="area_id"
            instanceId="area_id"
            value={formik.values.area_id}
            options={optionsAreaOfGroups}
            noOptionsMessage={() => 'Sem áreas!'}
            onChange={(option) => {
              if (option) {
                formik.setFieldValue("area_id", {label: option.label, value: option.value});
              } else {
                formik.setFieldValue("area_id", "");
              }
            }}
          />
        </div>
      </div>

      <div className="form-control">
        <div className="label-control">
        <div className="label">
          <label htmlFor="subject">Assunto</label>
          </div>
        </div>
        <input
          className={formik.errors.name ? "subject red-border" : "subject "}
          id="name"
          type="text"
          placeholder="Digite o assunto da tarefa..."
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name && (
          <p className="error">{formik.errors.name}</p>
        )}
      </div>

      <div className="form-control-divided">
        <div className="form-control">
          <div className="label-control">
          <div className="label">
            <label htmlFor="channel">Canal de recepção</label>
            </div>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            placeholder="Por qual canal a terefa foi recebida?"
            isClearable
            isSearchable
            id="channel_id"
            isDisabled={true}
            value={formik.values.channel_id}
            instanceId="channel_id"
            options={optionsChannels}
            onChange={(option) => {
              if (option) {
                formik.setFieldValue("channel_id", {label: option.label, value:option.value});
              } else {
                formik.setFieldValue("channel_id", "");
              }
            }}
          />
          {formik.errors.channel_id && formik.touched.channel_id && (
            <p className="error">{formik.errors.channel_id}</p>
          )}
        </div>
        <div className="form-control">
          <div className="label-control">
          <div className="label">
            <label htmlFor="task-type">Tipo de tarefa</label>
            </div>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            placeholder="Qual é o tipo da tarefa?"
            isClearable
            isSearchable
            id="type_id"
            instanceId="type_id"
            value={formik.values.type_id}
            options={optionsTypes}
            onChange={(option) => {
              if (option) {
                formik.setFieldValue("type_id", {label: option.label, value:option.value});
              } else {
                formik.setFieldValue("type_id", "");
              }
            }}
          />
          {formik.errors.type_id && formik.touched.type_id && (
            <p className="error">{formik.errors.type_id}</p>
          )}
        </div>
      </div>
      <div className="form-control-divided">
        <div className="form-control">
          <div className="label-control">
          <div className="label">
            <label htmlFor="client">Atribuir a</label>
            </div>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            label="Single select"
            isClearable
            isSearchable
            id="agent_id"
            instanceId="agent_id"
            isDisabled={true}
            value={formik.values.user_id}
            options={optionsAgentsGroup}
            onChange={(option) => {
              if (option) {
                formik.setFieldValue("agent_id", option.value);
                setEnableStatus(true);
              } else {
                formik.setFieldValue("agent_id", "");

              }
            }}
          />
          {formik.errors.user_id && formik.touched.user_id && (
            <p className="error">{formik.errors.user_id}</p>
          )}
        </div>

      <div className="form-control">
          <div className="label-control">
          <div className="label">
            <label htmlFor="channel">Estatdo da tarefa</label>
            </div>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            placeholder="Em que estado se encontra esta tarefa?"
            placeholher="ssss"
            isClearable
            isSearchable
            id="status_id"
            instanceId="status_id"
            value={formik.values.status_id}
            options={optionsStatus}
            onChange={(option) => {
              if (option) {
                formik.setFieldValue("status_id",{ label: option.label, value: option.value} );
              } else {
                formik.setFieldValue("status_id", "");
              }
            }}
          />
          {formik.errors.status_id && formik.touched.status_id && (
            <p className="error">{formik.errors.status_id}</p>
          )}
        </div>
      </div>


      <div className="form-control-divided">
      <div className="form-control">
          <div className="label-control">
          <div className="label">
            <label htmlFor="subject">Prazo</label>
            </div>
          </div>
          <input
            className={formik.errors.dueDate ? "subject red-border" : "subject "}
            id="dueDate"
            type="datetime-local"
            name="dueDate"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.dueDate && formik.touched.dueDate && (
            <p className="error">{formik.errors.dueDate}</p>
          )}
        </div>
        <div className="form-controls" style={{ display: "none"}}>
            <SelftAttribuated htmlFor="attribuated_at">
            <input
              id="attribuated_at"
              type="checkbox"
              value={formik.values.user_id}
              onBlur={formik.handleBlur}
              checked={checked}
              onChange={(option) => {
                setChecked(!checked);
                if (checked) {
                  formik.setFieldValue("agent_id", "");
                  formik.setFieldValue("group_id", "");
                } else {
                  formik.setFieldValue("user_id", "");
                }
              }}
              />
            <div className="label-control">
              <div className="label">
                <label htmlFor="attribuated_at">Atribuir a mim mesmo </label>
              </div>
            </div>

            </SelftAttribuated>
        </div>
      </div>

      <div className="form-control first">
        <div className="label-control">
        <div className="label">
          <label htmlFor="description"></label>
          </div>
        </div>

        <textarea
          className={
            formik.errors.description
              ? "description red-border"
              : "description "
          }
          resize={false}
          id="description"
          name="description"
          type="text"
          rows="6"
          placeholder="Mais descrição sobre a tarefa..."
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.description && formik.touched.description && (
          <p className="error">{formik.errors.description}</p>
        )}
      </div>
        <div className="form-button-control-divided">
          <input
            id="files"
            multiple
            name="files"
            type="file"
            onChange={event => {
              formik.setFieldValue('files', event.target.files);
            }}
          />
        <ButtonContainer
          type="submit"
          disabled={
            formik.isSubmitting ||
            !!(formik.errors.name && formik.touched.name) ||
            !!(formik.errors.description && formik.touched.description) ||
            !!(formik.errors.client_id && formik.touched.client_id) ||
            !!(formik.errors.type_id && formik.touched.type_id) ||
            !!(formik.errors.dueDate && formik.touched.dueDate) ||
            !!(formik.errors.channel_id && formik.touched.channel_id)
          }
        >
          <span> {formik.isSubmitting ? "A Editar..." : "Editar"} </span>
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
        </ButtonContainer>
      </div>
    </Container>
  );
};

export default FormUpdateTask;
