const { PdfReader } = require('pdfreader');
const { ExportToCsv } = require('export-to-csv');
const { writeFileSync } = require('fs');
const createReport = require('./createReport');
const createReportLinkedList = require('./createReportLinkedList');

(async () => {
  const pdfReader = new PdfReader();
  let reportLinkedList = createReportLinkedList();

  pdfReader.parseFileItems("file.pdf", function (err, item) {
    if (item && item.text) {
      if (item.text === " Dados de abertura") {
        newReport = createReport(item);
        reportLinkedList.addReport(newReport);
      } else if (item.text[0] !== ' ') {
        reportLinkedList.addItemToReport(item);
      }
    }
  });

  setTimeout(() => {
    const options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvData = reportLinkedList.extractCsvData();
    const csvExporter = new ExportToCsv(options);
    const csv = csvExporter.generateCsv(csvData, true);
    writeFileSync('data.csv', csv);
  }, 2000);
})();