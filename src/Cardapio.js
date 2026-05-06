import React, { useState, useEffect } from 'react';

const Cardapio = () => {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');
  const [carrinho, setCarrinho] = useState([]);
  const [pagamento, setPagamento] = useState('Cartão');
  const [troco, setTroco] = useState('');
  const [taxaEntrega, setTaxaEntrega] = useState(0);
  const [dadosImpressao, setDadosImpressao] = useState(null);
  
  // Estado para a mensagem de "Adicionado"
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParaImprimir = params.get('imprimir');
    if (idParaImprimir) {
      const pedidosSalvos = JSON.parse(localStorage.getItem('meus_pedidos') || '{}');
      const pedidoEncontrado = pedidosSalvos[idParaImprimir];
      if (pedidoEncontrado) {
        setDadosImpressao(pedidoEncontrado);
        setTimeout(() => { window.print(); }, 1200);
      }
    }
  }, []);

  const categorias = ['Todas', 'Salgadas', 'Vegetariana', 'Doces', 'Bebidas', 'Promoções'];

  const bairros = [
    { nome: 'Retirar no Local', taxa: 0 },
    { nome: 'Centro', taxa: 5 },
    { nome: 'Bairro Novo', taxa: 7 },
  ];

  const produtos = [
    { id: 201, categoria: 'Promoções', nome: 'Combo Família: Gigante + Coca 2L', preco: 85.00, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
    { id: 1, categoria: 'Salgadas', nome: 'Portuguesa', preco: 48.0, img: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=400' },
    { id: 2, categoria: 'Salgadas', nome: 'Frango com Catupiry', preco: 49.0, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
    { id: 3, categoria: 'Salgadas', nome: 'Calabresa Premium', preco: 45.0, img: 'https://images.unsplash.com/photo-1627626775846-122b778965ae?w=400' },
    { id: 7, categoria: 'Vegetariana', nome: 'Marguerita Especial', preco: 42.0, img: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=400' },
    { id: 8, categoria: 'Vegetariana', nome: 'Brócolis com Queijo', preco: 44.0, img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400' },
    { id: 6, categoria: 'Doces', nome: 'Chocolate com Morango', preco: 50.0, img: 'https://images.unsplash.com/photo-1533777324545-d4446e507c81?w=400' },
    { id: 101, categoria: 'Bebidas', nome: 'Coca-Cola 2L', preco: 14.0, img: 'https://images.unsplash.com/photo-1622416011311-df7918a8b193?w=400' },
    { id: 102, categoria: 'Bebidas', nome: 'Suco Natural 1L', preco: 12.0, img: 'https://images.unsplash.com/photo-1544054458-47d8025f33f0?w=400' },
  ];

  const adicionarAoCarrinho = (p) => {
    setCarrinho([...carrinho, { idU: Date.now(), nome: p.nome, preco: p.preco }]);
    
    // Mostra a mensagem de sucesso
    setMensagemSucesso(`${p.nome} adicionado ao seu pedido!`);
    setTimeout(() => setMensagemSucesso(''), 2000);
  };

  const finalizarPedido = () => {
    if (!nome || !endereco || !contato) return alert("Preencha Nome, WhatsApp e Endereço!");
    const idPedido = Math.floor(1000 + Math.random() * 9000);
    const totalFinal = (carrinho.reduce((a, b) => a + b.preco, 0) + parseFloat(taxaEntrega)).toFixed(2);
    
    const dadosDoPedido = { 
      id: idPedido, cliente: nome, telefone: contato, endereco, 
      itens: carrinho.map(i => i.nome).join(', '), 
      total: totalFinal, pagamento, troco, data: new Date().toLocaleString() 
    };
    
    const historico = JSON.parse(localStorage.getItem('meus_pedidos') || '{}');
    historico[idPedido] = dadosDoPedido;
    localStorage.setItem('meus_pedidos', JSON.stringify(historico));

    const linkImpressao = `${window.location.origin}${window.location.pathname}?imprimir=${idPedido}`;
    let msg = `*PEDIDO #${idPedido}*%0A👤 *Cliente:* ${nome}%0A📍 *End:* ${endereco}%0A--------------------------%0A${carrinho.map(i => `• ${i.nome}`).join('%0A')}%0A--------------------------%0A💳 *Pagamento:* ${pagamento}%0A💰 *TOTAL: R$ ${totalFinal}*%0A%0A🖨️ *IMPRIMIR:* ${linkImpressao}`;
    window.open(`https://api.whatsapp.com/send?phone=5531999894058&text=${msg}`);
  };

  if (dadosImpressao) {
    return (
      <div style={{ width: '80mm', padding: '5mm', fontFamily: 'Courier, monospace', color: '#000', background: '#fff' }}>
        <h2 style={{ textAlign: 'center', margin: '0' }}>PIZZA JÁ</h2>
        <p style={{ textAlign: 'center' }}>PEDIDO #{dadosImpressao.id}</p>
        <hr />
        <p><b>CLIENTE:</b> {dadosImpressao.cliente}</p>
        <p><b>END:</b> {dadosImpressao.endereco}</p>
        <hr /><p><b>ITENS:</b> {dadosImpressao.itens}</p><hr />
        <p><b>FORMA PGTO:</b> {dadosImpressao.pagamento}</p>
        <h3 style={{ fontSize: '18px' }}>TOTAL: R$ {dadosImpressao.total}</h3>
        <hr />
        <p style={{ textAlign: 'center', fontSize: '10px' }}>Impresso via Painel Web</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '10px', fontFamily: 'sans-serif' }}>
      
      {/* MENSAGEM DE SUCESSO (ADICIONADO) */}
      {mensagemSucesso && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          backgroundColor: '#2ecc71', color: '#fff', padding: '10px 20px',
          borderRadius: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', zIndex: 1000,
          fontWeight: 'bold', fontSize: '14px'
        }}>
          ✅ {mensagemSucesso}
        </div>
      )}

      <header style={{ textAlign: 'center', position: 'sticky', top: 0, background: '#fff', zIndex: 10, paddingBottom: '10px' }}>
        <h1 style={{ color: '#d32f2f', margin: '10px 0' }}>🍕 Pizza Já</h1>
        <input 
          type="text" 
          placeholder="Buscar sabor..." 
          onChange={(e) => setBusca(e.target.value)} 
          style={{ width: '92%', padding: '12px', borderRadius: '25px', border: '1px solid #ddd', fontSize: '16px' }} 
        />
        
        <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', padding: '12px 5px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {categorias.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCategoriaAtiva(cat)}
              style={{ 
                padding: '8px 14px', borderRadius: '20px', border: 'none', 
                background: categoriaAtiva === cat ? '#d32f2f' : '#f2f2f2', 
                color: categoriaAtiva === cat ? '#fff' : '#555',
                whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '12px', flexShrink: 0,
                cursor: 'pointer' // <--- AQUI A MÃOZINHA
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
        {produtos
          .filter(p => (categoriaAtiva === 'Todas' || p.categoria === categoriaAtiva))
          .filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()))
          .map(p => (
          <div key={p.id} style={{ border: '1px solid #eee', padding: '10px', borderRadius: '15px', textAlign: 'center', background: '#fff' }}>
            <img src={p.img} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '10px' }} alt={p.nome} />
            <h4 style={{ fontSize: '14px', margin: '8px 0', height: '34px' }}>{p.nome}</h4>
            <p style={{ fontWeight: 'bold', color: '#d32f2f', margin: '5px 0' }}>R$ {p.preco.toFixed(2)}</p>
            <button 
              onClick={() => adicionarAoCarrinho(p)} 
              style={{ 
                width: '100%', padding: '10px', background: '#d32f2f', color: '#fff', 
                border: 'none', borderRadius: '8px', fontWeight: 'bold',
                cursor: 'pointer' // <--- AQUI A MÃOZINHA
              }}>
              ADICIONAR
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', background: '#fff', padding: '15px', borderRadius: '20px', border: '2px solid #d32f2f', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '20px' }}>🛒 Seu Carrinho</h2>
        {carrinho.length === 0 ? <p style={{textAlign: 'center', color: '#999'}}>Vazio</p> : 
          carrinho.map(item => (
            <div key={item.idU} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px' }}>
              <span>{item.nome}</span>
              <b>R$ {item.preco.toFixed(2)}</b>
            </div>
          ))
        }
        <hr />
        <div style={{ display: 'grid', gap: '10px', marginTop: '15px' }}>
          <input placeholder="Seu Nome" onChange={e => setNome(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
          <input placeholder="WhatsApp" onChange={e => setContato(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
          <textarea placeholder="Endereço Completo" onChange={e => setEndereco(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', height: '50px' }} />
          
          <select onChange={(e) => setTaxaEntrega(e.target.value)} style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer' }}>
            {bairros.map(b => <option key={b.nome} value={b.taxa}>{b.nome} (R$ {b.taxa})</option>)}
          </select>

          <select onChange={(e) => setPagamento(e.target.value)} style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer' }}>
            <option value="Cartão">Cartão (Maquininha)</option>
            <option value="Pix">Pix</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>
        
        <h3 style={{ textAlign: 'right', color: '#d32f2f', marginTop: '15px' }}>Total: R$ {(carrinho.reduce((a, b) => a + b.preco, 0) + parseFloat(taxaEntrega)).toFixed(2)}</h3>
        
        <button 
          onClick={finalizarPedido} 
          style={{ 
            width: '100%', padding: '18px', background: '#25D366', color: '#fff', 
            fontSize: '18px', fontWeight: 'bold', border: 'none', borderRadius: '12px',
            cursor: 'pointer' // <--- AQUI A MÃOZINHA
          }}>
          ✅ ENVIAR PEDIDO
        </button>
      </div>
    </div>
  );
};

export default Cardapio;