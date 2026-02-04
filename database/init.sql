DROP TABLE IF EXISTS fotos;
DROP TABLE IF EXISTS albuns;
DROP TABLE IF EXISTS usuarios;


CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE albuns (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo VARCHAR(100) NOT NULL,
    data_evento DATE,
    capa_url TEXT,
    categoria VARCHAR(50), -- 'Social' ou 'Corporativo'
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE fotos (
    id SERIAL PRIMARY KEY,
    album_id INT REFERENCES albuns(id) ON DELETE CASCADE,
    url_imagem TEXT NOT NULL,
    descricao VARCHAR(255)
);

-- --- DADOS DE TESTE ---

-- Criando um usuário (Senha fictícia '123456')
INSERT INTO usuarios (nome, email, senha_hash) VALUES 
('User teste', 'teste@gmail.com', 'teste');

INSERT INTO albuns (usuario_id, titulo, data_evento, capa_url, categoria) VALUES 
(1, 'Casamento Ana & Pedro', '2025-11-15', 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', 'Social'),
(1, 'Conferência Tech Belém', '2025-12-10', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800', 'Corporativo');

INSERT INTO fotos (album_id, url_imagem, descricao) VALUES 
(1, 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', 'Entrada dos Noivos'),
(1, 'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800', 'Brinde dos Noivos'),
(1, 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800', 'Decoração da Mesa');

INSERT INTO fotos (album_id, url_imagem, descricao) VALUES 
(2, 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800', 'Palestra Principal'),
(2, 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800', 'Networking no Coffee Break');