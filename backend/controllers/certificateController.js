import PDFDocument from "pdfkit";

export const generateCertificate = async (req, res) => {
  try {
    const { name, course } = req.body;

    if (!name || !course) {
      return res.status(400).json({ message: "Name and course are required" });
    }

    const doc = new PDFDocument();
    let buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      res
        .writeHead(200, {
          "Content-Length": pdfData.length,
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename=${name}-certificate.pdf`,
        })
        .end(pdfData);
    });

    // Certificate design
    doc
      .fontSize(24)
      .text("Zehra Sec Cybersecurity Training Certificate", {
        align: "center",
      })
      .moveDown(2);

    doc
      .fontSize(18)
      .text(`This is to certify that`, { align: "center" })
      .moveDown();

    doc
      .fontSize(22)
      .text(`${name}`, {
        align: "center",
        underline: true,
      })
      .moveDown();

    doc
      .fontSize(16)
      .text(`has successfully completed the`, { align: "center" });

    doc
      .fontSize(20)
      .text(`${course} Training`, {
        align: "center",
        italic: true,
      })
      .moveDown(2);

    doc
      .fontSize(14)
      .text(`Issued by Zehra Sec`, { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Certificate generation error:", error);
    res.status(500).json({ message: "Failed to generate certificate" });
  }
};
