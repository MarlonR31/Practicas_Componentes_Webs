import { useState } from "react";

const FormSearch = ({ onSearch }) => { 
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación: No buscar si el input está vacío o solo tiene espacios
        if (title.trim() === "") {
            alert("Por favor, escribe el nombre de una película.");
            return;
        }

        console.log("Buscando:", title);
        
        // Enviamos el título limpio (sin espacios extras) hacia App.jsx
        if (onSearch) {
            onSearch(title.trim()); 
        }
    }

    return (
        <div className="form-search">
            <h2>Old Movies Finder</h2>
            
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Escribe una película..." 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default FormSearch;