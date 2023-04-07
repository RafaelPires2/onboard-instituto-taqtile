import styles from './styles.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  errorMessage?: string;
}

export function Input(props: InputProps) {
  const id = props.id ?? props.name;

  return (
    <>
      <label htmlFor={id}>{props.label}</label>
      <input className={styles.input} id={id} {...props} />
      {props.errorMessage && <p className={styles.error}>{props.errorMessage}</p>}
    </>
  );
}
