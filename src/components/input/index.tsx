import { forwardRef, InputHTMLAttributes } from 'react';
import { FormComponent } from './styles';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  errorMessage?: string;
}

function CustomInputBase({ type, placeholder, ...props }: CustomInputProps, ref: any) {
  const id = props.id ?? props.name;

  return (
    <FormComponent errorMessage={props.errorMessage}>
      <label htmlFor={id}>{props.label}</label>
      <input type={type} placeholder={placeholder} {...props} ref={ref} />
      {props.errorMessage && <p>{props.errorMessage}</p>}
    </FormComponent>
  );
}

export const CustomInput = forwardRef(CustomInputBase);
