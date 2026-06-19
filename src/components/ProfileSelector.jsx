import { db } from "../data/db";
import { useUser } from "../context/UserContext";

function ProfileSelector() {
  const { userId, setUserId } = useUser();

  const usuarioAtual = db.usuarios.find((user) => user.id === userId);

  return (
    <div className="profile-fixed">
      <img
        src={usuarioAtual.foto}
        alt={usuarioAtual.nome}
        className="profile-avatar"
      />

      <div>
        <span className="profile-label">Perfil</span>

        <select
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          className="profile-select"
        >
          {db.usuarios.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nome}
            </option>
          ))}
        </select>

        <span className={`profile-level ${usuarioAtual.nivel}`}>
          {usuarioAtual.nivel}
        </span>
      </div>
    </div>
  );
}

export default ProfileSelector;