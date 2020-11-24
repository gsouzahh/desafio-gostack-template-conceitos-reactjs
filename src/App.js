import React, { useState, useEffect } from "react";
import "./styles.css";
import Api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    Api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await Api.post('repositories', {
      title: "New",
      url: "https://api.github.com/users/Diego3g",
      techs: ["teste1", "teste2", "teste3"]
    })
    const repositorie = response.data;
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    await Api.delete(`repositories/${id}`);
    const newArray = repositories.findIndex(repo => repo.id === id);
    if (newArray > -1) 
      repositories.splice(newArray, 1);
    
    setRepositories([...repositories]);
  }

  return (
    <div id="container">
      <ul data-testid="repository-list">
        {
          repositories.map(repo =>
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
          </button>
            </li>
          )}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;