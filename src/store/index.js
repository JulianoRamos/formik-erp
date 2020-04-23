//importando o método init do rematch que vai iniciar o store
import { init } from "@rematch/core";
//importando o 'index.js' criado na pasta
import models from "../models";

const store = init({
  models,
});

export default store;
