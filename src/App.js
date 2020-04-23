import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

//importando as páginas da aplicação
import EmpresaListPage from "./pages/empresa-list-page";
import EmpresaFormPage from "./pages/empresa-form-page";

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          {/* criando o menu */}
          <div className="ui two item menu">
            <NavLink className="item" activeClassName="active" exact to="/">
              Contacts List
            </NavLink>

            <NavLink
              className="item"
              activeClassName="active"
              exact
              to="/empresas/new"
            >
              Add Contact
            </NavLink>
          </div>
          {/* definindo as rotas da aplicação, e as páginas que devem ser abertas
          ao acessa-las */}
          <Route exact path="/" component={EmpresaListPage} />
          <Route path="/empresas/new" component={EmpresaFormPage} />
          <Route path="/empresas/edit/:id" component={EmpresaFormPage} />
        </Container>
      </div>
    );
  }
}

export default App;
