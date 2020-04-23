import axios from "axios";

//criando url base para requisições
const url = "http://localhost:5555";

//configurando o typo de requisição e rota base
export const client = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer b0735a3f-cf73-444b-afbb-1af9adabfe5c`,
  },
});
