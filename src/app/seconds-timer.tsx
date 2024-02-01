export default function SecondsTimer({
  percentage, size = 18
}: {
  percentage: number,
  size?: number
}) {
  return (
    <div style={{
      opacity: "0.6",
      marginLeft: "4px",
      position: "relative",
      transform: "scaleX(-1) rotate(-90deg)",
    }}>
      <svg viewBox="0 0 64 64" style={{
        height: size,
        width: size,
        borderRadius: "50%",
        backgroundColor: "black"
      }}>
        <circle r="25%" cx="50%" cy="50%" style={{
          fill: "none",
          strokeDasharray: (100 - percentage).toFixed(2) + " 100",
          stroke: "white",
          strokeWidth: "32",
        }}>
        </circle>
        <circle r="45%" cx="50%" cy="50%" style={{
          fill: "none",
          stroke: "black",
          strokeWidth: "6"
        }}></circle>
      </svg>
    </div>
  );
}