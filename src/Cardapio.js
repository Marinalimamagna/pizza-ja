import React, { useState } from 'react';

const Cardapio = () => {
  // --- ESTADOS (Inputs e Carrinho) ---
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState(''); // Estado para o WhatsApp do cliente
  const [endereco, setEndereco] = useState('');
  const [carrinho, setCarrinho] = useState([]);

  // --- BANCO DE DADOS COMPLETO ---
  const produtos = [
    // 🔥 PROMOÇÕES (4 Opções)
    { id: 201, categoria: 'Promoções', nome: 'Combo Família: Gigante + Coca 2L', preco: 85.00, desc: 'Qualquer sabor Gigante + Refrigerante 2L.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
    { id: 202, categoria: 'Promoções', nome: 'Combo Casal: 1 Média + 1 Broto Doce', preco: 70.00, desc: 'Uma pizza salgada média e uma broto de chocolate.', img: 'https://images.unsplash.com/photo-1594000199163-30ad3f7a2662?w=400' },
    { id: 203, categoria: 'Promoções', nome: 'Combo Individual: Broto + Lata', preco: 42.00, desc: 'Pizza Broto + Coca Lata 350ml.', img: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=400' },
    { id: 204, categoria: 'Promoções', nome: 'Terça em Dobro: 2 Médias', preco: 75.00, desc: 'Duas pizzas médias por um preço especial.', img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400' },

    // 🍕 PIZZAS SALGADAS (8 Modelos no total entre categorias)
    { id: 1, categoria: 'Salgadas', nome: 'Portuguesa', preco: 48.0, desc: 'Presunto, ovos, cebola, azeitona e mussarela.', img: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=400' },
    { id: 2, categoria: 'Salgadas', nome: 'Frango com Catupiry', preco: 49.0, desc: 'Frango desfiado com Catupiry original.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
    { id: 3, categoria: 'Salgadas', nome: 'Calabresa Premium', preco: 45.0, desc: 'Calabresa artesanal e cebola roxa.', img: 'https://images.unsplash.com/photo-1627626775846-122b778965ae?w=400' },
    { id: 4, categoria: 'Salgadas', nome: 'Bacon com Milho', preco: 47.0, desc: 'Mussarela, bacon crocante e milho verde.', img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400' },
    
    // 🥗 VEGETARIANAS
    { id: 5, categoria: 'Vegetarianas', nome: 'Margherita', preco: 44.0, desc: 'Mussarela, fatias de tomate e manjericão.', img: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=400' },
    { id: 6, categoria: 'Vegetarianas', nome: 'Quatro Queijos', preco: 52.0, desc: 'Mussarela, provolone, parmesão e gorgonzola.', img: 'https://images.unsplash.com/photo-1573452330272-911802998634?w=400' },
    
    // 🍫 DOCES
    { id: 7, categoria: 'Doces', nome: 'Chocolate com Morango', preco: 42.0, desc: 'Chocolate ao leite com morangos frescos.', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400' },
    { id: 8, categoria: 'Doces', nome: 'Banana com Canela', preco: 40.0, desc: 'Leite condensado, banana e canela.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400' },
    
    // 🥤 BEBIDAS (Opções Ampliadas)
    { id: 101, categoria: 'Bebidas', nome: 'Coca-Cola 2L', preco: 14.0, img: 'https://images.unsplash.com/photo-1622416011311-df7918a8b193?w=400' },
    { id: 102, categoria: 'Bebidas', nome: 'Guaraná Antártica 2L', preco: 12.0, img: 'https://images.unsplash.com/photo-1527960486398-266133fa2463?w=400' },
    { id: 103, categoria: 'Bebidas', nome: 'Suco de Laranja 1L', preco: 15.0, img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400' },
    { id: 104, categoria: 'Bebidas', nome: 'Fanta Laranja 2L', preco: 12.0, img: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400' },
    { id: 105, categoria: 'Bebidas', nome: 'Heineken Long Neck', preco: 10.0, img: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=400' },
    { id: 106, categoria: 'Bebidas', nome: 'Água Mineral 500ml', preco: 4.0, img: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?w=400' }
  ];

  // --- LÓGICA DE FUNCIONAMENTO ---
  const adicionarAoCarrinho = (p) => {
    const select = document.getElementById(`tam-${p.id}`);
    const tamanho = select ? select.value : 'Média';

    let precoFinal = p.preco;
    if (p.categoria !== 'Bebidas' && p.categoria !== 'Promoções') {
      if (tamanho === 'Broto') precoFinal -= 10;
      if (tamanho === 'Gigante') precoFinal += 15;
    }

    const novoItem = {
      idU: Date.now() + Math.random(),
      nome: p.categoria === 'Bebidas' || p.categoria === 'Promoções' ? p.nome : `${p.nome} (${tamanho})`,
      preco: precoFinal
    };
    setCarrinho([...carrinho, novoItem]);
  };

  const enviarWhatsApp = () => {
    if (!nome || !endereco || !contato) return alert("Por favor, preencha Nome, WhatsApp e Endereço!");
    if (carrinho.length === 0) return alert("Adicione itens ao carrinho!");

    let msg = `*NOVO PEDIDO - PIZZA JÁ*\n\n`;
    msg += `👤 *Cliente:* ${nome}\n`;
    msg += `📞 *WhatsApp:* ${contato}\n`; // CAMPO CORRIGIDO
    msg += `📍 *Endereço:* ${endereco}\n`;
    msg += `------------------------------\n`;
    carrinho.forEach(i => msg += `• ${i.nome} - R$ ${i.preco.toFixed(2)}\n`);
    msg += `------------------------------\n`;
    msg += `*TOTAL: R$ ${carrinho.reduce((a, b) => a + b.preco, 0).toFixed(2)}*`;

    window.open(`https://api.whatsapp.com/send?phone=5531999894058&text=${encodeURIComponent(msg)}`);
  };

  const filtrados = produtos.filter(p => 
    p.nome.toLowerCase().includes(busca.toLowerCase()) && 
    (categoriaAtiva === 'Todas' || p.categoria === categoriaAtiva)
  );

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#d32f2f', fontSize: '3rem', marginBottom: '10px' }}>🍕 Pizza Já</h1>
        <input 
          type="text" placeholder="🔍 Pesquisar sabor ou bebida..." 
          value={busca} onChange={(e) => setBusca(e.target.value)}
          style={{ width: '100%', maxWidth: '500px', padding: '15px', borderRadius: '30px', border: '1px solid #ccc', outline: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
        />
      </header>

      {/* CATEGORIAS */}
      <nav style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
        {['Todas', 'Promoções', 'Salgadas', 'Vegetarianas', 'Doces', 'Bebidas'].map(cat => (
          <button 
            key={cat} onClick={() => setCategoriaAtiva(cat)}
            style={{ 
              padding: '10px 20px', borderRadius: '25px', border: 'none', cursor: 'pointer',
              backgroundColor: categoriaAtiva === cat ? '#d32f2f' : '#f0f0f0',
              color: categoriaAtiva === cat ? '#fff' : '#555', fontWeight: 'bold', transition: '0.3s'
            }}
          >
            {cat === 'Promoções' ? `🔥 ${cat}` : cat}
          </button>
        ))}
      </nav>

      {/* GRID DE PRODUTOS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
        {filtrados.map(p => (
          <div key={p.id} style={{ backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '20px', padding: '15px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <img 
              src={p.img} alt={p.nome} 
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '15px' }} 
              onError={(e) => { e.target.src = 'https://via.placeholder.com/300x180?text=Pizza+Ja'; }}
            />
            <h3 style={{ margin: '15px 0 5px' }}>{p.nome}</h3>
            <p style={{ fontSize: '13px', color: '#777', minHeight: '35px' }}>{p.desc || 'Qualidade garantida!'}</p>
            
            {p.categoria !== 'Bebidas' && p.categoria !== 'Promoções' && (
              <select id={`tam-${p.id}`} style={{ padding: '8px', borderRadius: '8px', marginBottom: '15px', width: '100%', border: '1px solid #ddd' }}>
                <option value="Broto">Broto (-R$ 10,00)</option>
                <option value="Média" selected>Média (Preço Base)</option>
                <option value="Gigante">Gigante (+R$ 15,00)</option>
              </select>
            )}

            <p style={{ fontWeight: 'bold', color: '#d32f2f', fontSize: '22px', marginBottom: '15px' }}>R$ {p.preco.toFixed(2)}</p>
            <button 
              onClick={() => adicionarAoCarrinho(p)}
              style={{ background: '#d32f2f', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', width: '100%', fontWeight: 'bold', fontSize: '16px' }}
            >
              Adicionar ao Pedido
            </button>
          </div>
        ))}
      </div>

      {/* FINALIZAÇÃO (Carrinho e Cadastro) */}
      <div style={{ marginTop: '60px', background: '#fff', padding: '30px', borderRadius: '20px', border: '2px solid #d32f2f', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#d32f2f', textAlign: 'center' }}>🛒 Seu Pedido</h2>
        <div style={{ margin: '20px 0' }}>
          {carrinho.length === 0 ? <p style={{ textAlign: 'center', color: '#999' }}>Seu carrinho está vazio.</p> : (
            carrinho.map(item => (
              <div key={item.idU} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <span>{item.nome}</span>
                <span>
                  <b>R$ {item.preco.toFixed(2)}</b>
                  <button onClick={() => setCarrinho(carrinho.filter(x => x.idU !== item.idU))} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', marginLeft: '10px' }}>✖</button>
                </span>
              </div>
            ))
          )}
        </div>

        <h3 style={{ textAlign: 'right', fontSize: '24px' }}>Total: R$ {carrinho.reduce((a, b) => a + b.preco, 0).toFixed(2)}</h3>

        <div style={{ display: 'grid', gap: '15px', marginTop: '30px' }}>
          <h3 style={{ borderBottom: '1px solid #ddd' }}>📍 Dados para Entrega</h3>
          <input placeholder="Seu Nome Completo" value={nome} onChange={e => setNome(e.target.value)} style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ccc' }} />
          <input placeholder="Seu WhatsApp (Ex: 31 99999-9999)" value={contato} onChange={e => setContato(e.target.value)} style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ccc' }} />
          <textarea placeholder="Endereço de Entrega (Rua, Nº, Bairro e Ponto de Referência)" value={endereco} onChange={e => setEndereco(e.target.value)} style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ccc', height: '100px' }} />
          
          <button onClick={enviarWhatsApp} style={{ background: '#25D366', color: '#fff', padding: '20px', border: 'none', borderRadius: '12px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>
            🚀 Enviar Pedido para o WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cardapio;