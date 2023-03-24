import styles from "./styles.module.css";

export function LoginForm() {
  return (
    <>
      <form className={styles.formLogin}>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" placeholder="Digite seu email" />

        <label htmlFor="password">Senha</label>
        <input name="password" type="text" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}
