// src/utils/senha.js

// Tabela de especialidades por faixa etária
export function getEspecialidades(idade) {
  if (idade <= 12) {
    return { grupo: 'Crianças', prioridade: 1, opcoes: ['Pediatria', 'Neuropediatria'] };
  }
  if (idade <= 18) {
    return { grupo: 'Adolescentes', prioridade: 2, opcoes: ['Endocrinologia Pediátrica', 'Psiquiatria Infantil e Adolescente'] };
  }
  if (idade <= 40) {
    return { grupo: 'Adultos Jovens', prioridade: 4, opcoes: ['Dermatologia', 'Ginecologia/Urologia'] };
  }
  if (idade <= 60) {
    return { grupo: 'Meia-idade', prioridade: 3, opcoes: ['Cardiologia', 'Ortopedia'] };
  }
  return { grupo: 'Idosos', prioridade: 1, opcoes: ['Geriatria', 'Oftalmologia'] };
}
// prioridade: 1 = mais urgente (idosos e crianças, conforme legislação de atendimento
// preferencial no Brasil), 4 = padrão.

let contador = 0;

// Gera o código da senha, ex: "PED-001"
export function gerarCodigoSenha(especialidade) {
  contador += 1;
  const prefixo = especialidade.substring(0, 3).toUpperCase();
  return `${prefixo}-${String(contador).padStart(3, '0')}`;
}

// Ordena a fila: menor número de prioridade primeiro, depois FIFO (ordem de chegada)
export function ordenarFila(fila) {
  return [...fila].sort((a, b) => {
    if (a.prioridade !== b.prioridade) return a.prioridade - b.prioridade;
    return a.criadoEm - b.criadoEm;
  });
}