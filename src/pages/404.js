import Head from "next/head";
import dynamic from 'next/dynamic';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { Container } from "../components/Error/styles";


import Image from 'next/image';
import { useRouter} from 'next/router';

export default function Custom404() {
    const router = useRouter();
    const handleReloadServer = () => {
        router.back();
    }
    return <>
      <Head>
        <title>Helptask - 404 Pagina não encontrada </title>
        <meta name="description" content="Helptask - Página Incial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="error-info">
            <div className="illustration">
                <Image
                    src="/98642-error-404.gif"
                    alt="Picture of the author"
                    width={180}
                    height={180}
                />
            </div>
            <div className="line">
            </div>
            <div className="content">
                <span>Página não encontrada!</span>
                <Button onClick={() => handleReloadServer()} size="small" style={{ padding: "2px 10px", marginTop: "20px", border: "2px solid"}} variant="outlined">
                    <IconButton
                        size="small"
                        style={{ color: "var(--primary)"}}
                        disableRipple
                    >
                    <FlipCameraAndroidIcon />
                    <Typography  variant="h7" ml={1}>retroceder</Typography>
                    </IconButton>
                </Button>
            </div>
        </div>
    </Container>
    </>
}
