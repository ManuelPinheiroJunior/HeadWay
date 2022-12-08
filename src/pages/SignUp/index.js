import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cref, setCref] = useState("");
  const [password, setPassword] = useState("");
  console.log("🚀 ~ file: index.js:11 ~ SignUp ~ password", password);
  const [categoria, setCategoria] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleChangeSelectCategoria(e) {
    setCategoria(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (nome !== "" && email !== "" && password !== "") {
      signUp(email, password, nome, categoria);
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <h1>𝐻𝑒𝒶𝒹𝒲𝒶𝓎</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar Conta</h1>
          <label>Usuário</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required=""
          />
          <label>Email</label>
          <input
            type="text"
            placeholder="exemplo@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Categoria</label>
          <select value={categoria} onChange={handleChangeSelectCategoria}>
            <option value="Aluno">Aluno</option>
            <option value="Instrutor">Instrutor</option>
            <option value="Secretária">Secretária</option>
          </select>
          {categoria === "Instrutor" && (
            <>
              <label>CREF</label>
              <input
                type="text"
                placeholder="Número Registro CREF"
                value={cref}
                onChange={(e) => setCref(e.target.value)}
              />
            </>
          )}
          <label>Senha</label>
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="labela">
            <text>Número de caracteres: Minímo 6</text>
          </div>

          <button type="submit">
            {loadingAuth ? "Carregando..." : "Cadastrar"}
          </button>
        </form>

        <Link to="/">Já tem uma conta? Entre</Link>
      </div>
    </div>
  );
}

export default SignUp;
