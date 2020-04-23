import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "@material-ui/core";

export default function EmpresaCard({ empresa, deleteEmpresa }) {
  return (
    <Card>
      <Card>
        {empresa.razaoSocial}
        <p>{empresa.nomeFantasia}</p>
        <div>
          <Link to={`/empresas/edit/${empresa.id}`}>Edit</Link>
          <Button onClick={() => deleteEmpresa(empresa.id)}>Delete</Button>
        </div>
      </Card>
    </Card>
  );
}
