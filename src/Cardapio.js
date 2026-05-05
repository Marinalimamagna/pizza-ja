import React, { useState } from 'react';

const Cardapio = () => {
    // 1. Estados para o formulário de entrega
    const [nome, setNome] = useState('');
    const [contato, setContato] = useState('');
    const [endereco, setEndereco] = useState('');

    // 2. O Cardápio de Pizzas (COM IMAGENS)
    // --- IMPORTANTE: Substitua as URLs abaixo pelas suas imagens reais ---
    const listaPizzas = [
        { 
            id: 1, 
            nome: 'Portuguesa', 
            preco: 48.00, 
            descricao: 'Molho, presunto, ovos, cebola, azeitona e mussarela.',
            imagem: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?q=80&w=300&auto=format&fit=crop' 
        },
        { 
            id: 2, 
            nome: 'Frango com Catupiry', 
            preco: 49.00, 
            descricao: 'Frango desfiado com o legítimo Catupiry cremosa.',
            imagem: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop'
        },
        { 
            id: 3, 
            nome: 'Calabresa Premium', 
            preco: 45.00, 
            descricao: 'Calabresa artesanal fatiada e cebola roxa.',
            imagem: 'https://images.unsplash.com/photo-1627626775846-122b778965ae?q=80&w=300&auto=format&fit=crop'
        },
        { 
            id: 4, 
            nome: 'Coca-Cola 2L', 
            preco: 12.00, 
            descricao: 'Bebida gelada.',
            imagem: 'https://images.unsplash.com/photo-1622416011311-df7918a8b193?q=80&w=300&auto=format&fit=crop'
        }
    ];

    // 3. Estado do Carrinho (Inicia com alguns itens para teste)
    const [cart, setCart] = useState([
        { id: 1, nome: 'Portuguesa', quantidade: 2, preco: 48.00 },
        { id: 4, nome: 'Coca-Cola 2L', quantidade: 1, preco: 12.00 }
    ]);

    const totalPedido = cart.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);

    // --- FUNÇÃO PARA ADICIONAR AO CARRINHO ---
    const adicionarAoCarrinho = (pizza) => {
        setCart(prevCart => {
            const itemExistente = prevCart.find(item => item.id === pizza.id);
            if (itemExistente) {
                return prevCart.map(item => 
                    item.id === pizza.id ? { ...item, quantidade: item.quantidade + 1 } : item
                );
            } else {
                return [...prevCart, { ...pizza, quantidade: 1 }];
            }
        });
    };

    // --- FUNÇÃO DE ENVIO PARA WHATSAPP ---
    const enviarWhatsApp = () => {
        if (!nome || !contato || !endereco) {
            alert("Por favor, preencha todos os campos de entrega!");
            return;
        }
        if (cart.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        let mensagem = `*PEDIDO PIZZA JÁ*\n\n`;
        mensagem += `👤 *Cliente:* ${nome}\n`;
        mensagem += `📞 *Contato:* ${contato}\n`;
        mensagem += `📍 *Endereço:* ${endereco}\n`;
        mensagem += `----------------------------\n\n`;

        cart.forEach(item => {
            mensagem += `*${item.quantidade}x* ${item.nome} (R$ ${item.preco.toFixed(2)})\n`;
        });

        mensagem += `\n*TOTAL: R$ ${totalPedido.toFixed(2)}*`;

        const numeroPizzaria = "5531999894058"; // Seu número
        window.open(`https://api.whatsapp.com/send?phone=${numeroPizzaria}&text=${encodeURIComponent(mensagem)}`, '_blank');
    };

    // Estilos Inline para organizar visualmente (você pode mover para o CSS depois)
    const styles = {
        container: { maxWidth: '1000px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' },
        header: { textAlign: 'center', color: '#d32f2f', marginBottom: '30px' },
        grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' },
        card: { border: '1px solid #eee', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', backgroundColor: '#fff', transition: 'transform 0.2s' },
        cardImage: { width: '100%', height: '180px', objectFit: 'cover' },
        cardContent: { padding: '15px' },
        cardTitle: { margin: '0 0 10px 0', fontSize: '18px' },
        cardDesc: { color: '#666', fontSize: '14px', height: '40px', overflow: 'hidden', marginBottom: '10px' },
        cardPrice: { fontSize: '18px', fontWeight: 'bold', color: '#333' },
        btnAdicionar: { padding: '8px 15px', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
        formSection: { backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #eee' },
        input: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box' },
        textarea: { width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', boxSizing: 'border-box', height: '80px', resize: 'none' },
        resumo: { borderTop: '2px solid #333', paddingTop: '20px', textAlign: 'center' },
        btnFinalizar: { width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '8px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>🍕 Cardápio Pizza Já</h1>

            {/* --- SEÇÃO DO CARDÁPIO (GRID COM IMAGENS) --- */}
            <div style={styles.grid}>
                {listaPizzas.map(pizza => (
                    <div key={pizza.id} style={styles.card} className="pizza-card">
                        <img src={pizza.imagem} alt={pizza.nome} style={styles.cardImage} />
                        <div style={styles.cardContent}>
                            <h3 style={styles.cardTitle}>{pizza.nome}</h3>
                            <p style={styles.cardDesc}>{pizza.descricao}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={styles.cardPrice}>R$ {pizza.preco.toFixed(2)}</span>
                                <button style={styles.btnAdicionar} onClick={() => adicionarAoCarrinho(pizza)}>
                                    Adicionar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- SEÇÃO DO FORMULÁRIO DE ENTREGA --- */}
            <div style={styles.formSection}>
                <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <span style={{ fontSize: '24px' }}>📍</span> Dados para Entrega (Para o WhatsApp)
                </h3>
                <input 
                    type="text" placeholder="Seu Nome Completo" value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={styles.input}
                />
                <input 
                    type="text" placeholder="Seu WhatsApp com DDD (Ex: 31 99999-9999)" value={contato}
                    onChange={(e) => setContato(e.target.value)}
                    style={styles.input}
                />
                <textarea 
                    placeholder="Endereço Completo de Entrega (Rua, Número, Bairro, Ponto de Referência)" 
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    style={styles.textarea}
                />
            </div>

            {/* --- SEÇÃO DO RESUMO E FINALIZAÇÃO --- */}
            <div style={styles.resumo}>
                <h3>Resumo do seu Pedido</h3>
                {cart.length === 0 ? (
                    <p>Seu carrinho está vazio.</p>
                ) : (
                    cart.map((item, index) => (
                        <p key={index} style={{ fontSize: '16px' }}>
                            <b>{item.quantidade}x</b> {item.nome} - R$ {item.preco.toFixed(2)} 
                            <span style={{ color: '#666', marginLeft: '10px' }}>(Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)})</span>
                        </p>
                    ))
                )}
                
                <h2 style={{ color: '#d32f2f', fontSize: '32px', margin: '20px 0' }}>
                    Total: R$ {totalPedido.toFixed(2)}
                </h2>

                <button onClick={enviarWhatsApp} style={styles.btnFinalizar}>
                    Finalizar Pedido no WhatsApp
                </button>
            </div>
        </div>
    );
};

export default Cardapio;