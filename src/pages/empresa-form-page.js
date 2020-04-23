import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

//importando o EmpresaForm criado anteriormente
import EmpresaForm from "../components/empresa-form";

class EmpresaFormPage extends Component {
  //Verificando se nos parâmetros contém o id
  //caso tenha o id, será buscado o contato com esse id, caso não tenha, será iniciado o form em branco
  componentDidMount = () => {
    const { id } = this.props.match.params;
    if (id) {
      this.props.fetchEmpresa(id);
    } else {
      this.props.newEmpresa();
    }
  };

  //verificando como está o redirect para definir o encaminhamento
  render() {
    //caso permaneça nessa page, vai ser criado o EmpresaForm com as devidas props
    return (
      <div>
        {this.props.redirect ? (
          <Redirect to="/" />
        ) : (
          <EmpresaForm
            empresa={this.props.empresa}
            loading={this.props.empresa.loading}
            saveEmpresa={this.props.saveEmpresa}
            updateEmpresa={this.props.updateEmpresa}
            onSubmit={this.submit}
            errors={this.props.errors}
            redirect={this.props.redirect}
            cancelForm={this.props.cancelForm}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  empresa: state.empresa.empresa,
  errors: state.empresa.errors,
  redirect: state.empresa.redirect,
});

const mapDispatchToProps = (dispatch) => ({
  saveEmpresa: dispatch.empresa.saveEmpresa,
  fetchEmpresa: dispatch.empresa.fetchEmpresa,
  updateEmpresa: dispatch.empresa.updateEmpresa,
  newEmpresa: dispatch.empresa.newEmpresa,
  cancelForm: dispatch.empresa.cancelForm,
});

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaFormPage);
