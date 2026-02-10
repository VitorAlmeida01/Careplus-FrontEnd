export default function CardDadosPaciente({
  nome,
  contato,
  idade,
  cid,
  desfraldado,
  hiperfocoAtual,
  medicacoes,
  diagnostico,
  atendimentoEspecial 
}) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <div className="cabecalho-card">
        <div className="icone-card icone-verde">👤</div>
        <h2>Dados do Paciente</h2>
      </div>

      <div className="conteudo-card">
        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Nome:</span>
            <span className="valor">{nome}</span>
          </div>
          <div className="campo">
            <span className="label">Contato:</span>
            <span className="valor">{contato}</span>
          </div>
        </div>

        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Idade:</span>
            <span className="valor">{idade}</span>
          </div>
          <div className="campo">
            <span className="label">CID:</span>
            <span className="valor">{cid}</span>
          </div>
        </div>

        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Desfraldado:</span>
            <span className="valor">{desfraldado}</span>
          </div>
          <div className="campo">
            <span className="label">Hiperfoco Atual:</span>
            <span className="valor">{hiperfocoAtual}</span>
          </div>
        </div>

        <div className="linha-informacao">
          <div className="campo">
            <span className="label">Medicações:</span>
            <span className="valor">{medicacoes}</span>
          </div>
          <div className="campo">
            <span className="label">Diagnóstico:</span>
            <span className="valor">{diagnostico}</span>
          </div>
        </div>

        <div className="linha-informacao">
          <div className="campo campo-completo">
            <span className="label">Atendimento Especial:</span>
            <span className="valor">{atendimentoEspecial}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
