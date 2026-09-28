// Dados fictícios padronizados do 8º Ano
const dadosBoletim = [
  { disciplina: "Língua Portuguesa", tri1: 82, tri2: "7,8", tri3: 85, faltas: [2, 1, 1] },
  { disciplina: "Matemática", tri1: 52, tri2: "5,8", tri3: null, faltas: [3, 2, 1] },
  { disciplina: "Ciências", tri1: "8,1", tri2: 76, tri3: 8.0, faltas: [1, 2, 0] },
  { disciplina: "História", tri1: 7.0, tri2: 84, tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Geografia", tri1: 68, tri2: 7.3, tri3: "7,9", faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa", tri1: 86, tri2: "8,1", tri3: 8.7, faltas: [1, 0, 0] },
  { disciplina: "Arte", tri1: 9.0, tri2: 92, tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Educação Física", tri1: 95, tri2: 9.0, tri3: "9,4", faltas: [0, 1, 0] },
  { disciplina: "Educação Digital", tri1: 88, tri2: 9.1, tri3: 93, faltas: [1, 0, 1] },
  { disciplina: "Educação Financeira", tri1: 74, tri2: "7,8", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Estudo Orientado", tri1: 8.0, tri2: 83, tri3: "8,5", faltas: [0, 1, 0] },
  { disciplina: "Redação e Leitura", tri1: 62, tri2: "6,8", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico", tri1: 48, tri2: 5.6, tri3: "6,0", faltas: [2, 2, 1] },
  { disciplina: "Literatura Arte e Movimento", tri1: "7,7", tri2: 80, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Práticas Experimentais", tri1: 58, tri2: "6,2", tri3: 6.4, faltas: [1, 1, 1] }
];

// Função obrigatória para normalizar as notas para a escala de 0 a 10
function normalizarNota(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return null; // Nota ainda não lançada
  }

  // Se o valor for string, troca vírgula por ponto decimal
  let num = typeof valor === "string" ? parseFloat(valor.replace(",", ".")) : Number(valor);

  if (isNaN(num)) return null; // Valor inválido

  // Se a nota estiver maior que 10 e até 100, divide por 10
  if (num > 10 && num <= 100) {
    num = num / 10;
  }

  // Apenas aceita valores na escala de 0 a 10
  if (num >= 0 && num <= 10) {
    return num;
  }

  return null; // Fora do intervalo válido
}

// Função para calcular o total de faltas da disciplina
function somarFaltas(listaFaltas) {
  return listaFaltas.reduce((total, atual) => total + atual, 0);
}

// Função principal para montar o boletim na tela (DOM)
function carregarBoletim() {
  const corpoTabela = document.getElementById("tabela-boletim");
  corpoTabela.innerHTML = ""; // Limpa a tabela

  let somaMediasGerais = 0;
  let qtdDisciplinasComMedia = 0;
  let totalFaltasGeral = 0;
  let qtdBomDesempenho = 0;
  let qtdAtencao = 0;

  // forEach: Passa por cada disciplina da nossa lista
  dadosBoletim.forEach((item) => {
    // Normaliza cada nota
    const n1 = normalizarNota(item.tri1);
    const n2 = normalizarNota(item.tri2);
    const n3 = normalizarNota(item.tri3);

    // Calcula a média ignorando notas não lançadas
    const notasValidas = [n1, n2, n3].filter((n) => n !== null);
    let mediaTexto = "—";
    let situacao = "Nota ainda não disponível";
    let classeSituacao = "situacao-indisponivel";

    if (notasValidas.length > 0) {
      const soma = notasValidas.reduce((a, b) => a + b, 0);
      const mediaCalculada = soma / notasValidas.length;
      mediaTexto = mediaCalculada.toFixed(1).replace(".", ",");

      somaMediasGerais += mediaCalculada;
      qtdDisciplinasComMedia++;

      if (mediaCalculada >= 6.0) {
        situacao = "Bom desempenho";
        classeSituacao = "situacao-bom";
        qtdBomDesempenho++;
      } else {
        situacao = "Atenção";
        classeSituacao = "situacao-atencao";
        qtdAtencao++;
      }
    }

    // Soma as faltas
    const faltasDisciplina = somarFaltas(item.faltas);
    totalFaltasGeral += faltasDisciplina;

    // Formata exibição das notas individuais
    const exibeN1 = n1 !== null ? n1.toFixed(1).replace(".", ",") : "—";
    const exibeN2 = n2 !== null ? n2.toFixed(1).replace(".", ",") : "—";
    const exibeN3 = n3 !== null ? n3.toFixed(1).replace(".", ",") : "—";

    // Cria a linha na tabela HTML
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${item.disciplina}</td>
      <td>${exibeN1}</td>
      <td>${exibeN2}</td>
      <td>${exibeN3}</td>
      <td><strong>${mediaTexto}</strong></td>
      <td>${faltasDisciplina}</td>
      <td class="${classeSituacao}">${situacao}</td>
    `;
    corpoTabela.appendChild(linha);
  });

  // Atualiza os cards superiores de resumo
  const mediaGeralFinal = qtdDisciplinasComMedia > 0 
    ? (somaMediasGerais / qtdDisciplinasComMedia).toFixed(1).replace(".", ",") 
    : "—";

  document.getElementById("card-media").innerText = mediaGeralFinal;
  document.getElementById("card-faltas").innerText = totalFaltasGeral;
  document.getElementById("card-bom").innerText = qtdBomDesempenho;
  document.getElementById("card-atencao").innerText = qtdAtencao;

  // NOTA: A frequência abaixo de 92% é apenas um dado fictício e demonstrativo
  // para esta primeira versão do projeto.
  document.getElementById("card-frequencia").innerText = "92%";
}

// Executa a função quando o site carregar
document.addEventListener("DOMContentLoaded", carregarBoletim);
