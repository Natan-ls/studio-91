// Variável global para saber qual álbum está aberto no momento
let albumAtualId = null;

document.addEventListener('DOMContentLoaded', () => {
    carregarClientes();

    // --- CONFIGURAÇÃO DE EVENTOS (Listeners) ---
    
    // 1. Formulário de Criar Cliente
    const clienteForm = document.getElementById('cliente-form');
    if (clienteForm) clienteForm.onsubmit = criarCliente;

    // 2. Formulário de Criar Álbum
    const albumForm = document.getElementById('album-form');
    if (albumForm) albumForm.onsubmit = criarAlbum;

    // 3. Input de Upload Automático (Botão "+" na grid de fotos)
    const addFotoInput = document.getElementById('add-foto-input');
    if (addFotoInput) addFotoInput.addEventListener('change', uploadNovasFotos);
});

// --- UI: CONTROLE DE ABAS ---
function showTab(tabId) {
    // Esconde todas as abas e remove classe active dos botões
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    // Mostra a aba clicada e ativa o botão
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}


// 1. Carregar Clientes (Preenche os Selects de todas as abas)
async function carregarClientes() {
    try {
        const res = await fetch('api/admin/get_users.php');
        const clientes = await res.json();
        
        const selects = [
            document.getElementById('gerenciar-cliente-select'),
            document.getElementById('album-cliente-select')      
        ];
        
        selects.forEach(sel => {
            if (sel) {
                sel.innerHTML = '<option value="">Selecione...</option>';
                clientes.forEach(c => {
                    sel.innerHTML += `<option value="${c.id}">${c.nome} (${c.email})</option>`;
                });
            }
        });
    } catch (error) {
        console.error("Erro ao carregar clientes", error);
    }
}


// --- FLUXO 1: LISTAR ÁLBUNS DO CLIENTE (VISUAL) ---

