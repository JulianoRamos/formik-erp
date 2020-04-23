import React, { Component } from "react";
import { connect } from "react-redux";

//importando o EmpresaList que criamos
import EmpresaList from "../components/empresa-list";

class EmpresaListPage extends Component {
  //definindo que sejam buscado todos os \
  //contatos na API antes de renderizar o componente
  componentDidMount() {
    this.props.fetchEmpresas();
  }

  //Criando o compoente e passando todos os contatos como
  //propriedade para ele juntamente com a função de deletar contato
  render() {
    return (
      <EmpresaList
        empresas={this.props.empresas}
        deleteEmpresa={this.props.deleteEmpresa}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  empresas: state.empresa.empresas,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmpresas: dispatch.empresa.fetchEmpresas,
  deleteEmpresa: dispatch.empresa.deleteEmpresa,
});
export default connect(mapStateToProps, mapDispatchToProps)(EmpresaListPage);
