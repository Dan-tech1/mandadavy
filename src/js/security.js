(function () {
  "use strict";

  function preventIframeEmbedding() {
    if (window.self !== window.top) {
      document.body.innerHTML = `
                <div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#0f172a;color:white;text-align:center;padding:20px;">
                    <div>
                        <h1 style="color:#ef4444;font-size:2rem;margin-bottom:1rem;">Accès non autorisé</h1>
                        <p style="font-size:1.2rem;margin-bottom:2rem;">Ce contenu ne peut pas être intégré dans une autre page.</p>
                        <a href="${window.top.location.href}" target="_top" style="background:#06b6d4;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;font-weight:bold;">
                            Visiter le site directement
                        </a>
                    </div>
                </div>`;
    }
  }

  function showConsoleWarning() {
    console.log(
      "%c🚫 ATTENTION 🚫",
      "color: red; font-size: 28px; font-weight: bold;",
    );
    console.log(
      "%cLe code de ce portfolio est une propriété intellectuelle.",
      "color: orange; font-size: 16px;",
    );
    console.log(
      "%cSi vous êtes intéressé par mon travail, n'hésitez pas à me contacter.",
      "color: orange; font-size: 16px;",
    );
  }

  function protectImagesFromCopy() {
    // Bloque clic droit sur images
    document.querySelectorAll("img").forEach((img) => {
      img.oncontextmenu = (e) => {
        e.preventDefault();
        return false;
      };
      img.setAttribute("draggable", "false");
    });

    // Bloque PrintScreen
    document.addEventListener("keydown", (e) => {
      if (e.key === "PrintScreen" || e.keyCode === 44) e.preventDefault();
    });
  }

  // Exécuter les fonctions de sécurité au chargement du DOM
  document.addEventListener("DOMContentLoaded", function () {
    preventIframeEmbedding();
    showConsoleWarning();
    protectImagesFromCopy();
  });
})();
