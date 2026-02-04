// src/js/client.js

document.addEventListener('DOMContentLoaded', () => {
    fetchAlbums();
});

async function fetchAlbums() {
    try {
        const response = await fetch('api/albums.php');
        
        if (response.status === 401) {
            window.location.href = 'login.html';
            return;
        }

        const data = await response.json();
        
        document.getElementById('user-name').innerText = data.user_name;
        
        renderAlbums(data.albuns);

    } catch (error) {
        console.error("Erro ao buscar álbuns:", error);
        alert("Erro ao conectar com o servidor.");
    }
}

function renderAlbums(albunsList) {
    const container = document.getElementById('albums-container');
    container.innerHTML = '';

    if (albunsList.length === 0) {
        container.innerHTML = '<p>Nenhum álbum encontrado.</p>';
        return;
    }

    albunsList.forEach(album => {
        const card = document.createElement('div');
        card.classList.add('album-card');
        card.onclick = () => openAlbum(album.id, album.titulo);

        card.innerHTML = `
            <img src="${album.capa_url}" alt="${album.titulo}" class="album-cover">
            <div class="album-info">
                <h3>${album.titulo}</h3>
                <p>Data: ${album.data}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

async function openAlbum(albumId, albumTitle) {
    document.getElementById('album-title').innerText = albumTitle;
    
    document.getElementById('albums-view').classList.add('hidden');
    document.getElementById('photos-view').classList.remove('hidden');
    
    const photosContainer = document.getElementById('photos-container');
    photosContainer.innerHTML = '<p>Carregando fotos...</p>';

    try {
        const response = await fetch(`api/fotos.php?album_id=${albumId}`);
        const photos = await response.json();

        photosContainer.innerHTML = '';

        if (photos.length === 0) {
            photosContainer.innerHTML = '<p>Este álbum não possui fotos.</p>';
            return;
        }

        photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.url_imagem;
            img.classList.add('photo-item');
            img.onclick = () => openLightbox(photo.url_imagem);
            photosContainer.appendChild(img);
        });

    } catch (error) {
        console.error("Erro ao buscar fotos:", error);
    }
}

function closeAlbum() {
    document.getElementById('photos-view').classList.add('hidden');
    document.getElementById('albums-view').classList.remove('hidden');
}

function openLightbox(url) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const btnDownload = document.getElementById('btn-download');
    
    lightboxImg.src = url;
    btnDownload.href = url;
    
    lightbox.classList.remove('hidden');

    lightbox.style.display = 'flex'; 
    
    document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
    if (!event || event.target.id === 'lightbox' || event.target.classList.contains('close-lightbox')) {
        const lightbox = document.getElementById('lightbox');
        
        lightbox.classList.add('hidden');
        
        lightbox.style.display = 'none';
        
        document.body.style.overflow = 'auto';
    }
}