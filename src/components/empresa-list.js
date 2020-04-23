import React from "react";
import { Card } from "@material-ui/core";
import EmpresaCard from "./empresa-card";

export default function EmpresaList({ empresas, deleteEmpresa }) {
  //percorrendo todos os registros recebidos nas props
  //e criando um Card para cada contato
  const cards = () => {
    return empresas.map((empresa) => {
      return (
        //atribuindo a um novo Card o contato
        <EmpresaCard
          key={empresa.id}
          empresa={empresa}
          deleteEmpresa={deleteEmpresa}
        />
      );
    });
  };

  return (
    <Card>
      {/* renderizando a funciton para formar a lista */}
      {cards()}
    </Card>
  );
}
