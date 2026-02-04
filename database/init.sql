-- 1. LIMPEZA (Reseta tudo para garantir IDs corretos)
DROP TABLE IF EXISTS fotos;
DROP TABLE IF EXISTS albuns;
DROP TABLE IF EXISTS usuarios;

-- 2. CRIAÇÃO DAS TABELAS
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE albuns (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo VARCHAR(100) NOT NULL,
    data_evento DATE,
    capa_url TEXT,
    categoria VARCHAR(50), -- 'Social', 'Corporativo', 'Ensaio'
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fotos (
    id SERIAL PRIMARY KEY,
    album_id INT REFERENCES albuns(id) ON DELETE CASCADE,
    url_imagem TEXT NOT NULL,
    descricao VARCHAR(255)
);

-- 3. INSERINDO USUÁRIOS
-- Senha padrão '123456' para os clientes, 'admin123' para o admin
INSERT INTO usuarios (nome, email, senha_hash, is_admin) VALUES 
('User Teste', 'teste@gmail.com', '123456', FALSE),              
('Administrador', 'admin@studio91.com', 'admin123', TRUE),       
('Carlos Silva', 'carlos@empresa.com', '123456', FALSE),         
('Juliana & Marcos', 'casal@email.com', '123456', FALSE),        
('Beatriz Costa', 'bia@email.com', '123456', FALSE);             

-- 4. INSERINDO ÁLBUNS
INSERT INTO albuns (usuario_id, titulo, data_evento, capa_url, categoria) VALUES 
(1, 'Casamento Ana & Pedro', '2025-11-15', 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', 'Social'),
(1, 'Conferência Tech Belém', '2025-12-10', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800', 'Corporativo'),
(3, 'Festa de Fim de Ano - Empresa', '2025-12-20', 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800', 'Corporativo'),
(4, 'Ensaio Pré-Wedding Praia', '2026-01-15', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800', 'Ensaio'),
(5, 'Aniversário 15 Anos', '2026-02-01', 'https://images.unsplash.com/photo-1530103862676-de3c9da59af7?q=80&w=800', 'Social');

-- 5. INSERINDO FOTOS
INSERT INTO fotos (album_id, url_imagem, descricao) VALUES 
-- Fotos do Casamento (Álbum 1)
(1, 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', 'Entrada dos Noivos'),
(1, 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800', 'Brinde dos Noivos'),
(1, 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800', 'Detalhes do Vestido'),

-- Fotos da Conferência (Álbum 2)
(2, 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800', 'Palestra Principal'),
(2, 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800', 'Networking no Coffee Break'),

-- Fotos da Festa Empresa (Álbum 3 - Carlos)
(3, 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800', 'Equipe reunida'),
(3, 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=800', 'Discurso do Diretor'),

-- Fotos do Pré-Wedding (Álbum 4 - Casal)
(4, 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800', 'Pôr do sol'),
(4, 'https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=800', 'Caminhada na areia'),

-- Fotos dos 15 Anos (Álbum 5 - Beatriz)
(5, 'https://images.unsplash.com/photo-1530103862676-de3c9da59af7?q=80&w=800', 'Valsa'),
(5, 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=800', 'Mesa do Bolo');