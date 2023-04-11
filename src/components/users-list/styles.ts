import styled from 'styled-components';

export const ContainerTable = styled.table`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(217, 185, 253, 0.705);
  justify-content: center;
  margin-top: 50px;
  padding: 40px;
  border: 1px solid #777777;


  thead,
  tr {
    text-align: left;
  }

  th,
  td {
    padding: 8px;
    border-bottom: 1px solid black;
  }

  .containerButton {
    display: flex;
    align-items: center;
    margin-top: 26px;
    gap: 12px;
  }
`;
