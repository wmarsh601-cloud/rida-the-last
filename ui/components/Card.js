import './Card.css';

export default function Card({ children, ...props }) {
  return (
    <div className="ui-card" {...props}>{children}</div>
  );
}
