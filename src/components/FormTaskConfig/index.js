import { Container } from "../../styles/addCard";
import Item from "../Item/index";

const task_config = {
  priorities: [
    {
      id: 1,
      name: "baixa",
    },
    {
      id: 2,
      name: "média",
    },
    {
      id: 3,
      name: "urgente",
    },
  ],
  types: [
    {
      id: 1,
      name: "incidente",
    },
    {
      id: 2,
      name: "problema",
    },
    {
      id: 3,
      name: "informação",
    },
  ],
  channels: [
    {
      id: 1,
      name: "web",
    },
    {
      id: 2,
      name: "email",
    },
    {
      id: 3,
      name: "telefone",
    },
  ],
  groups: [
    {
      id: 1,
      name: "área técnica",
    },
    {
      id: 2,
      name: "departamento de finanças",
    },
  ],
  areas: [
    {
      id: 1,
      name: "Contabilidade e Auditoria",
    },
  ],
};

export default function FormTaskConfig() {
  return (
    <Container>
      <div className="form-group first-group">
        <div className="config-section">
          <label>Prioridades</label>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00008 0.666504C4.40008 0.666504 0.666748 4.39984 0.666748 8.99984C0.666748 13.5998 4.40008 17.3332 9.00008 17.3332C13.6001 17.3332 17.3334 13.5998 17.3334 8.99984C17.3334 4.39984 13.6001 0.666504 9.00008 0.666504ZM13.1667 9.83317H9.83342V13.1665H8.16675V9.83317H4.83342V8.1665H8.16675V4.83317H9.83342V8.1665H13.1667V9.83317Z"
              fill="#3498DB"
            />
          </svg>
        </div>
        <div className="line"></div>
        <div className="config-list">
          {task_config.priorities.map((priority) => (
            <Item key={priority.id} {...priority} />
          ))}
        </div>
      </div>

      <div className="form-group first-group">
        <div className="config-section">
          <label>Tipos de tarefas</label>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00008 0.666504C4.40008 0.666504 0.666748 4.39984 0.666748 8.99984C0.666748 13.5998 4.40008 17.3332 9.00008 17.3332C13.6001 17.3332 17.3334 13.5998 17.3334 8.99984C17.3334 4.39984 13.6001 0.666504 9.00008 0.666504ZM13.1667 9.83317H9.83342V13.1665H8.16675V9.83317H4.83342V8.1665H8.16675V4.83317H9.83342V8.1665H13.1667V9.83317Z"
              fill="#3498DB"
            />
          </svg>
        </div>
        <div className="line"></div>
        <div className="config-list">
          {task_config.types.map((priority) => (
            <Item key={priority.id} {...priority} />
          ))}
        </div>
      </div>

      <div className="form-group first-group">
        <div className="config-section">
          <label>Canal de recepção</label>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00008 0.666504C4.40008 0.666504 0.666748 4.39984 0.666748 8.99984C0.666748 13.5998 4.40008 17.3332 9.00008 17.3332C13.6001 17.3332 17.3334 13.5998 17.3334 8.99984C17.3334 4.39984 13.6001 0.666504 9.00008 0.666504ZM13.1667 9.83317H9.83342V13.1665H8.16675V9.83317H4.83342V8.1665H8.16675V4.83317H9.83342V8.1665H13.1667V9.83317Z"
              fill="#3498DB"
            />
          </svg>
        </div>
        <div className="line"></div>
        <div className="config-list">
          {task_config.channels.map((priority) => (
            <Item key={priority.id} {...priority} />
          ))}
        </div>
      </div>

      <div className="form-group first-group">
        <div className="config-section">
          <label>Grupos</label>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00008 0.666504C4.40008 0.666504 0.666748 4.39984 0.666748 8.99984C0.666748 13.5998 4.40008 17.3332 9.00008 17.3332C13.6001 17.3332 17.3334 13.5998 17.3334 8.99984C17.3334 4.39984 13.6001 0.666504 9.00008 0.666504ZM13.1667 9.83317H9.83342V13.1665H8.16675V9.83317H4.83342V8.1665H8.16675V4.83317H9.83342V8.1665H13.1667V9.83317Z"
              fill="#3498DB"
            />
          </svg>
        </div>
        <div className="line"></div>
        <div className="config-list">
          {task_config.groups.map((priority) => (
            <Item key={priority.id} {...priority} />
          ))}
        </div>
      </div>

      <div className="form-group first-group">
        <div className="config-section">
          <label>Áreas do(a): </label>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.00008 0.666504C4.40008 0.666504 0.666748 4.39984 0.666748 8.99984C0.666748 13.5998 4.40008 17.3332 9.00008 17.3332C13.6001 17.3332 17.3334 13.5998 17.3334 8.99984C17.3334 4.39984 13.6001 0.666504 9.00008 0.666504ZM13.1667 9.83317H9.83342V13.1665H8.16675V9.83317H4.83342V8.1665H8.16675V4.83317H9.83342V8.1665H13.1667V9.83317Z"
              fill="#3498DB"
            />
          </svg>
        </div>
        <div className="line"></div>
        <div className="config-list">
          {task_config.areas.map((priority) => (
            <Item key={priority.id} {...priority} />
          ))}
        </div>
      </div>
    </Container>
  );
}
