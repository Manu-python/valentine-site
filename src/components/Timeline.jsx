import { useEffect, useRef, useState } from "react";
import { memories } from "../data/memories";
import ValentineModal from "./ValentineModal";

// Helper function to calculate days together
function daysTogether(startDate) {
  const start = new Date(startDate);
  const today = new Date();
  const diffTime = today - start;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export default function Timeline() {
  const itemsRef = useRef([]);
  const [showModal, setShowModal] = useState(false);

  // CHANGE THIS DATE ⬇️ (YYYY-MM-DD)
  const DAYS_TOGETHER = daysTogether("2025-05-30");

  // Scroll fade / slide animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    itemsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <div className="timeline">
      <h1 className="title">Our Story 💘</h1>

      <p className="days-counter">
        {DAYS_TOGETHER} days of us 💖
      </p>

      {memories.map((m, i) => (
        <div
          key={i}
          className="memory"
          ref={(el) => (itemsRef.current[i] = el)}
        >
          <img src={m.image} alt={m.title} />
          <h2>{m.title}</h2>
          <p>{m.text}</p>
        </div>
      ))}

      {/* Valentine Question Section */}
      <div className="valentine-section">
        <button
          className="valentine-btn"
          onClick={() => setShowModal(true)}
        >
          💌 One last question…
        </button>
      </div>

      {/* Timeline footer */}
      <p className="timeline-footer">
        This timeline is still being written ✨
      </p>

      {/* Modal */}
      <ValentineModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}