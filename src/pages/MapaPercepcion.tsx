// /Users/cesarchaves/omotenashi-vite/src/pages/MapaPercepcion.tsx

import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import "./MapaPercepcion.css";

// Definimos una interfaz para la estructura de los datos que esperamos del backend
interface CountryData {
  country_code: string; // Nota el cambio de 'countryCode' a 'country_code' para coincidir con la DB
  country_name: string; // Añadimos country_name que viene de la DB
  score: number;
  source: string;
  data_count: number;
}

const getColor = (score: number) => {
  if (score >= 8.6) return "#2ca9bc"; // Superior
  if (score >= 7.0) return "#F4C430"; // Bueno
  if (score >= 4.6) return "#FF9800"; // Deficiente
  return "#F44336"; // Crítico
};

const MapaPercepcion: React.FC = () => {
  const API_URL =
    import.meta.env.VITE_API_URL || "https://omotenashi-vite.vercel.app";
  // Inicializamos con un array vacío, ya que los datos vendrán del backend
  const [data, setData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Nuevo estado para controlar la carga
  const [error, setError] = useState<string | null>(null); // Nuevo estado para manejar errores
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [center, setCenter] = useState<[number, number]>([0, 0]);
  const [reloading, setReloading] = useState(false);

  // Función para obtener los datos del backend
  const fetchMapData = async () => {
    setLoading(true); // Establece el estado de carga a true al iniciar la petición
    setError(null); // Limpia cualquier error previo
    try {
      const response = await fetch(`${API_URL}/api/mapa`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData: CountryData[] = await response.json();
      setData(jsonData); // Actualiza el estado con los datos del backend
    } catch (err: any) {
      console.error("Error al obtener los datos del mapa:", err);
      setError("No se pudieron cargar los datos del mapa. Intenta de nuevo."); // Guarda el mensaje de error
    } finally {
      setLoading(false); // Siempre establece el estado de carga a false al finalizar la petición
    }
  };

  // useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    fetchMapData();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  const getCountryColor = (countryCode: string) => {
    // Busca el país usando country_code (de la DB) en lugar de countryCode (de mockData)
    const country = data.find((item) => item.country_code === countryCode);
    if (hoveredCountryId === countryCode || selectedCountryId === countryCode) {
      return country ? getColor(country.score) : "#DDD";
    }
    return country ? getColor(country.score) : "#DDD"; // Usa el color del score si hay datos, sino gris por defecto
  };

  // Nota: La lógica de `rankedData` y `getRank` debe usar `country_code`
  const rankedData = [...data].sort((a, b) => b.score - a.score);
  const getRank = (code: string) => {
    const index = rankedData.findIndex((item) => item.country_code === code);
    return index >= 0 ? index + 1 : "-";
  };

  const handleCountryClick = (
    geo: any,
    countryCode: string,
    countryData: any // Este countryData ya debería ser el objeto de la BD
  ) => {
    // Si countryData no es nulo y tiene un score válido
    if (countryData && typeof countryData.score === "number") {
      setSelectedCountryId(countryCode);
      setSelectedCountry({
        name: geo.properties?.name, // El nombre del país viene de las propiedades geográficas
        ...countryData,
        rank: getRank(countryCode),
      });
      const centroid = geoCentroid(geo);
      setCenter(centroid);
    } else {
      // Manejar el caso de un país sin datos válidos (opcional)
      setSelectedCountryId(null);
      setSelectedCountry(null);
      setTooltipContent(
        `<strong>${
          geo.properties?.name || "País desconocido"
        }</strong><br>Datos no disponibles.`
      );
    }
  };

  // Modificamos handleReload para que haga una nueva petición al backend
  const handleReload = async () => {
    setReloading(true);
    await fetchMapData(); // Llama a la función para obtener los datos frescos del backend
    setReloading(false);
    // Ya no necesitamos window.location.reload(); porque fetchMapData actualiza el estado `data`
  };

  const geoCentroid = (geo: any): [number, number] => {
    const { geometry } = geo;
    if (!geometry || !geometry.coordinates) return [0, 0];
    try {
      // Ajuste para manejar geometrías MultiPolygon o Polygon
      const coords =
        geometry.type === "Polygon"
          ? geometry.coordinates[0]
          : geometry.coordinates[0][0];
      if (Array.isArray(coords[0])) {
        // Esto es para MultiPolygon, tomamos un punto aproximado
        const flatCoords = coords.flat(Infinity); // Aplanar todos los puntos
        const midX =
          flatCoords.reduce(
            (sum: number, val: number, i: number) =>
              i % 2 === 0 ? sum + val : sum,
            0
          ) /
          (flatCoords.length / 2);
        const midY =
          flatCoords.reduce(
            (sum: number, val: number, i: number) =>
              i % 2 !== 0 ? sum + val : sum,
            0
          ) /
          (flatCoords.length / 2);
        return [midX, midY];
      } else {
        // Para Polygon simple
        const [x, y] = coords[Math.floor(coords.length / 2)];
        return [x, y];
      }
    } catch (e) {
      console.error("Error calculating centroid:", e);
      return [0, 0];
    }
  };

  // Renderizado condicional basado en el estado de carga y error
  if (loading) {
    return (
      <div className="mapa-container main-under-header">
        <h1 className="mapa-title">Cargando Percepción Global...</h1>
        <p>Por favor, espera.</p>
        {/* Aquí puedes añadir un spinner de carga */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mapa-container main-under-header">
        <h1 className="mapa-title">Error al Cargar Mapa</h1>
        <p>{error}</p>
        <button onClick={fetchMapData} className="reload-button">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="mapa-container main-under-header">
      {" "}
      {/* ✅ solo cambia esta línea */}
      <h1 className="mapa-title">Percepción del Servicio Global</h1>
      <button
        onClick={handleReload}
        className="reload-button"
        disabled={reloading || loading} // Deshabilita si está recargando o cargando
        style={{ opacity: reloading || loading ? 0.6 : 1 }}
      >
        🔄 {reloading ? "Actualizando..." : "Actualizar percepción"}
      </button>
      <ComposableMap
        projection="geoMercator"
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "500px",
          background: "#EFEFEF",
        }}
      >
        <ZoomableGroup center={center} zoom={1.2}>
          <Geographies geography="/assets/world-110m.json">
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => {
                const countryCode = geo.id ? String(geo.id) : "";
                // Buscar datos usando country_code
                const countryData = data.find(
                  (item) => item.country_code === countryCode
                );
                const isSelected = selectedCountryId === countryCode;

                return (
                  <Geography
                    key={`${geo.rsmKey}-${isSelected}`}
                    geography={geo}
                    // Si hay datos para el país, usa el color de su score; si no, gris
                    fill={
                      isSelected && countryData
                        ? getColor(countryData.score)
                        : "#DDD"
                    }
                    stroke={isSelected ? "#2ca9bc" : "#555"}
                    strokeWidth={isSelected ? 2 : 0.5}
                    onMouseEnter={() => {
                      setHoveredCountryId(countryCode);
                      // Contenido del tooltip con datos dinámicos si están disponibles
                      setTooltipContent(
                        `<strong>${
                          geo.properties?.name || "País desconocido"
                        }</strong>` +
                          (countryData
                            ? `<br>Score: ${countryData.score.toFixed(1)}/10`
                            : "<br>Datos no disponibles")
                      );
                    }}
                    onMouseLeave={() => {
                      setHoveredCountryId(null);
                      setTooltipContent("");
                    }}
                    onClick={() =>
                      handleCountryClick(geo, countryCode, countryData)
                    }
                    style={{
                      default: {
                        outline: "none",
                        transition:
                          "fill 0.3s ease-in-out, stroke 0.3s ease-in-out, stroke-width 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                        transform: "scale(1)",
                        boxShadow: isSelected
                          ? "0 0 10px rgba(44, 169, 188, 0.7)"
                          : "none",
                      },
                      hover: {
                        outline: "none",
                      },
                      pressed: { outline: "none" },
                    }}
                    data-tooltip-id="map-tooltip"
                    data-tooltip-html={tooltipContent}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <Tooltip id="map-tooltip" className="glassmorphic-tooltip" />
      {selectedCountry && (
        <div className="country-card glassmorphic-card">
          <h2>{selectedCountry.name}</h2>
          <p>
            <strong>Nivel Omotenashi:</strong>{" "}
            {selectedCountry.score.toFixed(1)}/10
          </p>
          <p>
            <strong>Ranking global:</strong> #{selectedCountry.rank}
          </p>
          <p>
            <strong>Fuente:</strong> {selectedCountry.source}
          </p>
          <p>
            <strong>Volumen de datos:</strong> {selectedCountry.dataCount}
          </p>
        </div>
      )}
      {/* Tu leyenda existente */}
      <div className="leyenda">
        <div className="leyenda-horizontal">
          <div className="leyenda-item">
            <div className="color-box" style={{ backgroundColor: "#2ca9bc" }} />{" "}
            Superior (8.6–9.9)
          </div>
          <div className="leyenda-item">
            <div className="color-box" style={{ backgroundColor: "#F4C430" }} />{" "}
            Bueno (7.0–8.5)
          </div>
          <div className="leyenda-item">
            <div className="color-box" style={{ backgroundColor: "#FF9800" }} />{" "}
            Deficiente (4.6–6.9)
          </div>
          <div className="leyenda-item">
            <div className="color-box" style={{ backgroundColor: "#F44336" }} />{" "}
            Crítico (1.0–4.5)
          </div>
        </div>
        <div className="gradient-bar" />
        <div className="gradient-labels">
          <span>Crítico</span>
          <span>Deficiente</span>
          <span>Bueno</span>
          <span>Superior</span>
        </div>
      </div>
    </div>
  );
};

export default MapaPercepcion;
