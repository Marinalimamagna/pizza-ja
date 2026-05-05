import React from "react";
import Cardapio from "./Cardapio";
import AdminDashboard from "./AdminDashboard";

function App() {
  // Altere para 'user' ou 'admin' para ver as telas
  const modo = 'user'; 

  return (
    <div className="App">
      {modo === 'user' ? <Cardapio /> : <AdminDashboard />}
    </div>
  );
}

export default App;