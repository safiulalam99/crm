const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const cors = require('cors');
const axios = require('axios');  // Import axios

// Create an instance of the cors middleware
const corsHandler = cors({ origin: true });
const url = "https://nefcgcrqhlpuomgglemo.supabase.co/storage/v1/object/public/invoice_templates/orders_confirm.docx?t=2023-08-26T00%3A36%3A03.362Z"
exports.generateDocument = (req, res) => {
    // Apply CORS middleware
    corsHandler(req, res, async () => {  // Make the callback async
        if (req.method !== 'POST') {
            res.status(405).send('Method Not Allowed');
            return;
        }

        const data = req.body;

        // Ensure the data contains the necessary fields
        if (!data) {
            res.status(400).send('Bad Request: Missing necessary fields in the data.', res);
            return;
        }

        // Fetch the template from the public URL
        try {
            const response = await axios.get(url, {
                responseType: 'arraybuffer'  // Ensure the response is treated as a buffer
            });

            const content = response.data;

            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true
            });

            // Use the data from the request to render the document
            doc.render(data);

            const buffer = doc.getZip().generate({
                type: 'nodebuffer',
                compression: 'DEFLATE'
            });

            // Set the headers for the response
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', 'attachment; filename=output.docx');

            // Send the generated docx file
            res.send(buffer);

        } catch (error) {
            console.error('Error fetching or processing the template:', error.message);
            res.status(500).send('Error generating the document.');
            return;
        }
    });
};
