const fs = require("fs");
const csv = require("csv-parser");

const escolas = [];

fs.createReadStream("Tabela_Escola_2025.csv", {
  encoding: "latin1",
})
  .pipe(csv({ separator: ";" }))

  .on("headers", (headers) => {
    console.log("Colunas encontradas:");
    console.log(headers);
  })

  .on("data", (row) => {
    // Mostra as primeiras linhas para conferência
    if (escolas.length < 3) {
      console.log(row);
    }

    const uf =
      row.SG_UF ||
      row.NO_UF ||
      "";

    if (
      uf.toString().trim().toUpperCase() === "PE" ||
      uf.toString().trim().toUpperCase() === "PERNAMBUCO"
    ) {
      let etapa = "Ensino Fundamental";

      if (
        row.IN_COMUM_MEDIO_MEDIO === "1" ||
        row.IN_COMUM_MEDIO_INTEGRADO === "1"
      ) {
        etapa = "Ensino Médio";
      }

      if (
        row.IN_COMUM_CRECHE === "1" ||
        row.IN_COMUM_PRE === "1"
      ) {
        etapa = "Educação Infantil";
      }

      escolas.push({
        id: escolas.length + 1,
        NO_ENTIDADE: row.NO_ENTIDADE || "",
        DS_ENDERECO: row.DS_ENDERECO || "",
        NO_BAIRRO: row.NO_BAIRRO || "",
        NO_MUNICIPIO: row.NO_MUNICIPIO || "",
        TP_ETAPA_ENSINO: etapa,

        IN_BIBLIOTECA:
          row.IN_BIBLIOTECA === "1",

        IN_QUADRA_ESPORTES:
          row.IN_QUADRA_ESPORTES === "1",

        IN_INTERNET:
          row.IN_INTERNET === "1",

        IN_ACESSIBILIDADE:
          row.IN_ACESSIBILIDADE_INEXISTENTE !== "1",

        QT_MATRICULAS: 0,
      });
    }
  })

  .on("end", () => {
    console.log(
      `Encontradas ${escolas.length} escolas`
    );

    const resultado = escolas.slice(0, 250);

    fs.writeFileSync(
      "src/data/escolas.json",
      JSON.stringify(resultado, null, 2),
      "utf8"
    );

    console.log(
      `JSON criado com ${resultado.length} escolas`
    );
  })

  .on("error", (err) => {
    console.error(err);
  });