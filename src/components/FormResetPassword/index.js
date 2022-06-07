import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container } from "./styles";

export default function FormResetPassword() {
  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  return (
    <Container>
      <svg
        width="58"
        height="60"
        viewBox="0 0 58 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="svg-detail-top"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 60C36.9574 60 58 38.9574 58 13C58 8.49011 57.3648 4.12859 56.179 0H5C2.23857 0 0 2.23857 0 5V58.7057C3.52858 59.5519 7.21196 60 11 60Z"
          fill="#3498DB"
          fillOpacity="0.46"
        />
      </svg>

      <div className="wrapper">
        <p className="title">Redifinição da palavra-passe</p>
        <svg
          width="194"
          height="30"
          viewBox="0 0 194 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="svg-logo"
        >
          <path
            d="M18.227 1.466C18.435 1.076 18.786 0.802999 19.28 0.646998C19.774 0.490998 20.398 0.412998 21.152 0.412998C21.906 0.412998 22.504 0.477998 22.946 0.607998C23.388 0.737998 23.726 0.893998 23.96 1.076C24.194 1.258 24.376 1.518 24.506 1.856C24.636 2.298 24.701 2.974 24.701 3.884V25.529C24.701 26.127 24.675 26.582 24.623 26.894C24.597 27.18 24.48 27.518 24.272 27.908C23.908 28.61 22.894 28.961 21.23 28.961C19.41 28.961 18.344 28.48 18.032 27.518C17.876 27.076 17.798 26.4 17.798 25.49V17.573H7.463V25.529C7.463 26.127 7.437 26.582 7.385 26.894C7.359 27.18 7.242 27.518 7.034 27.908C6.67 28.61 5.656 28.961 3.992 28.961C2.172 28.961 1.106 28.48 0.794 27.518C0.638 27.076 0.56 26.4 0.56 25.49V3.845C0.56 3.247 0.573 2.805 0.599 2.519C0.651 2.207 0.781 1.856 0.989 1.466C1.353 0.763999 2.367 0.412998 4.031 0.412998C5.851 0.412998 6.93 0.893998 7.268 1.856C7.398 2.298 7.463 2.974 7.463 3.884V11.84H17.798V3.845C17.798 3.247 17.811 2.805 17.837 2.519C17.889 2.207 18.019 1.856 18.227 1.466ZM34.7325 22.097H46.7445C47.3425 22.097 47.7845 22.123 48.0705 22.175C48.3825 22.201 48.7335 22.318 49.1235 22.526C49.8255 22.89 50.1765 23.904 50.1765 25.568C50.1765 27.388 49.6955 28.454 48.7335 28.766C48.2915 28.922 47.6155 29 46.7055 29H31.2615C29.4415 29 28.3755 28.506 28.0635 27.518C27.9075 27.102 27.8295 26.439 27.8295 25.529V3.845C27.8295 2.519 28.0765 1.622 28.5705 1.154C29.0645 0.659998 30.0005 0.412998 31.3785 0.412998H46.7445C47.3425 0.412998 47.7845 0.438999 48.0705 0.491C48.3825 0.516999 48.7335 0.633999 49.1235 0.841998C49.8255 1.206 50.1765 2.22 50.1765 3.884C50.1765 5.704 49.6955 6.77 48.7335 7.082C48.2915 7.238 47.6155 7.316 46.7055 7.316H34.7325V11.255H42.4545C43.0525 11.255 43.4945 11.281 43.7805 11.333C44.0925 11.359 44.4435 11.476 44.8335 11.684C45.5355 12.048 45.8865 13.062 45.8865 14.726C45.8865 16.546 45.3925 17.612 44.4045 17.924C43.9625 18.08 43.2865 18.158 42.3765 18.158H34.7325V22.097ZM59.6026 23.228H70.2106C71.0686 23.228 71.6926 23.332 72.0826 23.54C72.4726 23.722 72.7327 24.021 72.8627 24.437C72.9926 24.853 73.0576 25.412 73.0576 26.114C73.0576 26.79 72.9926 27.336 72.8627 27.752C72.7327 28.168 72.5116 28.454 72.1996 28.61C71.7056 28.87 71.0296 29 70.1716 29H56.1316C54.3116 29 53.2456 28.506 52.9336 27.518C52.7776 27.102 52.6996 26.439 52.6996 25.529V3.845C52.6996 3.247 52.7126 2.805 52.7386 2.519C52.7906 2.207 52.9206 1.856 53.1286 1.466C53.4926 0.763999 54.5066 0.412998 56.1706 0.412998C57.9906 0.412998 59.0696 0.893998 59.4076 1.856C59.5376 2.298 59.6026 2.974 59.6026 3.884V23.228ZM96.6883 6.185C97.3643 7.563 97.7023 9.097 97.7023 10.787C97.7023 12.477 97.3643 14.011 96.6883 15.389C96.0123 16.741 95.1413 17.82 94.0753 18.626C91.9173 20.29 89.6813 21.122 87.3673 21.122H82.4923V25.529C82.4923 26.127 82.4663 26.582 82.4143 26.894C82.3883 27.18 82.2713 27.518 82.0633 27.908C81.6993 28.61 80.6853 28.961 79.0213 28.961C77.2013 28.961 76.1353 28.48 75.8233 27.518C75.6673 27.076 75.5893 26.4 75.5893 25.49V3.845C75.5893 3.247 75.6023 2.805 75.6283 2.519C75.6803 2.207 75.8103 1.856 76.0183 1.466C76.3823 0.763999 77.3963 0.412998 79.0603 0.412998H87.4063C89.6943 0.412998 91.9173 1.245 94.0753 2.909C95.1413 3.715 96.0123 4.807 96.6883 6.185ZM87.4063 14.219C88.1863 14.219 88.9533 13.933 89.7073 13.361C90.4613 12.789 90.8383 11.931 90.8383 10.787C90.8383 9.643 90.4613 8.785 89.7073 8.213C88.9533 7.615 88.1733 7.316 87.3673 7.316H82.4923V14.219H87.4063ZM112.134 1.27344V29H108.516V1.27344H112.134ZM121.046 1.27344V4.28223H99.623V1.27344H121.046ZM133.9 3.72998L124.722 29H120.97L131.539 1.27344H133.958L133.9 3.72998ZM141.594 29L132.396 3.72998L132.339 1.27344H134.757L145.364 29H141.594ZM141.118 18.7358V21.7446H125.541V18.7358H141.118ZM163.855 21.9922C163.855 21.3447 163.753 20.7734 163.55 20.2783C163.36 19.7705 163.017 19.3135 162.522 18.9072C162.04 18.501 161.367 18.1138 160.503 17.7456C159.653 17.3774 158.574 17.0029 157.266 16.6221C155.895 16.2158 154.657 15.7651 153.553 15.27C152.448 14.7622 151.502 14.1846 150.715 13.5371C149.928 12.8896 149.325 12.147 148.906 11.3091C148.487 10.4712 148.278 9.5127 148.278 8.43359C148.278 7.35449 148.5 6.35791 148.944 5.44385C149.389 4.52979 150.023 3.73633 150.849 3.06348C151.687 2.37793 152.683 1.84473 153.838 1.46387C154.994 1.08301 156.282 0.892578 157.704 0.892578C159.786 0.892578 161.551 1.29248 162.998 2.09229C164.458 2.87939 165.569 3.91406 166.331 5.19629C167.092 6.46582 167.473 7.82422 167.473 9.27148H163.817C163.817 8.23047 163.595 7.31006 163.15 6.51025C162.706 5.69775 162.033 5.06299 161.132 4.60596C160.23 4.13623 159.088 3.90137 157.704 3.90137C156.396 3.90137 155.317 4.09814 154.467 4.4917C153.616 4.88525 152.981 5.41846 152.562 6.09131C152.156 6.76416 151.953 7.53223 151.953 8.39551C151.953 8.97949 152.074 9.5127 152.315 9.99512C152.569 10.4648 152.956 10.9028 153.477 11.3091C154.01 11.7153 154.683 12.0898 155.495 12.4326C156.32 12.7754 157.304 13.1055 158.447 13.4229C160.021 13.8672 161.379 14.3623 162.522 14.9082C163.665 15.4541 164.604 16.0698 165.34 16.7554C166.089 17.4282 166.642 18.1963 166.997 19.0596C167.365 19.9102 167.549 20.875 167.549 21.9541C167.549 23.084 167.321 24.106 166.864 25.02C166.407 25.9341 165.753 26.7148 164.902 27.3623C164.052 28.0098 163.03 28.5112 161.836 28.8667C160.656 29.2095 159.335 29.3809 157.875 29.3809C156.593 29.3809 155.33 29.2031 154.086 28.8477C152.854 28.4922 151.731 27.959 150.715 27.248C149.712 26.5371 148.906 25.6611 148.297 24.6201C147.7 23.5664 147.402 22.3477 147.402 20.9639H151.058C151.058 21.916 151.242 22.7349 151.61 23.4204C151.979 24.0933 152.48 24.6519 153.115 25.0962C153.762 25.5405 154.492 25.8706 155.305 26.0864C156.13 26.2896 156.987 26.3911 157.875 26.3911C159.158 26.3911 160.243 26.2134 161.132 25.8579C162.021 25.5024 162.693 24.9946 163.15 24.3345C163.62 23.6743 163.855 22.8936 163.855 21.9922ZM175.909 1.27344V29H172.234V1.27344H175.909ZM192.648 1.27344L181.127 14.2036L174.652 20.9258L174.043 17.0029L178.918 11.6328L188.23 1.27344H192.648ZM189.106 29L178.842 15.4795L181.032 12.5659L193.486 29H189.106Z"
            fill="#3498DB"
          />
        </svg>
        <div className="form-control">
          <input
            className="password"
            type={passwordVisibility ? "text" : "password"}
            placeholder="Nova palavra-passe"
          />
          {passwordVisibility ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="svg-eye"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              <path
                d="M9.99999 4.99992C13.1583 4.99992 15.975 6.77492 17.35 9.58325C15.975 12.3916 13.1583 14.1666 9.99999 14.1666C6.84166 14.1666 4.02499 12.3916 2.64999 9.58325C4.02499 6.77492 6.84166 4.99992 9.99999 4.99992ZM9.99999 3.33325C5.83333 3.33325 2.27499 5.92492 0.833328 9.58325C2.27499 13.2416 5.83333 15.8333 9.99999 15.8333C14.1667 15.8333 17.725 13.2416 19.1667 9.58325C17.725 5.92492 14.1667 3.33325 9.99999 3.33325ZM9.99999 7.49992C11.15 7.49992 12.0833 8.43325 12.0833 9.58325C12.0833 10.7333 11.15 11.6666 9.99999 11.6666C8.84999 11.6666 7.91666 10.7333 7.91666 9.58325C7.91666 8.43325 8.84999 7.49992 9.99999 7.49992ZM9.99999 5.83325C7.93333 5.83325 6.24999 7.51659 6.24999 9.58325C6.24999 11.6499 7.93333 13.3333 9.99999 13.3333C12.0667 13.3333 13.75 11.6499 13.75 9.58325C13.75 7.51659 12.0667 5.83325 9.99999 5.83325Z"
                fill="#636E72"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="svg-eye"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              <path
                d="M10 5.83333C12.3 5.83333 14.1667 7.7 14.1667 10C14.1667 10.5417 14.0583 11.05 13.8667 11.525L16.3 13.9583C17.5583 12.9083 18.55 11.55 19.1583 10C17.7167 6.34167 14.1583 3.75 9.99167 3.75C8.825 3.75 7.70834 3.95833 6.675 4.33333L8.475 6.13333C8.95 5.94167 9.45834 5.83333 10 5.83333ZM1.66667 3.55833L3.56667 5.45833L3.95 5.84167C2.56667 6.91667 1.48334 8.35 0.833336 10C2.275 13.6583 5.83334 16.25 10 16.25C11.2917 16.25 12.525 16 13.65 15.55L14 15.9L16.4417 18.3333L17.5 17.275L2.725 2.5L1.66667 3.55833ZM6.275 8.16667L7.56667 9.45834C7.525 9.63334 7.5 9.81667 7.5 10C7.5 11.3833 8.61667 12.5 10 12.5C10.1833 12.5 10.3667 12.475 10.5417 12.4333L11.8333 13.725C11.275 14 10.6583 14.1667 10 14.1667C7.7 14.1667 5.83334 12.3 5.83334 10C5.83334 9.34167 6 8.725 6.275 8.16667ZM9.86667 7.51667L12.4917 10.1417L12.5083 10.0083C12.5083 8.625 11.3917 7.50833 10.0083 7.50833L9.86667 7.51667Z"
                fill="#636E72"
              />
            </svg>
          )}
        </div>
        <div className="form-control">
          <input
            className="password"
            type={passwordVisibility ? "text" : "password"}
            placeholder="Repetir palavra-passe"
          />
          {passwordVisibility ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="svg-eye"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              <path
                d="M9.99999 4.99992C13.1583 4.99992 15.975 6.77492 17.35 9.58325C15.975 12.3916 13.1583 14.1666 9.99999 14.1666C6.84166 14.1666 4.02499 12.3916 2.64999 9.58325C4.02499 6.77492 6.84166 4.99992 9.99999 4.99992ZM9.99999 3.33325C5.83333 3.33325 2.27499 5.92492 0.833328 9.58325C2.27499 13.2416 5.83333 15.8333 9.99999 15.8333C14.1667 15.8333 17.725 13.2416 19.1667 9.58325C17.725 5.92492 14.1667 3.33325 9.99999 3.33325ZM9.99999 7.49992C11.15 7.49992 12.0833 8.43325 12.0833 9.58325C12.0833 10.7333 11.15 11.6666 9.99999 11.6666C8.84999 11.6666 7.91666 10.7333 7.91666 9.58325C7.91666 8.43325 8.84999 7.49992 9.99999 7.49992ZM9.99999 5.83325C7.93333 5.83325 6.24999 7.51659 6.24999 9.58325C6.24999 11.6499 7.93333 13.3333 9.99999 13.3333C12.0667 13.3333 13.75 11.6499 13.75 9.58325C13.75 7.51659 12.0667 5.83325 9.99999 5.83325Z"
                fill="#636E72"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="svg-eye"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              <path
                d="M10 5.83333C12.3 5.83333 14.1667 7.7 14.1667 10C14.1667 10.5417 14.0583 11.05 13.8667 11.525L16.3 13.9583C17.5583 12.9083 18.55 11.55 19.1583 10C17.7167 6.34167 14.1583 3.75 9.99167 3.75C8.825 3.75 7.70834 3.95833 6.675 4.33333L8.475 6.13333C8.95 5.94167 9.45834 5.83333 10 5.83333ZM1.66667 3.55833L3.56667 5.45833L3.95 5.84167C2.56667 6.91667 1.48334 8.35 0.833336 10C2.275 13.6583 5.83334 16.25 10 16.25C11.2917 16.25 12.525 16 13.65 15.55L14 15.9L16.4417 18.3333L17.5 17.275L2.725 2.5L1.66667 3.55833ZM6.275 8.16667L7.56667 9.45834C7.525 9.63334 7.5 9.81667 7.5 10C7.5 11.3833 8.61667 12.5 10 12.5C10.1833 12.5 10.3667 12.475 10.5417 12.4333L11.8333 13.725C11.275 14 10.6583 14.1667 10 14.1667C7.7 14.1667 5.83334 12.3 5.83334 10C5.83334 9.34167 6 8.725 6.275 8.16667ZM9.86667 7.51667L12.4917 10.1417L12.5083 10.0083C12.5083 8.625 11.3917 7.50833 10.0083 7.50833L9.86667 7.51667Z"
                fill="#636E72"
              />
            </svg>
          )}
        </div>

        <div className="form-control">
          <input
            className="btn btn-signup"
            type="submit"
            value="Confirmar"
            onClick={() => router.push("/auth/resetSuccessfully")}
          />
        </div>
        <Link href="/auth/signup">
          <a className="redirect">
            Ainda não é um cliente? <span>Registe-se</span>
          </a>
        </Link>
      </div>
    </Container>
  );
}