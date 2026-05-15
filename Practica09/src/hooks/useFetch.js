import { useState, useEffect } from "react";

export const useFetch = (busqueda) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // IMPORTANTE: Sustituye '4287ad07' por tu propia API Key si esta falla.
  const API_KEY = "4287ad07"; 

  useEffect(() => {
    // Si el usuario no ha escrito nada, no hacemos la petición
    if (!busqueda || busqueda.trim() === "") {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Limpiamos errores previos antes de buscar

      try {
        // Hacemos la petición a la API de OMDb usando el título (t=)
        const response = await fetch(
          `https://www.omdbapi.com/?t=${encodeURIComponent(busqueda)}&apikey=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Error en la conexión con el servidor");
        }

        const result = await response.json();

        // OMDb devuelve Response: "False" si no encuentra la película
        if (result.Response === "False") {
          throw new Error(result.Error || "No se encontró la película");
        }

        // Si todo sale bien, guardamos los datos
        setData(result);
      } catch (err) {
        // Guardamos el mensaje de error para mostrarlo en App.jsx
        setError(err.message);
        setData(null);
      } finally {
        // Quitamos el estado de carga
        setLoading(false);
      }
    };

    fetchData();
  }, [busqueda]); // Este efecto se ejecuta cada vez que 'busqueda' cambia

  // Retornamos los estados para que App.jsx los pueda usar
  return { data, loading, error };
};