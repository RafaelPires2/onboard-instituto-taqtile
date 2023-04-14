import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.css';

type ButtonTypeProps = ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonContainerProps = {
  content: any;
  type: 'submit' | 'button' | 'reset';
} & ButtonTypeProps;

export function CustomButton({
  content,
  type,

  ...props
}: ButtonContainerProps) {
  return (
    <>
      <button type={type} {...props}>
        {content}
      </button>
    </>
  );
}
