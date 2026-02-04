// --- SIMULAÇÃO DO BANCO DE DADOS (MOCK DATA) ---

// Usuário Logado (Simulação)
const currentUser = {
    id: 1,
    name: "Natan Lopes"
};

// Tabela Álbuns
const dbAlbums = [
    {
        id: 101,
        userId: 1,
        title: "Casamento Civil",
        date: "15/01/2026",
        cover: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 102,
        userId: 1,
        title: "Ensaio Pré-Wedding",
        date: "10/01/2026",
        cover: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800&auto=format&fit=crop"
    }
];

// Tabela Fotos (Relacionada pelo albumId)
const dbPhotos = [
    // Fotos do Álbum 101
    { id: 1, albumId: 101, url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800" },
    { id: 2, albumId: 101, url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800" },
    { id: 3, albumId: 101, url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800" },
    
    // Fotos do Álbum 102
    { id: 4, albumId: 102, url: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800" },
    { id: 5, albumId: 102, url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800" },
];


// --- LÓGICA DE INTERFACE ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Carrega nome do usuário
    document.getElementById('user-name').innerText = currentUser.name;

    // 2. Renderiza os álbuns na tela
    renderAlbums();
});

function renderAlbums() {
    const container = document.getElementById('albums-container');
    container.innerHTML = ''; // Limpa antes de renderizar

    dbAlbums.forEach(album => {
        // Cria o HTML do Card de Álbum
        const card = document.createElement('div');
        card.classList.add('album-card');
        card.onclick = () => openAlbum(album.id); // Evento de clique

        card.innerHTML = `
            <img src="${album.cover}" alt="${album.title}" class="album-cover">
            <div class="album-info">
                <h3>${album.title}</h3>
                <p>Data: ${album.date}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function openAlbum(albumId) {
    // Busca os dados do álbum e as fotos correspondentes
    const album = dbAlbums.find(a => a.id === albumId);
    const photos = dbPhotos.filter(p => p.albumId === albumId);

    // Atualiza o título e esconde/mostra seções
    document.getElementById('album-title').innerText = album.title;
    document.getElementById('albums-view').classList.add('hidden');
    document.getElementById('photos-view').classList.remove('hidden');

    // Renderiza as fotos
    const photosContainer = document.getElementById('photos-container');
    photosContainer.innerHTML = '';

    if (photos.length === 0) {
        photosContainer.innerHTML = '<p>Este álbum ainda não tem fotos.</p>';
        return;
    }

    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.url;
        img.classList.add('photo-item');
        img.onclick = () => openLightbox(photo.url);
        photosContainer.appendChild(img);
    });
}

function closeAlbum() {
    // Esconde fotos, mostra lista de álbuns (Heurística: Controle do Usuário)
    document.getElementById('photos-view').classList.add('hidden');
    document.getElementById('albums-view').classList.remove('hidden');
}

// --- LIGHTBOX (VISUALIZAÇÃO DE FOTO) ---
function openLightbox(imageUrl) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = imageUrl;
    lightbox.classList.remove('hidden');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
}