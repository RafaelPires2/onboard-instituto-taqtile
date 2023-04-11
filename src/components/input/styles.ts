import styled from 'styled-components';

interface FormComponentProps {
  errorMessage?: string;
}

export const FormComponent = styled.form<FormComponentProps>`
  margin-bottom: 16px;
  width: 100%;

  p {
    color: red;
    font-size: 12px;
  }
  label {
    color: #777777;
    font-size: 12px;
  }

  input {
    margin-top: 12px;
    width: 100%;
    height: 47px;
    border: 1px solid #777777;
    border-radius: 8px;

    padding: 8px;
    font-size: 16px;
    margin-bottom: 8px;
    ::placeholder {
      color: #777777;
      color: ${(props) => (props.errorMessage ? 'red' : 'inherit')};
    }
    color: ${(props) => (props.errorMessage ? 'red' : 'inherit')};
    border-color: ${(props) => (props.errorMessage ? 'red' : 'inherit')};
  }
`;
