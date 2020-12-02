module.exports = () => {
  return {
    head: null,
    addReport(report) {
      if (!this.head) {
        this.head = report;
        return;
      }

      let auxiliaryReport = this.head;
      while (auxiliaryReport.nextReport !== null) {
        if (auxiliaryReport.nextReport.y > report.y) {
          break;
        }
        auxiliaryReport = auxiliaryReport.nextReport;
      }
      if (auxiliaryReport.nextReport === null) {
        auxiliaryReport.nextReport = report;
      } else {
        report.nextReport = auxiliaryReport.nextReport;
        auxiliaryReport.nextReport = report
      }
    },
    printLinkedList() {
      let auxiliaryReport = this.head;
      while (auxiliaryReport !== null) {
        console.log(auxiliaryReport, '\n');
        auxiliaryReport = auxiliaryReport.nextReport;
      }
    },
    findItemReport(item) {
      let auxiliaryReport = this.head;
      while (auxiliaryReport !== null) {
        if (!auxiliaryReport.nextReport || auxiliaryReport.nextReport.y > item.y) {
          break;
        }
        auxiliaryReport = auxiliaryReport.nextReport;
      }
      return auxiliaryReport;
    },
    addItemToReport(item) {
      const report = this.findItemReport(item);
      if (!report) {
        console.log('Report not found', item);
        return;
      }
      const { x, y, text } = item;
      report.items.push({ x, y, text });
      report.items.sort((a, b) => {
        const xCompare = a.x - b.x;
        if (xCompare !== 0) return xCompare;
        return a.y - b.y;
      });
      report.calculateItems();
    },
    extractCsvData() {
      let auxiliaryReport = this.head;
      const csvData = [];
      while (auxiliaryReport !== null) {
        csvData.push(auxiliaryReport.calculatedReport);
        auxiliaryReport = auxiliaryReport.nextReport;
      }
      return csvData;
    }
  }
}