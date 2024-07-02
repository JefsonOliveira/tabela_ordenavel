import SearchBar from "./components/SearchBar";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";

import { useState } from "react";

function App() {
  const [data, setData] = useState([
    { nome: "Ana", idade: 25, cargo: "Engenheira" },
    { nome: "João", idade: 30, cargo: "Desenvolvedor" },
    { nome: "Maria", idade: 22, cargo: "Designer" },
    { nome: "Carlos", idade: 40, cargo: "Gerente" },
    { nome: "Sofia", idade: 28, cargo: "Analista" },
    { nome: "Pedro", idade: 35, cargo: "Arquiteto" },
    { nome: "Laura", idade: 26, cargo: "Desenvolvedora" },
    { nome: "Lucas", idade: 32, cargo: "Tester" },
    { nome: "Juliana", idade: 24, cargo: "Consultora" },
    { nome: "Ricardo", idade: 38, cargo: "Administrador" },
    { nome: "Fernanda", idade: 29, cargo: "Coordenadora" },
    { nome: "Gustavo", idade: 27, cargo: "Especialista" },
    { nome: "Renata", idade: 31, cargo: "Produtora" },
    { nome: "Tiago", idade: 33, cargo: "Supervisor" },
    { nome: "Isabela", idade: 21, cargo: "Estagiária" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredData = sortedData.filter(
    (row) =>
      row.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onColumnClick = (key) => {
    let direction = "ascending";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  return (
    <div className="container">
      <h1>Tabela de Usuários</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <table>
        <TableHeader onColumnClick={onColumnClick} />
        <tbody>
          {filteredData.map((row, index) => (
            <TableRow key={index} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
