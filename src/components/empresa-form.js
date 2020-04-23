import React, { Component } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  ButtonGroup,
  TextField,
  AppBar,
  Tab,
  Tabs,
  Typography,
  Box,
  MenuItem,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box pt={1}>{children}</Box>}
    </Typography>
  );
}

const theme = createMuiTheme();

//definindo como é a forma padrão dos dados do form
const defaultFormShape = {
  razaoSocial: "",
  nomeFantasia: "",
  cnpj: "",
  inscricaoEstadual: "",
  telefone: "",
  email: "",
  cep: "",
  logradouro: "",
  bairro: "",
  numero: "",
  complemento: "",
  contador: "",
  cnaePrincipal: "",
  regimeTributario: "SN",
};

class EmpresaForm extends Component {
  state = {
    value: 0,
  };

  handleChangeTabs = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  render() {
    //usando o Yup para criar o schema de validação do formulário
    const validationSchema = Yup.object().shape({
      razaoSocial: Yup.string()
        .required("O campo é obrigatório.")
        .max(60, "O campo deve ter no máximo 60 caracteres."),
      nomeFantasia: Yup.string()
        .required("O campo é obrigatório.")
        .max(60, "O campo deve ter no máximo 60 caracteres."),
      email: Yup.string().email("Digite um email válido."),
    });

    return (
      <Formik
        //verificando o form será iniciado com os dados da props ou em branco
        initialValues={
          this.props.empresa.razaoSocial ? this.props.empresa : defaultFormShape
        }
        enableReinitialize
        //atribuino o nosso Schema que fizemos como Yup como o padrão de validação
        validationSchema={validationSchema}
        //verificando se o contato já tem um id pra definir se irá salvar ou atualizar
        onSubmit={(values) => {
          if (!values.id) {
            return this.props.saveEmpresa(values);
          } else {
            return this.props.updateEmpresa(values);
          }
        }}
        //passando os atributos do Formik na rederização do formulário
        render={({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Card variant="outlined">
            <form onSubmit={handleSubmit} loading={this.props.loading}>
              {/* definindo pelo id se vai ser mostrado o cabeçalho de edit ou
              insert */}
              <CardHeader
                title={
                  this.props.empresa.id ? "Editar Empresa" : "Adicionar Empresa"
                }
                action={
                  <ButtonGroup color="primary">
                    <Button onClick={this.props.cancelForm}>Cancelar</Button>
                    <Button type="submit">Salvar</Button>
                  </ButtonGroup>
                }
              />
              <CardContent>
                <AppBar position="static" color="default" variant="outlined">
                  <Tabs
                    value={this.state.value}
                    onChange={this.handleChangeTabs}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                  >
                    <Tab label="Básico" />
                    <Tab label="Endereço" />
                    <Tab label="Fiscal" />
                  </Tabs>
                </AppBar>
                <TabPanel
                  value={this.state.value}
                  index={0}
                  dir={theme.direction}
                >
                  <TextField
                    required
                    style={{ marginTop: 8, marginBottom: 8 }}
                    label="Razão Social"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    name="razaoSocial"
                    value={values.razaoSocial}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.razaoSocial &&
                      touched.razaoSocial &&
                      errors.razaoSocial
                    }
                    error={errors.razaoSocial && touched.razaoSocial}
                  />

                  <TextField
                    required
                    style={{ marginTop: 8, marginBottom: 8 }}
                    label="Nome Fantasia"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    name="nomeFantasia"
                    value={values.nomeFantasia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.nomeFantasia &&
                      touched.nomeFantasia &&
                      errors.nomeFantasia
                    }
                    error={errors.nomeFantasia && touched.nomeFantasia}
                  />
                  <TextField
                    label="CNPJ"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="cnpj"
                    value={values.cnpj}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="Inscrição Estadual (IE)"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="inscricaoEstadual"
                    value={values.inscricaoEstadual}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="Telefone"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="telefone"
                    value={values.telefone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="E-mail"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email && touched.email && errors.email}
                    error={errors.email && touched.email}
                  />
                </TabPanel>
                <TabPanel
                  value={this.state.value}
                  index={1}
                  dir={theme.direction}
                >
                  <TextField
                    label="Cep"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="cep"
                    value={values.cep}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="Logradouro"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="logradouro"
                    value={values.logradouro}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="Bairro"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="bairro"
                    value={values.bairro}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="Número"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="numero"
                    value={values.numero}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="Municipio"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="municipio"
                    value={values.municipio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="Complemento"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="complemento"
                    value={values.complemento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </TabPanel>
                <TabPanel
                  value={this.state.value}
                  index={2}
                  dir={theme.direction}
                >
                  <TextField
                    label="Contador"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="contador"
                    value={values.contador}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    label="CNAE Principal"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="cnaePrincipal"
                    value={values.cnaePrincipal}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    required
                    select
                    label="Regime Tributário"
                    style={{ marginTop: 8, marginBottom: 8 }}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    name="regimeTributario"
                    value={values.regimeTributario}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="SN">Simples Nacional</MenuItem>
                    <MenuItem value="LP">Lucro Presumido</MenuItem>
                    <MenuItem value="LR">Lucro Real</MenuItem>
                  </TextField>
                </TabPanel>
              </CardContent>
            </form>
          </Card>
        )}
      />
    );
  }
}

export default EmpresaForm;
