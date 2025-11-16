import React from "react";
import "./SocialMedia.css";

const SocialMedia: React.FC = () => {
  return (
    <section className="social-media">
      <h3 className="section-title">Síguenos en nuestras redes sociales</h3>
      <div className="social-icons">
        <a
          href="https://www.instagram.com/rankomotenashi/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Ir a Instagram"
          data-tooltip="Ir a Instagram"
        >
          <img src="/images/instagram-icon.png" alt="Instagram" />
        </a>
        <a
          href="https://www.linkedin.com/in/cesarjchavesomotenashi"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Ir a LinkedIn"
          data-tooltip="Ir a LinkedIn"
        >
          <img src="/images/linkedin-icon.png" alt="LinkedIn" />
        </a>
        <a
          href="https://x.com/RankOmotenashi"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Ir a X"
          data-tooltip="Ir a X"
        >
          <img src="/images/x-icon.png" alt="X" />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61583846694958"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Ir a facebook"
          data-tooltip="Ir a facebook"
        >
          <img src="/images/facebook-icon.png" alt="facebook" />
        </a>
        <a
          href="https://www.tiktok.com/@rankomotenashi"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Ir a Tiktok"
          data-tooltip="Ir a TikTok"
        >
          <img src="/images/tiktok-icon.png" alt="TikTok" />
        </a>
        <a
          href="https://www.youtube.com/@RankOmotenashi"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Ir a youtube"
          data-tooltip="Ir a youtube"
        >
          <img src="/images/youtube-icon.png" alt="youtube" />
        </a>
      </div>
    </section>
  );
};

export default SocialMedia;
