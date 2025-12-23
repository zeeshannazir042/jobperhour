export function Card({ children, className = "" }) {
  return (
    <div
      className={`border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
