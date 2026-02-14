export default function CardUltimaConsulta({
  data,
  tratamento
}) {
  return (
    <div className="card-ultima-consulta">
      <div className="cabecalho-secao">
        <h3>Última consulta</h3>
        <button className="botao-ver">Ver</button>
      </div>

      <div className="conteudo-card">
        <div className="campo">
          <span className="label">Data:</span>
          <span className="valor">{data}</span>
        </div>
        <div className="campo">
          <span className="label">Tratamento:</span>
          <span className="valor">{tratamento}</span>
        </div>
      </div>
    </div>
  )
}
