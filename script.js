let alunosDisponiveis = [];
let alunosExcluidos = [];
function sortearAlunos() {
  fetch('arquivo.csv')
    .then(response => response.text())
    .then(text => {
      const linhas = text.split('\n');
      const alunosNaoExcluidos = linhas.filter(line => !alunosExcluidos.includes(line.trim()));
      const alunosUnicos = Array.from(new Set(alunosNaoExcluidos.map(line => line.trim())));
      const alunosEmbaralhados = embaralharArray(alunosUnicos);
      const numGrupos = parseInt(document.getElementById('numGrupos').value);
      const alunosPorGrupo = Math.floor(alunosEmbaralhados.length / numGrupos);
      const alunosExtras = alunosEmbaralhados.length % numGrupos;
      let grupos = [];
      let indiceInicial = 0;
      for (let i = 0; i < numGrupos; i++) {
        const tamanhoGrupo = i === numGrupos - 1 ? alunosPorGrupo + alunosExtras : alunosPorGrupo;
        const grupo = alunosEmbaralhados.slice(indiceInicial, indiceInicial + tamanhoGrupo);
        grupo.sort();
        grupos.push(grupo);
        indiceInicial += tamanhoGrupo;
      }
      if (alunosExcluidos.length > 0) {
        grupos.push(['Alunos Excluídos', ...alunosExcluidos]);
      }

      exibirGrupos(grupos);
    });
}

function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function exibirGrupos(grupos) {
  let result = '';
  grupos.forEach((grupo, indice) => {
    if (grupo[0] === 'Alunos Excluídos') {
      result += `<h2>Alunos Excluídos</h2>`;
      grupo.slice(1).forEach(aluno => {
        result += `<p>${aluno}</p>`;
      });
    } else {
      result += `<h2>Grupo ${indice + 1}</h2>`;
      grupo.forEach(aluno => {
        result += `<p>${aluno}</p>`;
      });
    }
  });
  document.getElementById('grupos').innerHTML = result;
}

function excluirAluno() {
  const alunoExcluir = prompt("Digite o nome do aluno a ser excluído:");
  if (alunoExcluir === null) return;

  fetch('arquivo.csv')
    .then(response => response.text())
    .then(text => {
      const linhas = text.split('\n');
      const alunosFiltrados = linhas.filter(line => line.trim() !== alunoExcluir.trim());
      alunosDisponiveis = alunosFiltrados;
      alunosExcluidos.push(alunoExcluir.trim());
      atualizarGrupos();
    });
}

function restaurarAluno() {
  const alunoRestaurar = prompt("Digite o nome do aluno a ser restaurado:");
  if (alunoRestaurar === null) return;

  const index = alunosExcluidos.indexOf(alunoRestaurar.trim());
  if (index !== -1) {
    alunosExcluidos.splice(index, 1);
    alunosDisponiveis.push(alunoRestaurar.trim());
    atualizarGrupos();
  }
}

function mostrarAlunosExcluidos() {
  const alunosExcluidosList = alunosExcluidos.join('\n');
  alert("Alunos Excluídos:\n" + alunosExcluidosList);
}

function atualizarGrupos(grupos) {
  if (!grupos) {
    fetch('arquivo.csv')
      .then(response => response.text())
      .then(text => {
        const linhas = text.split('\n');
        const alunosNaoExcluidos = linhas.filter(line => !alunosExcluidos.includes(line.trim()));
        const alunosUnicos = Array.from(new Set(alunosNaoExcluidos.map(line => line.trim())));
        const alunosEmbaralhados = embaralharArray(alunosUnicos);
        const numGrupos = parseInt(document.getElementById('numGrupos').value);
        const alunosPorGrupo = Math.floor(alunosEmbaralhados.length / numGrupos);
        const alunosExtras = alunosEmbaralhados.length % numGrupos;
        grupos = [];
        let indiceInicial = 0;

        for (let i = 0; i < numGrupos; i++) {
          const tamanhoGrupo = i === numGrupos - 1 ? alunosPorGrupo + alunosExtras : alunosPorGrupo;
          const grupo = alunosEmbaralhados.slice(indiceInicial, indiceInicial + tamanhoGrupo);
          grupo.sort();
          grupos.push(grupo);
          indiceInicial += tamanhoGrupo;
        }

        if (alunosExcluidos.length > 0) {
          grupos.push(['Alunos Excluídos', ...alunosExcluidos]);
        }

        exibirGrupos(grupos);
      });
  } else {
    if (alunosExcluidos.length > 0) {
      grupos.push(['Alunos Excluídos', ...alunosExcluidos]);
    }
    exibirGrupos(grupos);
  }
}

function salvarTxt() {
    const gruposHtml = document.getElementById('grupos').innerHTML
                        .replace(/<h2>/g, '')
                        .replace(/<\/h2>/g, '')
                        .replace(/<p>/g, '')
                        .replace(/<\/p>/g, '');

    const nomes = gruposHtml.trim().split('\n');
    nomes.sort();
    const textoFormatado = nomes.join('\n');
    const blob = new Blob([textoFormatado], { type: 'text/plain' });
    const fileName = 'resultado_sorteio.txt';
    const link = document.createElement('a');
    link.download = fileName;
    link.href = window.URL.createObjectURL(blob);
    link.click();
}

sortearAlunos();
