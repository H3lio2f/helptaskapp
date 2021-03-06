import moment from 'moment';
import { Button } from '@mui/material';
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import dynamic from 'next/dynamic';
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
  fetchUserLogged,
  fetchAreasOfGroup
} from "../../utils/fetchData";

import { addNewTask } from "../../utils/persistData";
import { ButtonContainer } from "../Buttons/save";
const FormNewChannel = dynamic( () => import('../FormNewChannel'));
const FormNewClient = dynamic( () => import('../FormNewClient'));
const FormNewGroup = dynamic( () => import('../FormNewGroup'));
const FormNewType = dynamic( () => import('../FormNewType'));
const FormNewStatus = dynamic( () => import('../FormNewStatus'));
const Portal = dynamic( () => import('../Portal/Portal'));

import ToolTipIcon from "./../Icons/ToolTip";
import { SelftAttribuated} from './styles';
import {useRouter} from 'next/router';

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

export default function FormNewTask({ client }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { actionDone, setActionDone, setShowNewTask, setRefresh, refresh, isOpenGroup, setIsOpenGroup, isOpenChannel, setIsOpenChannel, isOpenType, setIsOpenType, isOpenClient, setIsOpenClient, isOpenStatus, setIsOpenStatus, setLoading, loading } = useGlobal();
  const [clients, setClients] = useState([]);
  const [users, setUsers] = useState([]);
  const [areasOfGroup, setAreasOfGroup] = useState([]);
  const [checked, setChecked] = useState(false);
  const [tommorrowDay, setTommorrowDay] = useState("");
  const [today, setToday] = useState("");
  const [groupId, setGroupId] = useState();

  const [optionsClients, setOptionsClients] = useState([]);
  const [optionsUsers, setOptionsUsers] = useState([]);
  const [optionsChannels, setOptionsChannels] = useState([]);
  const [optionsStatus, setOptionsStatus] = useState([]);
  const [optionsGroups, setOptionsGroups] = useState([]);
  const [optionsAreaOfGroups, setOptionsAreaOfGroups] = useState([]);
  const [optionsAgentsGroup, setOptionsAgentsGroup] = useState([]);
  const [optionsTypes, setOptionsTypes] = useState([]);
  const [enableStatus, setEnableStatus] = useState(false);

  const [userLogged, setUserLogged] = useState();

  const [files, setFiles] = useState();

  const handleAreasOfGroup = useCallback(
    (id) => {
      setLoading(true);
      fetchAreasOfGroup(id).then((data) => {
        let newSet = new Set();
        data.data.map((area) => {
          newSet.add({ label: area.name, value: area.id });
        });
        setOptionsAreaOfGroups([...newSet]);
        setLoading(false);
      });
    },
    [actionDone, refresh]
  );

  const fetchGroups = async () => {
    setLoading(true);
    const allGroups = await fetchAllGroups();
    let newSet = new Set();
    allGroups.data.map((group) => {
      newSet.add({ label: group.name, value: group.id });
    });
    setOptionsGroups([...newSet]);
    setLoading(false);
  }

  useEffect(() => {
    fetchGroups();
  }, [])
  useEffect(() => {
    fetchGroups();
  }, [refresh, actionDone])

  const fetchStatus = async () => {
    setLoading(true);
    const allStatus = await fetchAllStatus();
    let newSet = new Set();
    allStatus.data.map((statu) => {
      if(statu.id !== 5){
        newSet.add({ label: statu.name, value: statu.id });
      }
    });
    setOptionsStatus([...newSet]);
    setLoading(false);
  }

  const handleUserLogged = async () => {
    const user = await fetchUserLogged();
    setUserLogged(user.user);
  }

  useEffect(() => {
    fetchStatus();
    handleUserLogged();
  }, [])
  useEffect(() => {
    fetchStatus();
    handleUserLogged();
  }, [refresh, actionDone])


  useEffect(() => {
    fetchAllUsers().then((data) => {
      setUsers(data.data);
    });
    let newSet = new Set();
    users.map((user) => {
      if (userLogged.id === user.id) {
        newSet.add({ label: "(Eu mesmo)", value: userLogged.id });
      } else {
        newSet.add({ label: user.name, value: user.id });
      }
    });
    setOptionsUsers([...newSet]);
  }, [actionDone, refresh]);

  const fetchChannels = async () => {
    setLoading(true);
    const allChannels = await fetchAllChannels();
    let newSet = new Set();
    allChannels.data.map((channel) => {
      newSet.add({ label: channel.name, value: channel.id });
    });
    setOptionsChannels([...newSet]);
    setLoading(false);
  }

  useEffect(() => {
    fetchChannels();
  }, [])
  useEffect(() => {
    fetchChannels();
  }, [refresh, actionDone])

  const fetchClients = async () => {
    setLoading(true);
    const allClients = await fetchAllClients();
    let newSet = new Set();
    allClients.data.map((client) => {
      newSet.add({ label: client.name, value: client.id });
    });
    setOptionsClients([...newSet]);
    setLoading(false);
  }

  useEffect(() => {
    fetchClients();
  }, [])
  useEffect(() => {
    fetchClients();
  }, [refresh, actionDone])

  const fetchTypes = async () => {
    setLoading(true);
    const allTypes = await fetchAllTypes();
    let newSet = new Set();
    allTypes.data.map((type) => {
      newSet.add({ label: type.name, value: type.id });
    });
    setOptionsTypes([...newSet]);
    setLoading(false);
  }

  useEffect(() => {
    fetchTypes();
  }, [])
  useEffect(() => {
    fetchTypes();
  }, [refresh, actionDone])

  useEffect(() => {
    setLoading(true);
    fetchAreasOfGroup(groupId).then((data) => {
      setAreasOfGroup(data.data);
      setLoading(false);
    });
  }, [actionDone, actionDone]);


  useEffect(() => {
    let today = new Date();
    let formated = moment(today).format("YYYY-MM-DDTHH:MM");
    let plusOneDay = moment(today).add(1, 'days');
    setTommorrowDay(plusOneDay.format("YYYY-MM-DDTHH:MM"));
    setToday(formated);
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      user_id: "",
      client_id: router.pathname === "/clients/[id]" ? { label: `${client.name}`, value: `${client.id}`}: "",
      type_id: "",
      group_id: "",
      area_id: "",
      status_id: 4,
      dueDate: tommorrowDay,
      channel_id: "",
      agent_id: "",
      files: null
    },
    validationSchema: yup.object().shape({
      name: yup.string().defined("Este campo ?? obrigat??rio"),
      description: yup.string().defined("Este campo ?? obrigat??rio"),
      client_id: yup.string().defined("Este campo ?? obrigat??rio"),
      type_id: yup.string().defined("Este campo ?? obrigat??rio"),
      dueDate: yup.string().defined("Este campo ?? obrigat??rio"),
      channel_id: yup.string().defined("Este campo ?? obrigat??rio")
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
      addNewTask({
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
        status_id: status_id ? status_id : 4,
        files
      })
        .then(({ data }) => {
          resetForm({});
          setSubmitting(false);
          setActionDone(!actionDone);
          setRefresh(!refresh);
          setShowNewTask(false);
          enqueueSnackbar(data.message, {
            variant: "success",
          });
        })
        .catch(({response}) => {
          console.log(response);
          setSubmitting(false);
        });
    },
  });

  const handlePortalClient = () => {
    setIsOpenClient(true);
  }
  const handlePortalChannel = () => {
    setIsOpenChannel(true);
  }
  const handlePortalGroup = () => {
    setIsOpenGroup(true);
  }
  const handlePortalType = () => {
    setIsOpenType(true);
  }
  const handlePortalStatus = () => {
    setIsOpenStatus(true);
  }

  return (
    <>
    <Portal absolute={true} isOpen={isOpenClient} setIsOpen={setIsOpenClient}>
      <label>
        Adicionar novo cliente
      </label>
     <FormNewClient />
    </Portal>

    <Portal isOpen={isOpenChannel} setIsOpen={setIsOpenChannel}>
      <label>
        Adicionar novo canal de recep????o
      </label>
      <FormNewChannel />
    </Portal>

    <Portal isOpen={isOpenGroup} setIsOpen={setIsOpenGroup}>
      <label>
        Adicionar novo group
      </label>
      <FormNewGroup/>
    </Portal>

    <Portal isOpen={isOpenType} setIsOpen={setIsOpenType}>
      <label>
        Adicionar novo tipo de tarefa
      </label>
      <FormNewType />
    </Portal>

    <Portal isOpen={isOpenStatus} setIsOpen={setIsOpenStatus}>
      <label>
        Adicionar novo estado para as tarefas
      </label>
      <FormNewStatus />
    </Portal>

    <Container onSubmit={formik.handleSubmit}>
      <div className="form-control">
        <div className="label-control">
          <div className="label">
            <label htmlFor="channel">Cliente</label>
            <div className="tooltip" datatooltip="indiv??duo que solicita a tarefa">
              <ToolTipIcon />
            </div>
          </div>
          <svg
            id="svg-add-portal"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handlePortalClient}
          >
            <path
              d="M9.00008 0.666504C4.40008 0.666504 0.666748 4.39984 0.666748 8.99984C0.666748 13.5998 4.40008 17.3332 9.00008 17.3332C13.6001 17.3332 17.3334 13.5998 17.3334 8.99984C17.3334 4.39984 13.6001 0.666504 9.00008 0.666504ZM13.1667 9.83317H9.83342V13.1665H8.16675V9.83317H4.83342V8.1665H8.16675V4.83317H9.83342V8.1665H13.1667V9.83317Z"
              fill="#3498DB"
            />
          </svg>
        </div>
        {router.pathname === "/clients/[id]" ? (
          <Select
          styles={customStyles}
          classNamePrefix="select"
          placeholder="Selecione um clinte existente"
          isClearable
          isSearchable
          id="client_id"
          instanceId="client_id"
          isDisabled={router.pathname === "/clients/[id]"}
          value={formik.values.client_id}
          options={optionsClients}
          isLoading={loading}
          noOptionsMessage={() => 'Sem clientes!'}
          onChange={(option) => {
            if (option) {
              formik.setFieldValue("client_id", option.value);
            } else {
              formik.setFieldValue("client_id", "");
            }
          }}
        />
        ) : (
          <Select
          styles={customStyles}
          classNamePrefix="select"
          placeholder="Selecione um clinte existente"
          isClearable
          isSearchable
          id="client_id"
          instanceId="client_id"
          options={optionsClients}
          isLoading={loading}
          noOptionsMessage={() => 'Sem clientes!'}
          onChange={(option) => {
            if (option) {
              formik.setFieldValue("client_id", option.value);
            } else {
              formik.setFieldValue("client_id", "");
            }
          }}
        />
        )}

        {formik.errors.client_id && formik.touched.client_id && (
          <p className="error">{formik.errors.client_id}</p>
        )}
      </div>

      <div className="form-control-divided">
        <div className="form-control">
          <div className="label-control">
          <div className="label">
            <label htmlFor="channel">Grupo</label>
            <div className="tooltip" datatooltip="grupo de utilizador">
              <ToolTipIcon />
            </div>
            </div>
            <svg
              id="svg-add-portal"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handlePortalGroup}
            >
              <path
                d="M9.00008 0.666504C4.40008 0.666504 0.666748 4.39984 0.666748 8.99984C0.666748 13.5998 4.40008 17.3332 9.00008 17.3332C13.6001 17.3332 17.3334 13.5998 17.3334 8.99984C17.3334 4.39984 13.6001 0.666504 9.00008 0.666504ZM13.1667 9.83317H9.83342V13.1665H8.16675V9.83317H4.83342V8.1665H8.16675V4.83317H9.83342V8.1665H13.1667V9.83317Z"
                fill="#3498DB"
              />
          </svg>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            placeholder="Selecione um grupo"
            isClearable
            isSearchable
            id="group_id"
            instanceId="group_id"
            options={optionsGroups}
            isLoading={loading}
            noOptionsMessage={() => 'Sem grupo de utilizadores!'}
            onChange={async (option) => {
              if (option) {
                setRefresh(!refresh);
                const { value } = option;
                formik.setFieldValue("area_id", "");
                formik.setFieldValue("agent_id", "");
                formik.setFieldValue("group_id", value);
                setGroupId(value);
                handleAreasOfGroup(value);
                setActionDone(!actionDone);
              } else {
                setRefresh(!refresh);
                formik.setFieldValue("group_id", "");
                formik.setFieldValue("area_id", "");
                formik.setFieldValue("agent_id", "");
                setOptionsAreaOfGroups([]);
                setOptionsAgentsGroup([]);
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
            <label htmlFor="channel">??rea</label>
            <div className="tooltip" datatooltip="??rea naqual pertence o grupo de utilizador">
              <ToolTipIcon />
            </div>
            </div>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            placeholder="Selecione uma ??rea"
            isClearable
            isSearchable
            id="area_id"
            instanceId="area_id"
            isDisabled={!formik.values.group_id}
            options={optionsAreaOfGroups}
            isLoading={loading}
            noOptionsMessage={() => 'Sem ??reas!'}
            onChange={(option) => {
              if (option) {
                formik.setFieldValue("area_id", option.value);
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
          <div className="tooltip" datatooltip="assunto da tarefa">
            <ToolTipIcon />
          </div>
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
            <label htmlFor="channel">Canal de recep????o</label>
            <div className="tooltip" datatooltip="meio naqual o cliente solocita a tarefa">
              <ToolTipIcon />
            </div>
            </div>
            <svg
              id="svg-add-portal"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handlePortalChannel}
            >
              <path
                d="M9.00008 0.666504C4.40008 0.666504 0.666748 4.39984 0.666748 8.99984C0.666748 13.5998 4.40008 17.3332 9.00008 17.3332C13.6001 17.3332 17.3334 13.5998 17.3334 8.99984C17.3334 4.39984 13.6001 0.666504 9.00008 0.666504ZM13.1667 9.83317H9.83342V13.1665H8.16675V9.83317H4.83342V8.1665H8.16675V4.83317H9.83342V8.1665H13.1667V9.83317Z"
                fill="#3498DB"
            />
          </svg>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            placeholder="Por qual canal a terefa foi recebida?"
            isClearable
            isSearchable
            id="channel_id"
            instanceId="channel_id"
            options={optionsChannels}
            isLoading={loading}
            noOptionsMessage={() => 'Sem canias de recep????o!'}
            onChange={(option) => {
              if (option) {
                formik.setFieldValue("channel_id", option.value);
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
            <div
              className="tooltip"
              datatooltip="tipo de tarefa: ex: incidente, informa????o"
            >
              <ToolTipIcon />
            </div>
            </div>
            <svg
              id="svg-add-portal"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handlePortalType}
            >
              <path
                d="M9.00008 0.666504C4.40008 0.666504 0.666748 4.39984 0.666748 8.99984C0.666748 13.5998 4.40008 17.3332 9.00008 17.3332C13.6001 17.3332 17.3334 13.5998 17.3334 8.99984C17.3334 4.39984 13.6001 0.666504 9.00008 0.666504ZM13.1667 9.83317H9.83342V13.1665H8.16675V9.83317H4.83342V8.1665H8.16675V4.83317H9.83342V8.1665H13.1667V9.83317Z"
                fill="#3498DB"
            />
          </svg>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            placeholder="Qual ?? o tipo da tarefa?"
            isClearable
            isSearchable
            id="type_id"
            instanceId="type_id"
            options={optionsTypes}
            isLoading={loading}
            noOptionsMessage={() => 'Sem tipos de tarefa!'}
            onChange={(option) => {
              if (option) {
                formik.setFieldValue("type_id", option.value);
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
            <label htmlFor="client">Atribuir </label>
            <div
              className="tooltip"
              datatooltip="indiv??duo indicado para execu????o da tarefa"
            >
              <ToolTipIcon />
            </div>
            </div>
          </div>
          <Select
            styles={customStyles}
            classNamePrefix="select"
            label="Single select"
            isClearable
            isSearchable
            id="user_id"
            instanceId="user_id"
            placeholder="selecione o utilizador"
            isDisabled={checked}
            options={optionsUsers}
            isLoading={loading}
            noOptionsMessage={() => 'Sem utilizadores!'}
            onChange={(option) => {
             if (option) {
                formik.setFieldValue("user_id", option.value);
                setEnableStatus(true);
              } else {
                formik.setFieldValue("user_id", "");
                formik.setFieldValue("status_id", 4);
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
            <div className="tooltip" datatooltip="estado da tarefa">
              <ToolTipIcon />
            </div>
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
            options={optionsStatus}
            isLoading={loading}
            isDisabled={!formik.values.user_id}
            noOptionsMessage={() => 'Nenhum estado para as tarefas!'}
            onChange={(option) => {
              if (option) {
                formik.setFieldValue("status_id", option.value);
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
            <div className="tooltip" datatooltip="tempo estimado para conclus??o da tarefa">
              <ToolTipIcon />
            </div>
            </div>
          </div>
          <input
            className={formik.errors.dueDate ? "subject red-border" : "subject "}
            id="dueDate"
            type="datetime-local"
            min={today}
            name="dueDate"
            value={formik.values.dueDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.dueDate && formik.touched.dueDate && (
            <p className="error">{formik.errors.dueDate}</p>
          )}
        </div>
      </div>

      <div className="form-control first">
        <div className="label-control">
        <div className="label">
          <label htmlFor="description"></label>
          <div className="tooltip" datatooltip="mais descri????o sobre a tarefa">
            <ToolTipIcon />
          </div>
          </div>
        </div>

        <textarea
          className={
            formik.errors.description
              ? "description red-border"
              : "description "
          }
          resize="false"
          id="description"
          name="description"
          type="text"
          rows="6"
          placeholder="Mais descri????o sobre a tarefa..."
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.description && formik.touched.description && (
          <p className="error">{formik.errors.description}</p>
        )}
      </div>
        <div className="form-button-control-divided">
          <div>
            <input
              style={{ display: 'none' }}
              id="files"
              multiple
              name="files"
              type="file"
              onChange={event => {
                formik.setFieldValue('files', event.target.files);
                setFiles(event.target.files.length);
              }}
            />
            <label style={{ display: 'flex', alignItems: "center"}} htmlFor="files">
              <Button variant="raised" component="span" >
                {files ? `${files} ${files > 0 ? 'anexos' : 'anexo'} ${files > 0 ? 'carregados' : 'carregado'}` : "Carregar anexos (Opcional)"}
              </Button>
            </label>
          </div>
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
          <span> {formik.isSubmitting ? "A guardar..." : "Guardar"} </span>
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
    </>
  );
}
