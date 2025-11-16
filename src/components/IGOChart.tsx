import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "chart.js/auto";
import "./IGOChart.css";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface IGOChartProps {
  labels: string[];
  data: number[];
  cso: number;
  userName?: string;
  isLoggedIn?: boolean;
  legend: string;
}

const IGOChart: React.FC<IGOChartProps> = ({
  labels,
  data,
  cso,
  userName,
  isLoggedIn,
  legend,
}) => {
  const shortLabels = labels.map((label) => {
    switch (label) {
      case "¿Sientes":
      case "¿En":
        return "Anticipación";
      case "¿Manejas":
        return "Empatía";
      case "¿Es":
        return "Puntualidad";
      case "¿Te":
      case "¿En su":
        return "Dominio";
      case "¿Has":
      case "¿En los":
        return "Experiencias";
      case "¿Alguien":
      case "¿En el":
        return "Satisfacción";
      default:
        return label;
    }
  });

  const chartData = {
    labels: shortLabels,
    datasets: [
      {
        label: "Omotenashi IGO",
        data,
        backgroundColor: "rgba(255, 68, 68, 0.2)",
        borderColor: "#ff4444",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 8,
        ticks: {
          stepSize: 2,
          backdropColor: "transparent",
          color: "#333",
        },
        pointLabels: {
          font: {
            size: 12,
          },
          color: "#333",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Función exportToPDF ACTUALIZADA
  const exportToPDF = () => {
    // AHORA BUSCA EL ID 'igo-chart-container-export'
    const chartElement = document.getElementById("igo-chart-container-export");
    if (!chartElement) {
      console.error("Elemento para exportar a PDF no encontrado:", "igo-chart-container-export");
      return;
    }

    html2canvas(chartElement, {
      useCORS: true, // Importante para cargar imágenes externas como el logo
      allowTaint: true, // Puede ser necesario para algunos contenidos
      scale: 2, // Aumenta la escala para mejor calidad en el PDF
      scrollX: 0, // Evita scrollbars al capturar
      scrollY: -window.scrollY // Ajusta si la página está scrollada
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 10;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", margin, 20, imgWidth, imgHeight);

      let currentY = 20 + imgHeight + 10;

      if (isLoggedIn && userName) {
        pdf.setFontSize(10);
        pdf.text(`Nombre: ${userName}`, margin, currentY);
        currentY += 6;
        pdf.text(`Fecha: ${new Date().toLocaleDateString()}`, margin, currentY);
        currentY += 10;
      }

      // Asegúrate de que la ruta de la imagen sea correcta en tu servidor
      pdf.addImage("/images/omotenashilogo.png", "PNG", pageWidth - 48, 10, 35, 18);
      pdf.text("Espacio reservado para firma digital", margin, currentY);
      currentY += 10;

      pdf.setFontSize(12);
      pdf.setTextColor(50, 50, 50);
      pdf.text("Interpretación del resultado:", margin, currentY);
      currentY += 6;
      pdf.setFontSize(11);
      pdf.text(legend, margin, currentY, { maxWidth: pageWidth - 2 * margin });

      pdf.save("omotenashi_igo_resultado.pdf");
    }).catch(error => {
      console.error("Error al generar el PDF:", error);
      alert("Hubo un error al generar el PDF. Por favor, inténtalo de nuevo.");
    });
  };

  // === LÓGICA DE POSICIONAMIENTO DE LA FLECHA POR RANGOS ===
  let arrowPositionFromTop: number; // Esto será un porcentaje desde la parte superior de la barra.
  const arrowVerticalOffset = 12; // Offset para centrar la flecha, mitad de su altura (24px/2). Ajustar si el indicador total es más alto.

  if (cso >= 0 && cso <= 49) {
    // Rango Bajo (0-49%): Zona Roja
    const targetPercentageFromBottom = 25; // Anclar al 25% de la barra desde abajo.
    arrowPositionFromTop = 100 - targetPercentageFromBottom; // Convertir a porcentaje desde arriba
  } else if (cso >= 50 && cso <= 74) {
    // Rango Medio (50-74%): Zona Amarilla
    const targetPercentageFromBottom = 50; // Anclar al 62% de la barra desde abajo.
    arrowPositionFromTop = 100 - targetPercentageFromBottom;
  } else { // cso >= 75 && cso <= 100
    // Rango Alto (75-100%): Zona Azul/Verde
    const targetPercentageFromBottom = 75; // Anclar al 87% de la barra desde abajo.
    arrowPositionFromTop = 100 - targetPercentageFromBottom;
  }
  // ===============================================================

  return (
    <div className="igo-chart-container" id="igo-chart-container-export">
      <div className="chart-wrapper glassmorphic">
        <Radar data={chartData} options={chartOptions} />
      </div>

      <div className="cso-bar-container">
        <div className="cso-bar">
          <div
            className="cso-bar-fill"
            style={{ height: `${cso}%` }} // La altura del relleno de la barra sigue siendo el valor exacto de CSO
          ></div>
        </div>
        {/* INDICADOR DE RESULTADO (FLECHA Y VALOR) AHORA CON POSICIONAMIENTO POR RANGOS */}
        <div
          className="cso-result-indicator"
          style={{
            // Usa la posición calculada por rangos
            top: `calc(${arrowPositionFromTop}% - ${arrowVerticalOffset}px)`,
            left: 'calc(50% + 15px)',
            transform: 'translateY(-50%)'
          } as React.CSSProperties}
        >
          <div className="cso-arrow-indicator">
            <svg viewBox="0 0 24 24">
              <path
                fill="#ff4444"
                d="M2 12L10 4L10 8L20 8L20 16L10 16L10 20L2 12Z"
                stroke="#ff4444"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="cso-value-label">{cso.toFixed(2)}%</span> {/* El valor numérico sigue siendo exacto */}
        </div>
      </div>

      <div className="cso-legend">
        <p>
          <strong>Interpretación del resultado:</strong>
        </p>
        <p>0-49%: Bajo → Te recomendamos profundizar en los principios clave y practicar su aplicación en situaciones cotidianas. Revisa los recursos sugeridos al final para autodesarrollo.</p>
        <p>50-74%: Medio → Tienes una base sólida, pero hay oportunidades para refinar tu enfoque, el siguiente nivel está al alcance!"</p>
        <p>75-100%: Alto → ¡Excelente! Demuestras un dominio notable de los fundamentos del Omotenashi y los IGO. Para seguir creciendo, considera desafíos más complejos o mentorías avanzadas (si es de tu interés).</p>
      </div> {/* <-- CORREGIDO: Este div cierra cso-legend correctamente */}

      <div className="chart-footer">
        <button
          className="download-button animated-button"
          onClick={exportToPDF}
          aria-label="Descargar resultado como PDF"
        >
          Descargar Resultado
        </button>
      </div>
    </div>
  );
};

export default IGOChart;