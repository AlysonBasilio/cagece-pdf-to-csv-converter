import nextConnect from 'next-connect'
import multer from 'multer'
import { PdfReader } from 'pdfreader'
import { ExportToCsv } from 'export-to-csv'
import createReport from './createReport'
import createReportLinkedList from './createReportLinkedList'
import fs, { writeFileSync } from 'fs'
import mime from 'mime'
import path from 'path'

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multer.diskStorage({
    destination: '/tmp',
    filename: (req, file, cb) => cb(null, 'file.pdf'),
  }),
});

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

const uploadMiddleware = upload.array('theFiles');

// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware);

// Process a POST request
apiRoute.post((req, res) => {
  const pdfReader = new PdfReader();
  let reportLinkedList = createReportLinkedList();

  pdfReader.parseFileItems("/tmp/file.pdf", function (err, item) {
    if (item && item.text) {
      if (item.text === " Dados de abertura") {
        let newReport = createReport(item);
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
    const file = '/tmp/data.csv'
    writeFileSync(file, csv);
    var filename = path.basename(file);
    var mimetype = mime.getType(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
  }, 2000);
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};