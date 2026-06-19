function WalletCard({ wallet }) {
  return (
    <div className="wallet-card">
      <span>Saldo disponível</span>

      <strong>R$ {wallet.toFixed(2).replace(".", ",")}</strong>

      <p>Ganhe R$ 5,00 por avaliação enviada.</p>
    </div>
  );
}

export default WalletCard;