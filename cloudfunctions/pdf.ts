const puppeteer = require('puppeteer');

exports.generateInvoicePDF = async (req, res) => {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    // Set the viewport to match Material-UI dimensions
    await page.setViewport({
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
    });

    // You could pass the HTML content as a POST request body or fetch it from a URL
    const content = req.body.htmlContent;

    await page.setContent(content);
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
    });

    await browser.close();

    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdfBuffer.length });
    res.send(pdfBuffer);
};
