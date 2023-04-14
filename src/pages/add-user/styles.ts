import styled from 'styled-components';

export const FormAddUser = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: start;

  .containerButton {
    display: flex;
    gap: 10px;
  }
  label {
    color: white;
    font-size: 12px;
    margin-bottom: 12px;
  }

  select,
  option {
    width: 100%;
    height: 47px;
    border: 1px solid #777777;
    border-radius: 8px;

    padding: 8px;
    font-size: 16px;
    margin-bottom: 8px;
    ::placeholder {
      color: #777777;
    }
  }
`;

export const ContainerFormAddUser = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(29, 29, 29, 0.932);
  z-index: 1;
  position: fixed;
  top: 70px;
  width: 100vw;
  height: 100vh;

  h1 {
    color: white;
    margin-bottom: 20px;
    margin-top: 70px;
  }
`;