async function carregarAlbunsCards(userId) {
    const grid = document.getElementById('albuns-grid');
    
    if (!userId) {
        grid.innerHTML = '<p style="color: #999;">Selecione um cliente para ver os álbuns.</p>';
        return;
    }

    grid.innerHTML = '<p>Carregando álbuns...</p>';

    try {
        const res = await fetch(`api/admin/get_albums.php?user_id=${userId}`);
        const albuns = await res.json();
        
        grid.innerHTML = '';
        
        if (albuns.length === 0) {
            grid.innerHTML = '<p>Este cliente não possui álbuns.</p>';
            return;
        }

        albuns.forEach(album => {
            const card = document.createElement('div');
            card.className = 'admin-card';
            card.onclick = () => abrirGerenciadorFotos(album.id, album.titulo);

            const capa = album.capa_url || 'https://via.placeholder.com/300x200?text=Sem+Capa';

            card.innerHTML = `
                <img src="${capa}" alt="${album.titulo}">
                <div class="admin-card-info">
                    <h3>${album.titulo}</h3>
                    <p>${album.categoria || 'Geral'}</p>
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        grid.innerHTML = '<p style="color: red;">Erro ao carregar álbuns.</p>';
    }
}


// --- FLUXO 2: GERENCIAR FOTOS (CRUD) ---

async function abrirGerenciadorFotos(albumId, titulo) {
    albumAtualId = albumId; // Guarda o ID globalmente
    
    document.getElementById('view-albuns').classList.add('hidden');
    document.getElementById('view-fotos').classList.remove('hidden');
    
    const tituloEl = document.getElementById('titulo-album-aberto');
    if (tituloEl) tituloEl.innerText = titulo;
    
    carregarFotosDoAlbum();
}

// Volta para a lista de álbuns
function voltarParaAlbuns() {
    document.getElementById('view-fotos').classList.add('hidden');
    document.getElementById('view-albuns').classList.remove('hidden');
    
    const clienteId = document.getElementById('gerenciar-cliente-select').value;
    
    if (clienteId) {
        carregarAlbunsCards(clienteId);
    }
    
    albumAtualId = null;
}

// Busca as fotos do álbum aberto
async function carregarFotosDoAlbum() {
    const grid = document.getElementById('fotos-manager-grid');
    grid.innerHTML = 'Carregando fotos...';

    try {
        const res = await fetch(`api/admin/get_photos.php?album_id=${albumAtualId}`);
        const fotos = await res.json();

        grid.innerHTML = '';

        fotos.forEach(foto => {
            const card = document.createElement('div');
            card.className = 'photo-manager-card';
            
            card.innerHTML = `
                <img src="${foto.url_imagem}">
                <div class="photo-actions">
                    <button class="action-btn btn-star" onclick="definirCapa('${foto.url_imagem}')" title="Usar como Capa">★</button>
                    <button class="action-btn btn-trash" onclick="deletarFoto(${foto.id})" title="Excluir Foto">🗑</button>
                </div>
            `;
            grid.appendChild(card);
        });

        const addCard = document.createElement('div');
        addCard.className = 'add-card';
        addCard.onclick = () => document.getElementById('add-foto-input').click();
        addCard.innerHTML = `
            <span class="add-icon">+</span>
            <span class="add-text">Adicionar Fotos</span>
        `;
        grid.appendChild(addCard);

    } catch (error) {
        console.error(error);
        grid.innerHTML = 'Erro ao carregar fotos.';
    }
}


// --- AÇÕES DO CRUD (Deletar, Capa, Upload) ---

async function deletarFoto(id) {
    if (!confirm("Tem certeza que deseja excluir esta foto?")) return;

    try {
        const formData = new FormData();
        formData.append('id', id);

        const res = await fetch('api/admin/delete_photo.php', {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            carregarFotosDoAlbum();
        } else {
            alert("Erro ao excluir foto.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function definirCapa(url) {
    if (!confirm("Definir esta foto como capa do álbum?")) return;

    try {
        const formData = new FormData();
        formData.append('album_id', albumAtualId);
        formData.append('capa_url', url);

        const res = await fetch('api/admin/update_capa_album.php', {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            alert("Capa atualizada com sucesso!");
        } else {
            alert("Erro ao atualizar capa.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function uploadNovasFotos(e) {
    const files = e.target.files;
    if (files.length === 0) return;

    const btnAdd = document.querySelector('.add-card');
    if (btnAdd) btnAdd.innerHTML = '<span class="add-text">Enviando...</span>';

    for (let file of files) {
        const formData = new FormData();
        formData.append('foto', file);
        formData.append('album_id', albumAtualId);

        try {
            const res = await fetch('api/upload.php', { 
                method: 'POST', 
                body: formData 
            });

            const text = await res.text();
            
            try {
                const data = JSON.parse(text);
                
                if (!res.ok || data.erro) {
                    console.error("Erro no upload:", data);
                    alert("Erro ao enviar " + file.name + ": " + (data.erro || "Erro desconhecido"));
                }
            } catch (jsonError) {
                console.error("Erro fatal PHP:", text);
                alert("Erro no servidor ao enviar foto. Verifique o console (F12) para detalhes.");
            }

        } catch (error) {
            console.error(error);
            alert("Erro de conexão ao enviar foto.");
        }
    }

    e.target.value = '';
    carregarFotosDoAlbum();
}


// --- CRIAÇÃO (CLIENTES E ÁLBUNS) ---

async function criarCliente(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const res = await fetch('api/admin/create_user.php', {
        method: 'POST',
        body: formData
    });
    
    if (res.ok) {
        alert("Cliente cadastrado!");
        e.target.reset();
        carregarClientes();
    } else {
        alert("Erro ao cadastrar.");
    }
}

async function criarAlbum(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const res = await fetch('api/admin/create_album.php', {
        method: 'POST',
        body: formData
    });
    
    if (res.ok) {
        alert("Álbum criado!");
        e.target.reset();
        const clienteSelecionadoId = document.getElementById('gerenciar-cliente-select').value;
        if (clienteSelecionadoId) {
            carregarAlbunsCards(clienteSelecionadoId);
        }
    } else {
        alert("Erro ao criar álbum.");
    }
}