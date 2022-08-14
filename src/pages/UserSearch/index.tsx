import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type FormData = {
  user: string;
};

type User = {
  avatar_url: string;
  url: string;
  location: string;
  followers: string;
  name: string;
};

const UserSearch = () => {
  const [user, setUser] = useState<User>();

  const [formData, setFormData] = useState<FormData>({
    user: '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${formData.user}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        setUser(undefined);
      });
  };

  return (
    <div className="container main-container">
      <div className="user-search-container">
        <h1 className="">Encontre um perfil Github</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="user"
              value={formData.user}
              className="search-input"
              placeholder="usuário do GitHub"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>

      {user && (
        <>
          <div className="container search-container">
            <div className="img-container">
              <img src={user.avatar_url} alt="User avatar" />
            </div>
            <div className="user-info-container">
              <h2>Informações</h2>
              <a href={user.url}>
                <ResultCard title="Perfil:" description={user.url} />
              </a>
              <ResultCard title="Seguidores:" description={user.followers} />
              <ResultCard title="Localidade:" description={user.location} />
              <ResultCard title="Nome:" description={user.name} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSearch;
