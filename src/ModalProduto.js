import React from 'react';
import './ModalProduto.css';

export default function ModalProduto({ produto, aoFechar, aoSalvar }) {
  if (!produto) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <header className="modal-header">
          <h2>{produto.id ? 'Editar Produto' : 'Novo Produto'}</h2>
          <button className="btn-close" onClick={aoFechar}>&times;</button>
        </header>

        <div className="modal-content">
          <div className="image-upload">
            <img src={produto.imagem || 'https://via.placeholder.com/150'} alt="Preview" />
            <button className="btn-change-img">Alterar imagem</button>
          </div>

          <div className="form-group">
            <label>Nome</label>
            <input type="text" defaultValue={produto.nome} placeholder="Ex: Calabresa" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoria</label>
              <select defaultValue={produto.categoria}>
                <option value="Salgadas">Salgadas</option>
                <option value="Doces">Doces</option>
                <option value="Bebidas">Bebidas</option>
              </select>
            </div>
            <div className="form-group">
              <label>Preço (R$)</label>
              <input type="number" defaultValue={produto.preco} placeholder="0,00" />
            </div>
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea defaultValue={produto.descricao} placeholder="Ingredientes da pizza..."></textarea>
          </div>

          <div className="form-group">
            <label>Status</label>
            <div className="toggle-switch">
              <input type="checkbox" id="status" defaultChecked={produto.ativo} />
              <label htmlFor="status">Ativo</label>
            </div>
          </div>
        </div>

        <footer className="modal-footer">
          <button className="btn-cancelar" onClick={aoFechar}>Cancelar</button>
          <button className="btn-salvar" onClick={aoSalvar}>Salvar Alterações</button>
        </footer>
      </div>
    </div>
  );
}