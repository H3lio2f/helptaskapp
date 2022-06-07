import Head from "next/head";
import ResetSuccessfully from "../../components/ResetSuccessfully/index";
import { Container } from "../../styles/pages/auth";

export default function index() {
  return (
    <>
      <Head>
        <title>Recuperação da palavra-passe</title>
        <meta
          name="description"
          content="Helptask - Recuperação da palavra-passe"
        />
      </Head>
      <Container>
        <ResetSuccessfully />

        <p className="copyright">
          Powered by{" "}
          <a
            href="https://www.novatronicast.com/"
            target="_blank"
            rel="noreferrer"
          >
            Novatronica ST
          </a>
        </p>
        <div className="footer">
          <span>Termos e condições</span>
          <span className="privacy">Política de privacidade</span>
        </div>
        <svg
          width="370"
          height="189"
          viewBox="0 0 370 189"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="svg-detail-bottom"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M369.785 189H146.215C149.829 130.405 198.495 84 258 84C317.505 84 366.171 130.405 369.785 189Z"
            fill="#3498DB"
            fillOpacity="0.52"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M248 180C248 183.018 247.926 186.019 247.779 189H0V13.2874C20.9802 4.72095 43.9387 0 68 0C167.411 0 248 80.5889 248 180Z"
            fill="#3498DB"
            fillOpacity="0.55"
          />
        </svg>
      </Container>
    </>
  );
}
