import "./modal.css";

import { FiX } from "react-icons/fi";
import ab from "../../assets/ab.png";
import abc from "../../assets/abc.png";
import abcd from "../../assets/abcd.png";
import abcde from "../../assets/abcde.png";
import abcdef from "../../assets/abcdef.png";

export default function Modal({ conteudo, close }) {
  console.log("conteu", conteudo);

  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX size={23} color="#FFF" />
          Voltar
        </button>

        <div>
          <h2>Detalhes da Ficha</h2>

          <div className="row">
            <span>
              Cliente: <i>{conteudo.cliente}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Assunto: <i>{conteudo.assunto}</i>
            </span>
            <span>
              Tipo de Treino: <i>{conteudo.treino}</i>
            </span>
            <span>
              Cadastrado em: <i>{conteudo.createdFormated}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Status:{" "}
              <i
                style={{
                  color: "#FFF",
                  backgroundColor:
                    conteudo.status === "Ativo" ? "#5cb85c" : "#999",
                }}
              >
                {conteudo.status}
              </i>
            </span>
            {(conteudo.desempenho !== undefined ||
              conteudo.disciplina !== undefined ||
              conteudo.disciplina !== null) && (
              <span>
                Ultima atualização Desempenho: <i>{conteudo.desempenho}</i>
                Ultima atualização Disciplina:{" "}
                <i>
                  {conteudo?.disciplina == 1
                    ? conteudo?.disciplina + " dia"
                    : conteudo?.disciplina == 3
                    ? "todos" + " dias"
                    : "3" + " dias"}{" "}
                </i>
              </span>
            )}
          </div>
          <div className="row">
            <span>
              {conteudo.treino === "AB" && (
                <img src={ab} width="600" height="400" alt="treino usuario" />
              )}
              {conteudo.treino === "ABC" && (
                <img src={abc} alt="treino usuario" />
              )}
              {conteudo.treino === "ABCD" && (
                <img src={abcd} alt="treino usuario" />
              )}
              {conteudo.treino === "ABCDE" && (
                <img src={abcde} alt="treino usuario" />
              )}
              {conteudo.treino === "ABCDEF" && (
                <img src={abcdef} alt="treino usuario" />
              )}
            </span>
          </div>

          {conteudo.complemento !== "" && (
            <>
              <h3>Complemento</h3>
              <p>{conteudo.complemento}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
