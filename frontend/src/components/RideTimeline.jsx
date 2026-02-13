import "../styles/rideTimeline.css";

export default function RideTimeline({ status }) {
  const steps = ["requested", "accepted", "completed"];

  const isDone = (step) => steps.indexOf(step) < steps.indexOf(status);
  const isActive = (step) => step === status;

  return (
    <div className="timeline">
      {steps.map((step, index) => (
        <div className="timeline-step" key={step}>
          <div
            className={`circle 
              ${isDone(step) ? "done" : ""} 
              ${isActive(step) ? "active" : ""}`}
          >
            {isDone(step) ? "✓" : index + 1}
          </div>

          <span className="label">
            {step.charAt(0).toUpperCase() + step.slice(1)}
          </span>

          {index < steps.length - 1 && <div className="line" />}
        </div>
      ))}
    </div>
  );
}
