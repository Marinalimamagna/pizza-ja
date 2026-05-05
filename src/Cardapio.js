import React, { useState } from 'react';

const Cardapio = () => {
  // Estados para o formulário
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');

  // Lista de Produtos
  const pizzas = [
    { id: 1, nome: 'Portuguesa', preco: 48.00, img: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?q=80&w=300' },
    { id: 2, nome: 'Frango com Catupiry', preco: 49.00, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300' },
    { id: 3, nome: 'Calabresa', preco: 45.00, img: 'https://images.unsplash.com/photo-1627626775846-122b778965ae?q=80&w=300' },
    { id: 4, nome: 'Coca-Cola 2L', preco: 12.00, img: 'https://images.unsplash.com/photo-1622416011311-df7918a8b193?q=80&w=300' }
  ];

  // Estado do Carrinho
  const [carrinho, setCarrinho] = useState([]);

  const adicionarItem = (p) => {
    const existe = carrinho.find(item => item.id === p.id);
    if (existe) {
      setCarrinho(carrinho.map(item => item.id === p.id ? { ...item, qtd: item.qtd + 1 } : item));
    } else {
      setCarrinho([...carrinho, { ...p, qtd: 1 }]);
    }
  };

  const total = carrinho.reduce((acc, item) => acc + (item.preco * item.qtd), 0);

  const enviarWhatsApp = () => {
    if (!nome || !endereco) return alert("Preencha Nome e Endereço!");
    if (carrinho.length === 0) return alert("Seu carrinho está vazio!");

    let mensagem = `*PEDIDO PIZZA JÁ*\n\n`;
    mensagem += `👤 *Cliente:* ${nome}\n`;
    mensagem += `📞 *Contato:* ${contato}\n`;
    mensagem += `📍 *Endereço:* ${endereco}\n`;
    mensagem += `----------------------------\n\n`;

    carrinho.forEach(item => {
      mensagem += `*${item.qtd}x* ${item.nome} (R$ ${item.preco.toFixed(2)})\n`;
    });

    mensagem += `\n*TOTAL: R$ ${total.toFixed(2)}*`;

    const fone = "5531999894058"; 
    window.open(`https://api.whatsapp.com/send?phone=${fone}&text=${encodeURIComponent(mensagem)}`);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>🍕 Cardápio Pizza Já</h1>

      {/* Grid de Pizzas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {pizzas.map(p => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
            <img src={p.img} alt={p.nome} style={{ width: '100%', borderRadius: '10px' }} />
            <h3>{p.nome}</h3>
            <p>R$ {p.preco.toFixed(2)}</p>
            <button onClick={() => adicionarItem(p)} style={{ cursor: 'pointer', padding: '5px 10px' }}>Adicionar</button>
          </div>
        ))}
      </div>

      {/* Formulário */}
      <div style={{ marginTop: '30px', padding: '20px', background: '#f4f4f4', borderRadius: '10px' }}>
        <h3>Dados de Entrega</h3>
        <input placeholder="Seu Nome" value={nome} onChange={e => setNome(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <input placeholder="WhatsApp" value={contato} onChange={e => setContato(e.target.value)} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
        <textarea placeholder="Endereço Completo" value={endereco} onChange={e => setEndereco(e.target.value)} style={{ display: 'block', width: '100%', padding: '8px', height: '60px' }} />
      </div>

      {/* Total e Botão Final */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>Total: R$ {total.toFixed(2)}</h2>
        <button onClick={enviarWhatsApp} style={{ padding: '15px 30px', background: '#25D366', color: 'white', border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
};

export default Cardapio;