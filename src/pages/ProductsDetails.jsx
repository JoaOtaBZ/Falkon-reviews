import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../data/db";
import { useReviews } from "../hooks/useReviews";
import RatingStars from "../components/RatingStars";

function ProductsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = db.produtos.find((item) => item.id === id);

  const { addReview, getReviewByProduct, wallet } = useReviews();

  const existingReview = getReviewByProduct(id);

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  if (!product) {
    return (
      <main className="container">
        <h1>Produto não encontrado</h1>
        <Link to="/">Voltar para início</Link>
      </main>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!rating || !comment.trim()) {
      alert("Preencha a nota e o comentário.");
      return;
    }

    const success = addReview(id, rating, comment);

    if (success) {
      alert("Avaliação enviada! Você ganhou R$ 5,00.");
      navigate("/");
    }
  }

  return (
    <main className="container">
      <Link to="/" className="back-link">
        ← Voltar
      </Link>

      <section className="details-card">
        <img
          src={product.imagem}
          alt={product.nome}
          className="details-image"/>

        <div>
          <div className="product-top">
            <span className="category">{product.categoria}</span>

            {product.promocao && <span className="promo-badge">Promoção</span>}
          </div>

          <h1>{product.nome}</h1>

          <p>{product.descricao}</p>

          <strong className="price">
            R$ {product.preco.toFixed(2).replace(".", ",")}
          </strong>

          <p className="average-rating">Nota média da loja: {product.nota}/5</p>

          <p className="stock">
            Estoque:{" "}
            {product.estoque > 0
              ? `${product.estoque} unidade(s)`
              : "Produto esgotado"}
          </p>

          <div className="wallet-small">
            Saldo atual: R$ {wallet.toFixed(2).replace(".", ",")}
          </div>
        </div>
      </section>

      <section className="review-section">
        <h2>Avaliação do produto</h2>

        {existingReview ? (
          <div className="existing-review">
            <h3>Sua avaliação</h3>

            <RatingStars rating={existingReview.rating} />

            <p>{existingReview.comment}</p>

            <small>Enviada em: {existingReview.createdAt}</small>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="review-form">
            <label>
              Nota
              <select
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              >
                <option value="">Selecione uma nota</option>
                <option value="1">1 - Muito ruim</option>
                <option value="2">2 - Ruim</option>
                <option value="3">3 - Regular</option>
                <option value="4">4 - Bom</option>
                <option value="5">5 - Excelente</option>
              </select>
            </label>

            <label>
              Comentário técnico
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Ex: Produto com boa construção, resposta rápida e ótimo desempenho para jogos e programação..."
              />
            </label>

            <button type="submit">Enviar avaliação e ganhar R$ 5,00</button>
          </form>
        )}
      </section>
    </main>
  );
}

export default ProductsDetails;