import React, { useState } from 'react';

const Cardapio = () => {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');
  const [carrinho, setCarrinho] = useState([]);
  
  // Novos estados para Pagamento e Entrega
  const [pagamento, setPagamento] = useState('Cartão');
  const [troco, setTroco] = useState('');
  const [bairro, setBairro] = useState(0);

  const bairros = [
    { nome: 'Retirar no Local', taxa: 0 },
    { nome: 'Centro', taxa: 5 },
    { nome: 'Bairro Novo', taxa: 7 },
    { nome: 'Planalto', taxa: 10 },
  ];

  const produtos = [
    { id: 201, categoria: 'Promoções', nome: 'Combo Família: Gigante + Coca 2L', preco: 85.00, desc: 'Qualquer sabor Gigante + Refri 2L.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
    { id: 202, categoria: 'Promoções', nome: 'Combo Casal: 1 Média + 1 Broto Doce', preco: 70.00, desc: 'Uma salgada média e uma broto doce.', img: 'https://images.unsplash.com/photo-1594000199163-30ad3f7a2662?w=400' },
    { id: 1, categoria: 'Salgadas', nome: 'Portuguesa', preco: 48.0, desc: 'Presunto, ovos, cebola e mussarela.', img: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=400' },
    { id: 2, categoria: 'Salgadas', nome: 'Frango com Catupiry', preco: 49.0, desc: 'Frango desfiado com Catupiry.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
    { id: 3, categoria: 'Salgadas', nome: 'Calabresa Premium', preco: 45.0, desc: 'Calabresa e cebola roxa.', img: 'https://images.unsplash.com/photo-1627626775846-122b778965ae?w=400' },
    { id: 5, categoria: 'Vegetarianas', nome: 'Margherita', preco: 44.0, desc: 'Tomate e manjericão fresco.', img: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=400' },
    { id: 7, categoria: 'Doces', nome: 'Chocolate com Morango', preco: 42.0, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },
    { id: 101, categoria: 'Bebidas', nome: 'Coca-Cola 2L', preco: 14.0, img: 'https://images.unsplash.com/photo-1622416011311-df7918a8b193?w=400' },
    { id: 102, categoria: 'Bebidas', nome: 'Guaraná 2L', preco: 12.0, img: 'https://images.unsplash.com/photo-1527960486398-266133fa2463?w=400' },
  ];

  const adicionarAoCarrinho = (p) => {
    const select = document.getElementById(`tam-${p.id}`);
    const tamanho = select ? select.value : 'Média';
    let precoFinal = p.preco;
    if (p.categoria !== 'Bebidas' && p.categoria !== 'Promoções') {
      if (tamanho === 'Broto') precoFinal -= 10;
      if (tamanho === 'Gigante') precoFinal += 15;
    }
    setCarrinho([...carrinho, { idU: Date.now(), nome: p.categoria === 'Bebidas' || p.categoria === 'Promoções' ? p.nome : `${p.nome} (${tamanho})`, preco: precoFinal }]);
  };

  const subtotal = carrinho.reduce((a, b) => a + b.preco, 0);
  const totalGeral = subtotal + parseFloat(bairro);

  const enviarWhatsApp = () => {
    if (!nome || !endereco || !contato) return alert("Preencha todos os campos!");
    
    let msg = `*NOVO PEDIDO - PIZZA JÁ*\n\n`;
    msg += `👤 *Cliente:* ${nome}\n📞 *Whats:* ${contato}\n📍 *Endereço:* ${endereco}\n`;
    msg += `🚚 *Entrega:* ${bairros.find(b => b.taxa === parseFloat(bairro)).nome}\n`;
    msg += `------------------------------\n`;
    carrinho.forEach(i => msg += `• ${i.nome} - R$ ${i.preco.toFixed(2)}\n`);
    msg += `------------------------------\n`;
    msg += `💳 *Pagamento:* ${pagamento}\n`;
    if (pagamento === 'Dinheiro' && troco) msg += `💵 *Troco para:* R$ ${troco}\n`;
    msg += `💰 *Subtotal:* R$ ${subtotal.toFixed(2)}\n`;
    msg += `🚲 *Taxa:* R$ ${parseFloat(bairro).toFixed(2)}\n`;
    msg += `*TOTAL: R$ ${totalGeral.toFixed(2)}*`;

    window.open(`https://api.whatsapp.com/send?phone=5531999894058&text=${encodeURIComponent(msg)}`);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#d32f2f' }}>🍕 Pizza Já</h1>
        <input type="text" placeholder="🔍 Pesquisar..." onChange={(e) => setBusca(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '20px', border: '1px solid #ddd', marginBottom: '20px' }} />
      </header>

      {/* CATEGORIAS */}
      <nav style={{ display: 'flex', gap: '8px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '10px' }}>
        {['Todas', 'Promoções', 'Salgadas', 'Vegetarianas', 'Doces', 'Bebidas'].map(cat => (
          <button key={cat} onClick={() => setCategoriaAtiva(cat)} style={{ padding: '8px 15px', borderRadius: '15px', border: 'none', backgroundColor: categoriaAtiva === cat ? '#d32f2f' : '#eee', color: categoriaAtiva === cat ? '#fff' : '#333', cursor: 'pointer', whiteSpace: 'nowrap' }}>{cat}</button>
        ))}
      </nav>

      {/* PRODUTOS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()) && (categoriaAtiva === 'Todas' || p.categoria === categoriaAtiva)).map(p => (
          <div key={p.id} style={{ border: '1px solid #eee', borderRadius: '15px', padding: '15px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <img src={p.img} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px' }} alt={p.nome} />
            <h4>{p.nome}</h4>
            {p.categoria !== 'Bebidas' && p.categoria !== 'Promoções' && (
              <select id={`tam-${p.id}`} style={{ width: '100%', padding: '5px', marginBottom: '10px' }}>
                <option value="Broto">Broto (-R$10)</option>
                <option value="Média" selected>Média</option>
                <option value="Gigante">(+R$15)</option>
              </select>
            )}
            <p style={{ fontWeight: 'bold', color: '#d32f2f' }}>R$ {p.preco.toFixed(2)}</p>
            <button onClick={() => adicionarAoCarrinho(p)} style={{ width: '100%', padding: '10px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Adicionar</button>
          </div>
        ))}
      </div>

      {/* CARRINHO E PAGAMENTO */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '15px', border: '1px solid #d32f2f' }}>
        <h2 style={{ textAlign: 'center' }}>🛒 Seu Pedido</h2>
        {carrinho.map(i => (
          <div key={i.idU} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>{i.nome}</span>
            <span>R$ {i.preco.toFixed(2)} <button onClick={() => setCarrinho(carrinho.filter(x => x.idU !== i.idU))} style={{ border: 'none', color: 'red', cursor: 'pointer' }}>✖</button></span>
          </div>
        ))}

        <div style={{ marginTop: '20px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
          <label><b>Local de Entrega:</b></label>
          <select onChange={(e) => setBairro(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px' }}>
            {bairros.map(b => <option key={b.nome} value={b.taxa}>{b.nome} (Taxa: R${b.taxa.toFixed(2)})</option>)}
          </select>

          <label><b>Forma de Pagamento:</b></label>
          <select onChange={(e) => setPagamento(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px' }}>
            <option value="Cartão">Cartão (Levar maquininha)</option>
            <option value="Pix">Pix (Pagar na entrega)</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>

          {pagamento === 'Dinheiro' && (
            <input type="text" placeholder="Troco para quanto?" onChange={(e) => setTroco(e.target.value)} style={{ width: '95%', padding: '10px', marginBottom: '15px' }} />
          )}

          <input placeholder="Seu Nome" onChange={e => setNome(e.target.value)} style={{ width: '95%', padding: '10px', marginBottom: '10px' }} />
          <input placeholder="WhatsApp" onChange={e => setContato(e.target.value)} style={{ width: '95%', padding: '10px', marginBottom: '10px' }} />
          <textarea placeholder="Endereço Completo" onChange={e => setEndereco(e.target.value)} style={{ width: '95%', padding: '10px', height: '60px', marginBottom: '10px' }} />

          <h3 style={{ textAlign: 'right' }}>Total: R$ {totalGeral.toFixed(2)}</h3>
          <button onClick={enviarWhatsApp} style={{ width: '100%', padding: '15px', background: '#25D366', color: '#fff', fontSize: '18px', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>🚀 Enviar para WhatsApp</button>
        </div>
      </div>
    </div>
  );
};

export default Cardapio;