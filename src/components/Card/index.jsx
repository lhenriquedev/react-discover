import "./styles.css";

// via props -> props.name
// via destructuring { name } -> { name }
export function Card({ id, name, time, handleDeleteUser }) {
  return (
    <div className="card">
      <div className="cardInfo">
        <strong>{name}</strong>
        <small>{time}</small>
      </div>
      <button className="button" onClick={handleDeleteUser}>
        Delete
      </button>
    </div>
  );
}
