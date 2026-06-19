import { db } from "../data/db";
import { useReviews } from "../hooks/useReviews";
import ProductCard from "../components/ProductCard";
import WalletCard from "../components/WalletCard";
import { useUser } from "../context/UserContext";
import ProfileSelector from "../components/ProfileSelector";

function Home() {
  const { userId } = useUser();

  const { wallet, usuarioLogado, reviews, getReviewByProduct } = useReviews();

  const pedidosEntregues = db.pedidos.filter(
    (pedido) => pedido.usuarioId === userId && pedido.status === "entregue"
  );

  const produtosComprados = pedidosEntregues.map((pedido) => {
    const produto = db.produtos.find(
      (produto) => produto.id === pedido.produtoId
    );

    return {
      ...produto,
      pedido,
    };
  });

  const avaliacoesEnviadas = reviews.length;

  const produtosPendentes = produtosComprados.filter(
    (produto) => !getReviewByProduct(produto.id)
  ).length;

  const bonusRecebido = avaliacoesEnviadas * 5;

  const bonusPendente = produtosPendentes * 5;

  return (
    <main className="container">
      <ProfileSelector />

      <header className="hero">
        <div>
          <span className="tag">Portal de Review</span>

          <h1>Falkon Reviews</h1>

          <p>
            Olá, {usuarioLogado.nome}. Avalie os produtos que você comprou e
            ganhe R$ 5,00 de saldo por avaliação enviada.
          </p>

          {produtosComprados.length === 0 ? (
  <p className="bonus-message neutral">
    Você ainda não possui pedidos entregues para avaliação.
  </p>
) : produtosPendentes > 0 ? (
  <p className="bonus-message">
    Você ainda pode ganhar mais{" "}
    <strong>R$ {bonusPendente.toFixed(2).replace(".", ",")}</strong>{" "}
    avaliando seus produtos pendentes.
  </p>
) : (
  <p className="bonus-message success">
    Parabéns! Você já avaliou todos os produtos disponíveis.
  </p>
)}
        </div>

        <WalletCard wallet={wallet} />
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Produtos para avaliar</span>
          <strong>{produtosPendentes}</strong>
        </div>

        <div className="stat-card">
          <span>Avaliações enviadas</span>
          <strong>{avaliacoesEnviadas}</strong>
        </div>

        <div className="stat-card">
          <span>Bônus recebido</span>
          <strong>R$ {bonusRecebido.toFixed(2).replace(".", ",")}</strong>
        </div>
      </section>

      <section className="section-title">
        <h2>Produtos comprados</h2>

        <p>
          Veja seus pedidos entregues e compartilhe sua experiência com a
          comunidade geek, tech e gamer.
        </p>
      </section>

      <div className="products-grid">
        {produtosComprados.length > 0 ? (
          produtosComprados.map((produto) => (
            <ProductCard
              key={produto.id}
              product={produto}
              review={getReviewByProduct(produto.id)}
            />
          ))
        ) : (
          <div className="empty-message">
            Faça pedidos para poder avaliar.
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;