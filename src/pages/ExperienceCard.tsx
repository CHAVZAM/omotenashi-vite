import React from "react";
import { Experience } from "./BlogExperiencias";

interface ExperienceCardProps {
  experience: Experience;
  type: "historias_inspiran" | "necesitas_omotenashi";
  handleSakura: (expId: number, add: boolean) => void;
  isWinner: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  type,
  handleSakura,
  isWinner,
}) => {
  return (
    <div className="experience-card glassmorphic">
      <h3>{experience.title}</h3>
      <p>{experience.description}</p>
      <p>Ubicación: {experience.location}</p>
      <img
        src={experience.image}
        alt={experience.title}
        className="experience-image"
      />
      <div className="experience-actions">
        {type === "historias_inspiran" ? (
          <>
            <button
              className="sakura-button"
              onClick={() => handleSakura(experience.id, true)}
              data-tooltip="Añadir Sakura"
              aria-label="Añadir sakura a la experiencia"
            >
              🌸 {experience.sakuras}
            </button>
            <button
              className="sakura-button remove"
              onClick={() => handleSakura(experience.id, false)}
              data-tooltip="Quitar Sakura"
              aria-label="Quitar sakura de la experiencia"
            >
              ❌
            </button>
            {isWinner && (
              <p className="podcast-note">
                ¡Ganador! Será invitado a un podcast con nosotros.
              </p>
            )}
          </>
        ) : (
          <button
            className="report-button"
            data-tooltip="Reportar"
            aria-label="Reportar experiencia"
          >
            Reportar
          </button>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
