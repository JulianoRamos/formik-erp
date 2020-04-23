import React from "react";
import MaterialTableDemo from "./table";

export default function EmpresaList({ empresas, deleteEmpresa }) {
  const title = "Empresa";
  const columns = [
    { title: "Código", field: "id" },
    { title: "Razão Social", field: "razaoSocial" },
    { title: "Nome Fantasia", field: "nomeFantasia" },
    { title: "CNPJ", field: "cnpj" },
    { title: "Inscrição Estadual", field: "inscricaoEstadual" },
    { title: "Telefone", field: "telefone" },
  ];

  return (
    <MaterialTableDemo
      title={title}
      columns={columns}
      data={empresas}
      del={deleteEmpresa}
    />
  );
}
