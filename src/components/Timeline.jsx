import { useEffect, useRef, useState } from "react";
import { memories } from "../data/memories";
import ValentineModal from "./ValentineModal";

export default function Timeline() {
  const itemsRef = useRef([]);
  const [showModal, setShowModal] = useState(false);

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

  // Lock background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <div className="timeline">
      <h1 className="title">Our Story 💘</h1>

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

      {/* Modal */}
      <ValentineModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
