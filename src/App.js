import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);


  async function handleAddRepository() {

    const res = await api.post('repositories', {
      title:`New repository ${Date.now()}`,
      url: "github.com/teste",
      techs:[]
    });

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepository = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepository);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository =>
         <li key = {repository.id}>
           {repository.title}
           <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>)
      }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;