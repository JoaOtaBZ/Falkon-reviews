import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

function ProductCard({ product, review }) {
  return (
    <div className="product-card">
      <img src={product.imagem} alt={product.nome} className="product-image" />

      <div className="product-info">
        <div className="product-top">
          <span className="category">{product.categoria}</span>

          {product.promocao && <span className="promo-badge">Promoção</span>}
        </div>

        <h3>{product.nome}</h3>

        <p className="product-description">{product.descricao}</p>

        <strong className="product-price">
          R$ {product.preco.toFixed(2).replace(".", ",")}
        </strong>

        <p className="order-info">
          Pedido #{product.pedido.id} — {product.pedido.status}
        </p>

        <p className="average-rating">Nota média da loja: {product.nota}/5</p>

        <div className={review ? "review-status done" : "review-status pending"}>
          {review ? "Avaliado" : "Pendente"}
        </div>

        <RatingStars rating={review?.rating} />

        <Link to={`/produto/${product.id}`} className="review-button">
          {review ? "Ver minha avaliação" : "Avaliar e ganhar R$ 5,00"}
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;