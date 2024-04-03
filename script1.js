let alunosDisponiveis = [];
function sortearAlunos() {
    buscarArquivo('arquivo.csv')
    .then(resposta => resposta.text())
    .then(texto => {
        const linhas = alunosDisponiveis.length > 0 ? alunosDisponiveis : texto.split('\n');
        const alunosUnicos = Array.from(new Set(linhas.map(linha => linha.trim())));
        const alunosEmbaralhados = embaralharArray(alunosUnicos);
        const numGrupos = parseInt(document.getElementById('numGrupos').value);
        const alunosPorGrupo = Math.floor(alunosEmbaralhados.length / numGrupos);
        const alunosExtras = alunosEmbaralhados.length % numGrupos;
        
        const lines = alunosDisponiveis.length > 0 ? alunosDisponiveis : text.split('\n');
        const uniqueStudents = Array.from(new Set(lines.map(line => line.trim())));
        const shuffledStudents = shuffleArray(uniqueStudents);
        const numGroups = parseInt(document.getElementById('numGrupos').value);
        const studentsPerGroup = Math.floor(shuffledStudents.length / numGroups);
        const extraStudents = shuffledStudents.length % numGroups;
        

        let grupos = [];
        let indiceInicial = 0;
        for (let i = 0; i < numGrupos; i++) {
            const tamanhoGrupo = i === numGrupos - 1 ? alunosPorGrupo + alunosExtras : alunosPorGrupo;
            const grupo = alunosEmbaralhados.slice(indiceInicial, indiceInicial + tamanhoGrupo);
            grupo.sort();
            grupos.push(grupo);
            indiceInicial += tamanhoGrupo;
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
    let resultado = '';
    grupos.forEach((grupo, indice) => {
        resultado += `<h2>Grupo ${indice + 1}</h2>`;
        grupo.forEach(aluno => {
            if (aluno.startsWith("X")) {
                resultado += `<p>${aluno.slice(1)}</p>`;
            } else {
                resultado += `<p>${aluno}</p>`;
            }
        });
    });
    
    document.getElementById('grupos').innerHTML = resultado;
}

function excluirAluno() {
    const alunoExcluir = prompt("Digite o nome do aluno a ser excluído:");
    if (alunoExcluir === null) return; 
    buscarArquivo('arquivo.csv')
    .then(resposta => resposta.text())
    .then(texto => {
        const linhas = texto.split('\n');
        const alunosFiltrados = linhas.filter(linha => linha.trim() !== alunoExcluir.trim());
        alunosDisponiveis = alunosFiltrados;
        sortearAlunos();
        exibirAlunosExcluidos([alunoExcluir])
    });
}
function exibirAlunosExcluidos(alunosExcluidos) {
    const container = document.getElementById('grupos_excluidos');
    container.innerHTML = '';
    
    const tituloGrupo = document.createElement('h2');
    tituloGrupo.textContent = 'Alunos Excluídos';
    container.appendChild(tituloGrupo);

    alunosExcluidos.forEach(aluno => {
        const paragrafoAluno = document.createElement('p');
        paragrafoAluno.textContent = aluno;
        container.appendChild(paragrafoAluno);
        
    });
}
function restaurarAluno() {
    const alunoRestaurar = prompt("Digite o nome do aluno a ser restaurado:");
    if (alunoRestaurar === null) return; 
    alunosDisponiveis.push(alunoRestaurar);
    sortearAlunos();

    const container = document.getElementById('grupos_excluidos');
    container.innerHTML = '';
}
