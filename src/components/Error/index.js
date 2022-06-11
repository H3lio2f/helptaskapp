import Head from "next/head";
import {destroyCookie } from "nookies";
import { Button, Divider, IconButton, Typography } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

import Image from 'next/image'
import { useRouter} from 'next/router';

import { Container } from "./styles";

export default function Error({ text}) {
    const router = useRouter();
    const handleReloadServer = () => {
        destroyCookie(null, "token");
        router.reload();
    }
 
  return (
    <>
      <Head>
        <title>Helptask - Erro </title>
        <meta name="description" content="Helptask - Página Incial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="error-info">
            <div className="illustration">
                <Image
                    src="/95614-error-occurred.gif"
                    alt="Picture of the author"
                    width={120}
                    height={120}
                />
            </div>
            <div className="line">
            </div>
            <div className="content">
                <span>Alguma coisa errada aconteceu!</span>
                <Button onClick={() => handleReloadServer()} size="small" style={{ padding: "2px 10px", marginTop: "20px", border: "2px solid"}} variant="outlined">
                    <IconButton
                        size="small"
                        style={{ color: "var(--primary)"}}
                        disableRipple
                    >
                    <FlipCameraAndroidIcon />
                    <Typography  variant="h7" ml={1}>recarregar</Typography>
                    </IconButton>
                </Button>
            </div>
        </div>
    </Container>
    </>
  );
}
