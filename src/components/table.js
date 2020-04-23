import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import MaterialTable from "material-table";
import {
  FilterList as FilterListIcon,
  Assignment as AssignmentIcon,
  Add as AddIcon,
  Create as CreateIcon,
} from "@material-ui/icons";

export default function MaterialTableDemo({ title, columns, data, del }) {
  const history = useHistory();
  const match = useRouteMatch();
  const [filtering, setFiltering] = useState(false);
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            resolve();
            del(oldData.id);
          }),
      }}
      style={{
        boxShadow: "none",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.12)",
      }}
      options={{
        actionsColumnIndex: -1,
        exportButton: true,
        filtering: filtering,
      }}
      actions={[
        {
          icon: FilterListIcon,
          tooltip: "Filtrar",
          isFreeAction: true,
          onClick: (event) => setFiltering(!filtering),
        },
        {
          icon: AssignmentIcon,
          tooltip: "Relatório",
          isFreeAction: true,
          onClick: (event) => alert("You want to add a new row"),
        },
        {
          icon: AddIcon,
          tooltip: "Adicionar",
          isFreeAction: true,
          onClick: (event) => history.push(`${match.path}/new`),
        },
        (rowData) => ({
          icon: CreateIcon,
          tooltip: "Editar",
          onClick: (event, rowData) =>
            history.push(`${match.path}/edit/${rowData.id}`),
        }),
      ]}
    />
  );
}
