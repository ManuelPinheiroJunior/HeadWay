import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import "./signin.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log("π ~ file: index.js:10 ~ SignIn ~ password", password);

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      signIn(email, password);
    }
  }
  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <h1>π»ππΆπΉπ²πΆπ</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <label>UsuΓ‘rio</label>
          <input
            type="text"
            placeholder="exemplo@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Senha</label>
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {loadingAuth ? "Carregando..." : "Acessar"}
          </button>
        </form>

        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
}

export default SignIn;
