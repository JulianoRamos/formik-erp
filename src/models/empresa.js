//importando o client pra ser utilizado
import { client } from "../client/client";

//definindo a rota a ser acrescentada na rota base definida no client
const url = "/empresa";

const empresa = {
  //definindo o estado inicial da aplicação
  state: {
    empresas: [],
    empresa: {},
    loading: false,
    errors: {},
    redirect: false,
  },

  //definindo todos os reducers
  reducers: {
    //cancela o formulário e limpa os dados do formulário
    cancelForm: (state) => {
      return {
        ...state,
        redirect: true,
      };
    },

    //atualiza a lista de contatos da aplicação caso os contatos tenham sido obtidos da API com sucesso
    fetchEmpresasFulfiled: (state, payload) => {
      return {
        ...state,
        empresas: payload.data || payload,
        redirect: false,
      };
    },

    //Deixa a aplicação pronta para receber um novo contato no formulário
    newEmpresa: (state) => {
      return {
        ...state,
        empresa: {},
      };
    },

    //atualiza a lista de contatos da aplicação caso o contato tenha sido salvo com sucesso
    saveEmpresaFulfilled: (state, payload) => {
      return {
        ...state,
        empresas: [...state.empresas, payload],
        errors: {},
        loading: false,
        redirect: true,
      };
    },

    //altera o estado da aplicação para informar que tem uma operação sendo executada.
    saveEmpresaPending: (state) => {
      return {
        ...state,
        loading: true,
      };
    },

    //mostra os erros encontrados no caso de a operação de salvar contato apresente algum problema
    saveEmpresaRejected: (state, payload) => {
      // converte os errors do feathers para um formato a ser mostrado no Front
      const { razaoSocial, nomeFantasia } = payload.errors;
      const errors = {
        global: payload.message,
        razaoSocial,
        nomeFantasia,
      };
      return {
        ...state,
        errors: errors,
        loading: false,
      };
    },

    //altera o estado da aplicação no caso de a busca de um contato tenha dado certo
    fetchEmpresaFulfiled: (state, payload) => {
      return {
        ...state,
        empresa: payload,
        errors: {},
        loading: false,
        redirect: false,
      };
    },

    //altera o estado da aplicação no caso de a alteração de um contato tenha dado certo
    updateEmpresaFulfiled: (state, payload) => {
      const empresa = payload;
      return {
        ...state,
        empresas: state.empresas.map((item) =>
          item.id === empresa.id ? empresa : item
        ),
        errors: {},
        loading: false,
        redirect: true,
      };
    },

    //mostra os erros encontrados no caso de a operação de atualizar contato apresente algum problema
    updateEmpresaRejected: (state, payload) => {
      const { razaoSocial, nomeFantasia } = payload.errors;
      const errors = {
        global: payload.message,
        razaoSocial,
        nomeFantasia,
      };
      return {
        ...state,
        errors: errors,
        loading: false,
      };
    },

    //altera o estado da aplicação para informar que tem uma operação sendo executada.
    updateEmpresaPending: (state) => {
      return {
        ...state,
        loading: true,
      };
    },

    //altera o estado da aplicação para informar que tem uma operação sendo executada.
    fetchEmpresaPending: (state) => {
      return {
        ...state,
        loading: true,
        empresa: {},
      };
    },

    //atualiza a lista de contatos da aplicação caso o contato tenha sido deletado da API com sucesso
    deleteEmpresaFulfiled: (state, payload) => {
      const id = payload.id;
      return {
        ...state,
        empresas: state.empresas.filter((item) => item.id !== id),
      };
    },
  },

  //definindo os effects
  effects: (dispatch) => ({
    //aciona a ação de buscar os contatos
    fetchEmpresas() {
      //faz a chamada com o client para buscar todos os contatos
      return client.get(url).then((res) => {
        //caso tudo ocorra bem, o reducer abaixo vai ser acionado
        dispatch.empresa.fetchEmpresasFulfiled(res.data.content);
      });
    },

    //faz a chamada com o client para buscar um contato, por meio do id
    fetchEmpresa(id) {
      //faz a chamada desse reducer pra informar que tem uma operação sendo executada
      dispatch.empresa.fetchEmpresaPending();
      return client.get(`${url}/${id}`).then((res) => {
        //caso tudo ocorra bem, o reducer abaixo vai ser acionado
        dispatch.empresa.fetchEmpresaFulfiled(res.data);
      });
    },

    //faz a chamada com o client para atualizar os dados de um contato
    updateEmpresa(empresa) {
      //faz a chamada desse reducer pra informar que tem uma operação sendo executada
      dispatch.empresa.updateEmpresaPending();
      return client
        .put(`${url}/${empresa.id}`, empresa)
        .then((res) => {
          //caso tudo ocorra bem, o reducer abaixo vai ser acionado
          dispatch.empresa.updateEmpresaFulfiled(res.data);
        })
        .catch((err) => {
          //caso ocorra algum problema, o reducer abaixo vai ser acionado
          dispatch.empresa.updateEmpresaRejected(err.response.data);
        });
    },

    //faz a chamada com o client para salar os dados de um contato
    saveEmpresa(empresa) {
      //faz a chamada desse reducer pra informar que tem uma operação sendo executada
      dispatch.empresa.saveEmpresaPending();
      return client
        .post(url, empresa)
        .then((res) => {
          //caso tudo ocorra bem, o reducer abaixo vai ser acionado
          dispatch.empresa.saveEmpresaFulfilled(res.data);
        })
        .catch((err) => {
          //caso ocorra algum problema, o reducer abaixo vai ser acionado
          dispatch.empresa.saveEmpresaRejected(err.response.data);
        });
    },

    //faz a chamada com o client para apagar um contato
    deleteEmpresa(id) {
      return client.delete(`${url}/${id}`).then((res) => {
        //caso tudo ocorra bem, o reducer abaixo vai ser acionado
        dispatch.empresa.deleteEmpresaFulfiled(res.data);
      });
    },
  }),
};

export default empresa;
