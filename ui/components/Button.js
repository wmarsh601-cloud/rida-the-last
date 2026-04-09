import './Button.css';

export default function Button({ children, ...props }) {
  return (
    <button className="ui-btn" {...props}>{children}</button>
  );
}
