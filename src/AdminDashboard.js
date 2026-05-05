import React, { useState } from "react";
import pizzasIniciais from "./pizzas";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [pizzas, setPizzas] = useState(() => {
    const salvas = localStorage.getItem("@pizzaja:pizzas");
    try {
      const dados = salvas ? JSON.parse(salvas) : pizzasIniciais;
      return Array.isArray(dados) ? dados : pizzasIniciais;
    } catch (e) {
      return pizzasIniciais;
    }
  });

  const atualizarStorage = (novaLista) => {
    setPizzas(novaLista);
    localStorage.setItem("@pizzaja:pizzas", JSON.stringify(novaLista));
  };

  const alternarAtivo = (id) => {
    const novaLista = pizzas.map(p => p.id === id ? { ...p, ativo: !p.ativo } : p);
    atualizarStorage(novaLista);
  };

  const alterarPreco = (id, valor) => {
    const novaLista = pizzas.map(p => p.id === id ? { ...p, preco: parseFloat(valor) || 0 } : p);
    atualizarStorage(novaLista);
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Painel <span>PizzaJÁ</span></h1>
        <div className="stats-row">
          <div className="stat-box">Ativos: {pizzas.filter(p => p.ativo).length}</div>
          <div className="stat-box">Total: {pizzas.length}</div>
        </div>
      </header>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço (R$)</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map(p => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>
                <input 
                  type="number" 
                  step="0.01" 
                  defaultValue={p.preco} 
                  onBlur={(e) => alterarPreco(p.id, e.target.value)}
                />
              </td>
              <td>
                <span className={`badge ${p.ativo ? "on" : "off"}`}>
                  {p.ativo ? "Disponível" : "Pausado"}
                </span>
              </td>
              <td>
                <button onClick={() => alternarAtivo(p.id)}>
                  {p.ativo ? "Desativar" : "Ativar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}