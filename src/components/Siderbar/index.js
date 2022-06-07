import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Item } from "./styles";

export default function Sidebar() {
  const router = useRouter();

  return (
    <Container>
      <div className="logo">
        <svg
          width="124"
          height="18"
          viewBox="0 0 124 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.325 1.35C11.4583 1.1 11.6833 0.924999 12 0.824999C12.3167 0.724999 12.7167 0.674999 13.2 0.674999C13.6833 0.674999 14.0667 0.716666 14.35 0.799999C14.6333 0.883332 14.85 0.983332 15 1.1C15.15 1.21667 15.2667 1.38333 15.35 1.6C15.4333 1.88333 15.475 2.31667 15.475 2.9V16.775C15.475 17.1583 15.4583 17.45 15.425 17.65C15.4083 17.8333 15.3333 18.05 15.2 18.3C14.9667 18.75 14.3167 18.975 13.25 18.975C12.0833 18.975 11.4 18.6667 11.2 18.05C11.1 17.7667 11.05 17.3333 11.05 16.75V11.675H4.425V16.775C4.425 17.1583 4.40833 17.45 4.375 17.65C4.35833 17.8333 4.28333 18.05 4.15 18.3C3.91667 18.75 3.26667 18.975 2.2 18.975C1.03333 18.975 0.35 18.6667 0.15 18.05C0.0500001 17.7667 7.07805e-08 17.3333 7.07805e-08 16.75V2.875C7.07805e-08 2.49167 0.00833339 2.20833 0.025 2.025C0.0583334 1.825 0.141667 1.6 0.275 1.35C0.508333 0.899999 1.15833 0.674999 2.225 0.674999C3.39167 0.674999 4.08333 0.983332 4.3 1.6C4.38333 1.88333 4.425 2.31667 4.425 2.9V8H11.05V2.875C11.05 2.49167 11.0583 2.20833 11.075 2.025C11.1083 1.825 11.1917 1.6 11.325 1.35ZM21.9055 14.575H29.6055C29.9888 14.575 30.2721 14.5917 30.4555 14.625C30.6555 14.6417 30.8805 14.7167 31.1305 14.85C31.5805 15.0833 31.8055 15.7333 31.8055 16.8C31.8055 17.9667 31.4971 18.65 30.8805 18.85C30.5971 18.95 30.1638 19 29.5805 19H19.6805C18.5138 19 17.8305 18.6833 17.6305 18.05C17.5305 17.7833 17.4805 17.3583 17.4805 16.775V2.875C17.4805 2.025 17.6388 1.45 17.9555 1.15C18.2721 0.833332 18.8721 0.674999 19.7555 0.674999H29.6055C29.9888 0.674999 30.2721 0.691666 30.4555 0.725C30.6555 0.741666 30.8805 0.816666 31.1305 0.949998C31.5805 1.18333 31.8055 1.83333 31.8055 2.9C31.8055 4.06667 31.4971 4.75 30.8805 4.95C30.5971 5.05 30.1638 5.1 29.5805 5.1H21.9055V7.625H26.8555C27.2388 7.625 27.5221 7.64167 27.7055 7.675C27.9055 7.69167 28.1305 7.76667 28.3805 7.9C28.8305 8.13333 29.0555 8.78333 29.0555 9.85C29.0555 11.0167 28.7388 11.7 28.1055 11.9C27.8221 12 27.3888 12.05 26.8055 12.05H21.9055V14.575ZM37.8479 15.3H44.6479C45.1979 15.3 45.5979 15.3667 45.8479 15.5C46.0979 15.6167 46.2645 15.8083 46.3479 16.075C46.4312 16.3417 46.4729 16.7 46.4729 17.15C46.4729 17.5833 46.4312 17.9333 46.3479 18.2C46.2645 18.4667 46.1229 18.65 45.9229 18.75C45.6062 18.9167 45.1729 19 44.6229 19H35.6229C34.4562 19 33.7729 18.6833 33.5729 18.05C33.4729 17.7833 33.4229 17.3583 33.4229 16.775V2.875C33.4229 2.49167 33.4312 2.20833 33.4479 2.025C33.4812 1.825 33.5645 1.6 33.6979 1.35C33.9312 0.899999 34.5812 0.674999 35.6479 0.674999C36.8145 0.674999 37.5062 0.983332 37.7229 1.6C37.8062 1.88333 37.8479 2.31667 37.8479 2.9V15.3ZM61.6207 4.375C62.054 5.25833 62.2707 6.24167 62.2707 7.325C62.2707 8.40833 62.054 9.39167 61.6207 10.275C61.1874 11.1417 60.629 11.8333 59.9457 12.35C58.5624 13.4167 57.129 13.95 55.6457 13.95H52.5207V16.775C52.5207 17.1583 52.504 17.45 52.4707 17.65C52.454 17.8333 52.379 18.05 52.2457 18.3C52.0124 18.75 51.3624 18.975 50.2957 18.975C49.129 18.975 48.4457 18.6667 48.2457 18.05C48.1457 17.7667 48.0957 17.3333 48.0957 16.75V2.875C48.0957 2.49167 48.104 2.20833 48.1207 2.025C48.154 1.825 48.2374 1.6 48.3707 1.35C48.604 0.899999 49.254 0.674999 50.3207 0.674999H55.6707C57.1374 0.674999 58.5624 1.20833 59.9457 2.275C60.629 2.79167 61.1874 3.49167 61.6207 4.375ZM55.6707 9.525C56.1707 9.525 56.6624 9.34167 57.1457 8.975C57.629 8.60833 57.8707 8.05833 57.8707 7.325C57.8707 6.59167 57.629 6.04167 57.1457 5.675C56.6624 5.29167 56.1624 5.1 55.6457 5.1H52.5207V9.525H55.6707ZM71.522 1.22656V19H69.2026V1.22656H71.522ZM77.2349 1.22656V3.15527H63.502V1.22656H77.2349ZM85.4746 2.80127L79.5908 19H77.186L83.9609 1.22656H85.5112L85.4746 2.80127ZM90.4062 19L84.5103 2.80127L84.4736 1.22656H86.0239L92.8232 19H90.4062ZM90.1011 12.4204V14.3491H80.1157V12.4204H90.1011ZM104.676 14.5078C104.676 14.0928 104.611 13.7266 104.481 13.4092C104.359 13.0837 104.139 12.7907 103.822 12.5303C103.513 12.2699 103.081 12.0216 102.528 11.7856C101.983 11.5496 101.291 11.3096 100.453 11.0654C99.5737 10.805 98.7803 10.5161 98.0723 10.1987C97.3643 9.87321 96.758 9.50293 96.2534 9.08789C95.7489 8.67285 95.3623 8.19678 95.0938 7.65967C94.8252 7.12256 94.6909 6.50814 94.6909 5.81641C94.6909 5.12467 94.8333 4.48584 95.1182 3.8999C95.403 3.31396 95.8099 2.80534 96.3389 2.37402C96.876 1.93457 97.5148 1.59277 98.2554 1.34863C98.9959 1.10449 99.8219 0.982422 100.733 0.982422C102.068 0.982422 103.199 1.23877 104.127 1.75146C105.063 2.25602 105.775 2.91927 106.263 3.74121C106.751 4.55501 106.996 5.42578 106.996 6.35352H104.652C104.652 5.6862 104.509 5.09619 104.225 4.5835C103.94 4.06266 103.508 3.65576 102.931 3.36279C102.353 3.06169 101.62 2.91113 100.733 2.91113C99.8952 2.91113 99.2035 3.03727 98.6582 3.28955C98.113 3.54183 97.7061 3.88363 97.4375 4.31494C97.1771 4.74626 97.0469 5.23861 97.0469 5.79199C97.0469 6.16634 97.1242 6.50814 97.2788 6.81738C97.4416 7.11849 97.6898 7.39925 98.0234 7.65967C98.3652 7.92008 98.7965 8.16016 99.3174 8.37988C99.8464 8.59961 100.477 8.8112 101.209 9.01465C102.219 9.29948 103.089 9.61686 103.822 9.9668C104.554 10.3167 105.156 10.7114 105.628 11.1509C106.109 11.5822 106.463 12.0745 106.69 12.6279C106.926 13.1732 107.044 13.7917 107.044 14.4834C107.044 15.2077 106.898 15.8628 106.605 16.4487C106.312 17.0347 105.893 17.5352 105.348 17.9502C104.802 18.3652 104.147 18.6867 103.382 18.9146C102.625 19.1343 101.779 19.2441 100.843 19.2441C100.021 19.2441 99.2116 19.1302 98.4141 18.9023C97.6247 18.6745 96.9045 18.3327 96.2534 17.877C95.6105 17.4212 95.0938 16.8597 94.7031 16.1924C94.3206 15.5169 94.1294 14.7357 94.1294 13.8486H96.4731C96.4731 14.459 96.5911 14.9839 96.8271 15.4233C97.0632 15.8547 97.3846 16.2127 97.7915 16.4976C98.2065 16.7824 98.6745 16.994 99.1953 17.1323C99.7243 17.2625 100.274 17.3276 100.843 17.3276C101.665 17.3276 102.361 17.2137 102.931 16.9858C103.5 16.758 103.932 16.4325 104.225 16.0093C104.526 15.5861 104.676 15.0856 104.676 14.5078ZM112.403 1.22656V19H110.047V1.22656H112.403ZM123.133 1.22656L115.748 9.51514L111.598 13.8242L111.207 11.3096L114.332 7.86719L120.301 1.22656H123.133ZM120.863 19L114.283 10.333L115.687 8.46533L123.67 19H120.863Z"
            fill="white"
          />
        </svg>
      </div>
      <nav className="menu">
        <ul>
          <Item
            className={router.pathname === "/" ? "active" : ""}
          >
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M15.41 5.41L10.58 0.58C10.21 0.21 9.7 0 9.17 0H2C0.9 0 0.0100002 0.9 0.0100002 2L0 18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6.83C16 6.3 15.79 5.79 15.41 5.41ZM6.23 15.29L4.11 13.17C3.72 12.78 3.72 12.15 4.11 11.76C4.5 11.37 5.13 11.37 5.52 11.76L6.93 13.17L10.47 9.63C10.86 9.24 11.49 9.24 11.88 9.63C12.27 10.02 12.27 10.65 11.88 11.04L7.64 15.28C7.26 15.68 6.62 15.68 6.23 15.29ZM10 7C9.45 7 9 6.55 9 6V1.5L14.5 7H10Z"
                fill="white"
              />
            </svg>
            <Link href="/">
              <a> Tarefas </a>
            </Link>
          </Item>
          <Item
            className={router.pathname === "/clients" ? "active" : ""}
          >
            <svg
              width="24"
              height="12"
              viewBox="0 0 24 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M12 6.75C13.63 6.75 15.07 7.14 16.24 7.65C17.32 8.13 18 9.21 18 10.38V11C18 11.55 17.55 12 17 12H7C6.45 12 6 11.55 6 11V10.39C6 9.21 6.68 8.13 7.76 7.66C8.93 7.14 10.37 6.75 12 6.75ZM4 7C5.1 7 6 6.1 6 5C6 3.9 5.1 3 4 3C2.9 3 2 3.9 2 5C2 6.1 2.9 7 4 7ZM5.13 8.1C4.76 8.04 4.39 8 4 8C3.01 8 2.07 8.21 1.22 8.58C0.48 8.9 0 9.62 0 10.43V11C0 11.55 0.45 12 1 12H4.5V10.39C4.5 9.56 4.73 8.78 5.13 8.1ZM20 7C21.1 7 22 6.1 22 5C22 3.9 21.1 3 20 3C18.9 3 18 3.9 18 5C18 6.1 18.9 7 20 7ZM24 10.43C24 9.62 23.52 8.9 22.78 8.58C21.93 8.21 20.99 8 20 8C19.61 8 19.24 8.04 18.87 8.1C19.27 8.78 19.5 9.56 19.5 10.39V12H23C23.55 12 24 11.55 24 11V10.43ZM12 0C13.66 0 15 1.34 15 3C15 4.66 13.66 6 12 6C10.34 6 9 4.66 9 3C9 1.34 10.34 0 12 0Z"
                fill="white"
              />
            </svg>
            <Link href="/clients">
              <a> Clientes </a>
            </Link>
          </Item>
          <Item
            className={router.pathname === "/configurations" ? "active" : ""}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
            >
              <path
                d="M17.2233 10C17.2233 9.77 17.2133 9.55 17.1933 9.32L19.0533 7.91C19.4533 7.61 19.5633 7.05 19.3133 6.61L17.4433 3.38C17.1933 2.94 16.6533 2.76 16.1933 2.96L14.0433 3.87C13.6733 3.61 13.2833 3.38 12.8733 3.19L12.5833 0.88C12.5233 0.38 12.0933 0 11.5933 0H7.8633C7.3533 0 6.9233 0.38 6.8633 0.88L6.5733 3.19C6.1633 3.38 5.7733 3.61 5.4033 3.87L3.2533 2.96C2.7933 2.76 2.2533 2.94 2.0033 3.38L0.133298 6.62C-0.116702 7.06 -0.00670207 7.61 0.393298 7.92L2.2533 9.33C2.2333 9.55 2.2233 9.77 2.2233 10C2.2233 10.23 2.2333 10.45 2.2533 10.68L0.393298 12.09C-0.00670207 12.39 -0.116702 12.95 0.133298 13.39L2.0033 16.62C2.2533 17.06 2.7933 17.24 3.2533 17.04L5.4033 16.13C5.7733 16.39 6.1633 16.62 6.5733 16.81L6.8633 19.12C6.9233 19.62 7.3533 20 7.8533 20H11.5833C12.0833 20 12.5133 19.62 12.5733 19.12L12.8633 16.81C13.2733 16.62 13.6633 16.39 14.0333 16.13L16.1833 17.04C16.6433 17.24 17.1833 17.06 17.4333 16.62L19.3033 13.39C19.5533 12.95 19.4433 12.4 19.0433 12.09L17.1833 10.68C17.2133 10.45 17.2233 10.23 17.2233 10ZM9.7633 13.5C7.8333 13.5 6.2633 11.93 6.2633 10C6.2633 8.07 7.8333 6.5 9.7633 6.5C11.6933 6.5 13.2633 8.07 13.2633 10C13.2633 11.93 11.6933 13.5 9.7633 13.5Z"
                fill="white"
              />
            </svg>
            <Link href="/configurations">
              <a> Configurações </a>
            </Link>
          </Item>
        </ul>
      </nav>
      <div className="copy">
        <span>Powered by:</span>
        <p>Novatronica ST</p>
      </div>
    </Container>
  );
}