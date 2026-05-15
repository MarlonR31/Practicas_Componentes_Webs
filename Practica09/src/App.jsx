import { useState } from "react";
import FormSearch from "./components/FormSearch";
import { useFetch } from "./hooks/useFetch.js"; 
import "./App.css";

function App() {
  const [resultado, setResultado] = useState("");
  const { data, loading, error } = useFetch(resultado);

  const handleSearch = (busqueda) => {
    setResultado(busqueda);
  };

  return (
    <div className="App">
      {/* Tu CSS tiene estilos para .form-search h2 y los inputs */}
      <FormSearch onSearch={handleSearch} />

      <main>
        {/* Tu CSS tiene una animación para la clase .loading */}
        {loading && <div className="loading"></div>}

        {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

        {/* Estructura adaptada a .single-movie de tu CSS */}
        {data && !loading && (
          <div className="single-movie">
            <img 
              src={data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/300x450?text=No+Image"} 
              alt={data.Title} 
            />
            <div className="single-info">
              <h2>{data.Title}</h2>
              <p><strong>Year:</strong> {data.Year}</p>
              <p><strong>Plot:</strong> {data.Plot}</p>
              <p><strong>Director:</strong> {data.Director}</p>
              <p><strong>Actors:</strong> {data.Actors}</p>
              <p><strong>Rating:</strong> ⭐ {data.imdbRating}</p>
            </div>
          </div>
        )}

        {!resultado && !loading && (
          <p className="author">Escribe una película para ver los detalles.</p>
        )}
      </main>

      <footer className="author">
        Hecho por <a href="#">Marlon Ramos - UNIVO 2026</a>
      </footer>
    </div>
  );
}

export default App;