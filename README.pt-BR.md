# Ferramenta de Sorteio via Lista CSV

Aplicação web leve para execução de sorteios aleatórios, justos e auditáveis a partir de planilhas e listagens em formato CSV.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

*Read this in [English](README.md).*

---

## Funcionalidades

- **Leitura Direta de CSV**: Lê arquivos delimitados por linhas a partir de `arquivo.csv`.
- **Algoritmo Fisher-Yates**: Embaralhamento uniforme que garante probabilidades idênticas para todos os participantes sem vícios de posicionamento.
- **Gestão de Exclusão**: Permite remover participantes ausentes da rodada sem necessidade de alterar o arquivo fonte.
- **Histórico de Sorteios**: Registro visual das rodadas anteriores para auditoria e controle de duplicidade.

---

## Como Utilizar

1. Preencha os nomes dos participantes em `arquivo.csv` (um por linha).
2. Execute um servidor estático local:
   ```bash
   npx serve .
   ```
3. Acesse no navegador e realize os sorteios com visualização imediata do resultado.

## Licença

MIT © [Felipe Madson](https://github.com/FelipeMadson)
