import { useState } from "react";
import confetti from "canvas-confetti";

export default function ValentineModal({ isOpen, onClose }) {
  const [accepted, setAccepted] = useState(false);

  if (!isOpen) return null;

  const fireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#ff5fa2", "#ff8ccf", "#ffd1e8"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.4 },
        colors: ["#ff5fa2", "#ff8ccf", "#ffd1e8"],
      });
    }, 300);

    setAccepted(true);
  };


  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {!accepted ? (
          <>
            <h1>Will you be my VALEntine? 💖</h1>

            <div className="modal-buttons">
              <button className="yes-btn" onClick={fireConfetti}>
                YES 💘
              </button>
              <button
                className="yes-btn secondary"
                onClick={fireConfetti}
              >
                Obviously yes 😌
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>YAY!! 🎉💞</h1>
            <p style={{ fontSize: "1.1rem" }}>
              I can’t wait to spend VALEntine’s Day with you 🥰
              {/* Add a custome message here later */}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
