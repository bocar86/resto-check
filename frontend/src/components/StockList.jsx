import { useState, useEffect } from "react";
import "./StockList.css";

const API_URL = "http://localhost:3000/stock";

function StockList() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchStock = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la récupération du stock");
        return res.json();
      })
      .then((data) => {
        setStock(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStock();
  }, []);

  if (loading) return <p className="stock-status">Chargement du stock...</p>;
  if (error)
    return <p className="stock-status stock-error">Erreur : {error}</p>;

  const filteredStock = stock.filter((item) =>
    item.nom.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="stock-container">
      <div className="stock-header">
        <h2>Aperçu du stock</h2>
        <button className="btn-refresh" onClick={fetchStock}>
          ↻ Actualiser
        </button>
      </div>

      <input
        type="text"
        className="stock-search"
        placeholder="Rechercher un article..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredStock.length === 0 ? (
        <p className="stock-status">Aucun article trouvé.</p>
      ) : (
        <table className="stock-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Quantité</th>
              <th>Unité</th>
              <th>Catégorie</th>
              <th>Seuil d'alerte</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredStock.map((item) => {
              const enAlerte =
                item.seuil_alerte !== null && item.quantite < item.seuil_alerte;
              return (
                <tr
                  key={item.id_stock}
                  className={enAlerte ? "row-alerte" : ""}
                >
                  <td>{item.nom}</td>
                  <td>{item.quantite}</td>
                  <td>{item.unite}</td>
                  <td>{item.categorie ?? "-"}</td>
                  <td>{item.seuil_alerte ?? "-"}</td>
                  <td>
                    {enAlerte && <span className="badge-alerte">⚠ Bas</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StockList;
