import styled from 'styled-components';

export const ContainerDetails = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(29, 29, 29, 0.932);
  z-index: 1;
  position: fixed;
  top: 70px;
  width: 100vw;
  height: 100vh;

  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr) ;
    height: 50%;
    background-color: rgba(29, 29, 29, 0.932);
    padding: 40px;
    margin-top: 150px;

    h3 {
      margin-bottom: 8px;

    }

    .boxData {
      margin-bottom: 20px;

      display: flex;
      flex-direction: column;
      align-items: left;
      justify-content: center;
      color: white;
      margin-inline:20px;
    }

    button {
      margin-top: 30px;
    }
  }
`;
