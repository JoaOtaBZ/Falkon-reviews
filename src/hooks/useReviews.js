import { useEffect, useState } from "react";
import { db } from "../data/db";
import { useUser } from "../context/UserContext";

const BONUS_VALUE = 5;

export function useReviews() {
  const { userId } = useUser();

  const usuarioLogado = db.usuarios.find((usuario) => usuario.id === userId);

  const [reviews, setReviews] = useState([]);
  const [wallet, setWallet] = useState(usuarioLogado.carteira_saldo);

  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews_${userId}`);
    const savedWallet = localStorage.getItem(`wallet_${userId}`);

    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews([]);
    }

    if (savedWallet) {
      setWallet(Number(savedWallet));
    } else {
      setWallet(usuarioLogado.carteira_saldo);
    }
  }, [userId, usuarioLogado.carteira_saldo]);

  function addReview(productId, rating, comment) {
    const alreadyReviewed = reviews.some(
      (review) => review.productId === productId && review.userId === userId
    );

    if (alreadyReviewed) {
      alert("Você já avaliou esse produto.");
      return false;
    }

    const newReview = {
      id: Date.now().toString(),
      userId,
      productId,
      rating: Number(rating),
      comment,
      bonus: BONUS_VALUE,
      createdAt: new Date().toLocaleDateString("pt-BR"),
    };

    const updatedReviews = [...reviews, newReview];
    const updatedWallet = wallet + BONUS_VALUE;

    setReviews(updatedReviews);
    setWallet(updatedWallet);

    localStorage.setItem(`reviews_${userId}`, JSON.stringify(updatedReviews));
    localStorage.setItem(`wallet_${userId}`, String(updatedWallet));

    return true;
  }

  function getReviewByProduct(productId) {
    return reviews.find(
      (review) => review.productId === productId && review.userId === userId
    );
  }

  return {
    usuarioLogado,
    reviews,
    wallet,
    addReview,
    getReviewByProduct,
  };
}