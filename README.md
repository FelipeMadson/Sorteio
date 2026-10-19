# Classroom & Event CSV Raffle Tool

A fast, client-side web application for running verifiable, unbiased random participant drawings directly from CSV roster files.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

*Leia isto em [Português](README.pt-BR.md).*

---

## Key Features

- **CSV Roster Parsing**: Ingests line-delimited participant lists from `arquivo.csv`.
- **Fisher-Yates Modern Shuffle**: Cryptographically fair, uniform randomization algorithm avoiding positional bias.
- **Participant Exclusion Management**: Easily toggle or exclude specific students or participants without editing the source CSV.
- **Audit History**: Maintains an in-memory chronological record of previous drawing outcomes to prevent unintended re-selection.

---

## Quickstart

1. Place your roster entries in `arquivo.csv` (one name per line).
2. Serve the directory locally:
   ```bash
   npx serve .
   ```
3. Open `http://localhost:3000` and click **Sortear** to trigger the draw.

## License

MIT © [Felipe Madson](https://github.com/FelipeMadson)
