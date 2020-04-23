import axios from "axios";

//criando url base para requisições
const url = "http://localhost:5555";

//configurando o typo de requisição e rota base
export const client = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer 4d12f55f-4af3-49a5-873b-c72a4980c4b8`,
  },
});
