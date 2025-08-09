import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportPDF = async () => {
  const content = document.getElementById("pdf-content");

  if (!content) return;

  // Reemplazar gradientes y colores por RGB o HEX compatibles
  content.className += " pdf-friendly";

  // Capturamos el contenido
  const canvas = await html2canvas(content, {
    scale: 2, // más calidad
    useCORS: true, // para imágenes externas
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Ajustamos para que ocupe toda la página
  const imgProps = pdf.getImageProperties(imgData);
  const imgRatio = imgProps.width / imgProps.height;
  const newHeight = pdfWidth / imgRatio;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, newHeight);

  pdf.save("grupos.pdf");
};
