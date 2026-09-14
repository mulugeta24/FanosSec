const PDFDocument = require('pdfkit');
const fs = require('fs');

const generateCertificatePDF = (certificateData, outputPath) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({
                layout: 'landscape',
                size: 'A4',
            });

            const writeStream = fs.createWriteStream(outputPath);
            doc.pipe(writeStream);

            // Add background rect to simulate dark mode PDF (MUST BE DONE FIRST)
            doc.rect(0, 0, doc.page.width, doc.page.height).fillOpacity(0.9).fill('#0D0D0D');

            // Simple Futuristic Title
            doc
                .font('Helvetica-Bold')
                .fontSize(40)
                .fillColor('#00FF41') // Cyber neon green
                .text('FANOS SEC', { align: 'center' });

            doc.moveDown();

            doc
                .fontSize(25)
                .fillColor('#FFFFFF')
                .text('Certificate of Completion', { align: 'center' });

            doc.moveDown();

            doc
                .fontSize(20)
                .text(`This is to certify that`, { align: 'center' });

            doc.moveDown();

            doc
                .fontSize(30)
                .fillColor('#00FFFF') // Cyan
                .text(`${certificateData.userName}`, { align: 'center' });

            doc.moveDown();

            doc
                .fontSize(20)
                .fillColor('#FFFFFF')
                .text(`has successfully completed the skill-based module:`, { align: 'center' });

            doc.moveDown();

            doc
                .fontSize(25)
                .fillColor('#FF003C') // Cyberpunk Red
                .text(`${certificateData.courseName}`, { align: 'center' });

            doc.moveDown();

            doc
                .fontSize(15)
                .fillColor('#AAAAAA')
                .text(`ID: ${certificateData.certificateId}`, { align: 'center' })
                .text(`Date: ${new Date(certificateData.issuedAt).toLocaleDateString()}`, { align: 'center' })
                .text('Instructor: Admin', { align: 'center' });

            doc.end();

            writeStream.on('finish', () => {
                resolve(outputPath);
            });

        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { generateCertificatePDF };
