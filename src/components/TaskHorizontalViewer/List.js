import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { Container } from "./styles";

export default function List({ tasks}) {

  return (
    <Container>
    <ul>
      <li>Assunto</li>
      <li>Data</li>
      <li>Prazo</li>
      <li>Atribuiado a</li>
      <li>Respostas</li>
      <li>Tipo de tarefa</li>
      <li>Estado</li>
    </ul>
    {tasks.map(task => (
      <Link key={task.id} href={`/tasks/${task.id}`}>
       <a>
       <ul className="body" key={task.id}>
          <li>{task.name}</li>
          <li>{moment(task.created_at).format("DD/MM/YYYY HH:MM")}</li>
          <li>{moment(task.dueDate).format("DD/MM/YYYY HH:MM")}</li>
          <li>{task.user
              ? task.user_name
              : task.agent_id
              ? task.agent
              : task.group_id
              ? task.group
              : "nenhum/ninguem"}</li>
          <li>{task?.replies?.length ?? 0}</li>
          <li>{task.type.name}</li>
          <li>{task?.status?.name}</li>
       </ul>
       </a>
       </Link>
    ))}
    </Container>
  );
}
