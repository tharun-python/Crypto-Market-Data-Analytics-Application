function SignalCard({ signal }) {
  return (
    <div className="signal-item">
      <div>
        <h3>{signal.symbol}</h3>
        <p>{signal.reason}</p>
      </div>
      <span className={`badge ${signal.signal?.toLowerCase()}`}>
        {signal.signal}
      </span>
    </div>
  );
}

export default SignalCard;