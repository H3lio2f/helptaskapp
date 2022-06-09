import moment from 'moment';
import { useEffect, useState } from 'react';
import {Button, Typography } from '@mui/material';
import { useGlobal } from "../../utils/contexts/global";
import CardBase from "../AddCard/CardBase";
import FormReplyTask from "../FormReplyTask";
import { Container } from "./styles";
import { showTaskDetails } from "./../../utils/fetchData";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

import Link from 'next/link';

export default function ReplyDetails({task, taskId }) {
  const { setOpenReply, actionDone } = useGlobal();
  const [allReplies, setAllReplies] = useState([])

  useEffect(() => {
   setAllReplies(task.replies)
  }, [])

  const fetch = async() => {
    const task = await showTaskDetails(taskId);
    setAllReplies(task.data.replies);
  }
  useEffect(() => {
    fetch();
  }, [actionDone])


  return (
    <Container>
        <div className="reply-top">
          <span>Respostas</span>
        </div>
        <div className="reply-list">
          {allReplies.map((reply) => (
            <div key={reply.id} className="reply">
            {task.user?.photo ? (
                <img className="avatar" src={task.user.photo} />
              ) : (
                <span className="avatar">{reply.user_name?.charAt(0).toUpperCase()}</span>
            )}
              <div className="info">
                <p>De: {" "}
                  <strong>{reply.user_name}</strong> em <i>{`${moment(reply.created_at).format("DD")} de ${moment(reply.created_at).format("MMMM")} de ${moment(reply.created_at).format("YYYY")}, ${moment(reply.created_at).format("dddd")} as ${moment(reply.created_at).format("HH:MM")} min`} </i>
                </p>
                <p>
                  <span>Para:</span> <strong> {task.client.name} </strong> {"<"}{task.client.email1}{">"}{" "}
                  (cliente)
                </p>
                <div className="message">{reply.message}</div>
                <div className="attaches">
                  {/* <label>Anexos ({reply.files.length})</label> */}
                  <div className="list">
                    {reply?.files && reply?.files.map((file, index) => (
                      <Link key={index} href={file} passHref>
                        <a target="_blank">
                        <Button  style={{textTransform: 'capitalize', marginRight: '10px', padding: "5px"}} variant="none" size="small">
                          {/* <AttachFileOutlinedIcon size="small"  /> */}
                          <Typography style={{ color: "var(--primary)"}} variant="h7">anexo {index + 1}</Typography>
                        </Button>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <FormReplyTask taskId={task.id} />
      </Container>
  );
}
