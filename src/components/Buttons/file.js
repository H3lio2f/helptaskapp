import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  padding: 8px 15px;
  border-radius: 5px;
  color: var(--text-color);
  font-size: var(--font-size-7);
  width: 400px;
  cursor: pointer;
`;

const ButtonFile = (props) => {
  return (
    <Container>
      <input {...props} />
      <svg
        width="11"
        height="20"
        viewBox="0 0 11 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.83196 5.62496V14.4416C8.83196 16.1833 7.55116 17.7333 5.80994 17.9C3.80921 18.0916 2.13496 16.5333 2.13496 14.5833V4.28329C2.13496 3.19163 2.92186 2.19996 4.01012 2.09163C5.26581 1.96663 6.32059 2.94163 6.32059 4.16663V12.9166C6.32059 13.375 5.94388 13.75 5.48346 13.75C5.02304 13.75 4.64634 13.375 4.64634 12.9166V5.62496C4.64634 5.28329 4.36171 4.99996 4.01849 4.99996C3.67527 4.99996 3.39065 5.28329 3.39065 5.62496V12.8C3.39065 13.8916 4.17755 14.8833 5.26581 14.9916C6.5215 15.1166 7.57628 14.1416 7.57628 12.9166V4.30829C7.57628 2.56663 6.29547 1.01663 4.55425 0.849959C2.56189 0.658292 0.879272 2.21663 0.879272 4.16663V14.3916C0.879272 16.7833 2.63724 18.925 5.03141 19.15C7.78556 19.4 10.0877 17.2666 10.0877 14.5833V5.62496C10.0877 5.28329 9.80303 4.99996 9.45981 4.99996C9.11659 4.99996 8.83196 5.28329 8.83196 5.62496Z"
          fill="#636E72"
        />
      </svg>
    </Container>
  );
};

export { ButtonFile };
