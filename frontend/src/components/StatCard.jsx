function StatCard({ title, value, change, danger }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h2>{value}</h2>
      <span className={danger ? "red" : "green"}>{change}</span>
    </div>
  );
}

export default StatCard;