```markdown
# Studio 91 - Plataforma Web & Sistema de Gestão 🎥

> Projeto desenvolvido para a disciplina de **Interface Homem-Máquina (IHM)** e Práticas de Desenvolvimento Web.

Este repositório contém o MVP do site institucional e do sistema administrativo da **Studio 91**, uma produtora audiovisual. O projeto evoluiu de uma interface estática para uma aplicação web dinâmica com **PHP, Banco de Dados, Docker e Upload de Arquivos**.

---

## 🚀 Funcionalidades Implementadas

### Área Pública
* **Landing Page Responsiva:** Apresentação da empresa com design cinematográfico.
* **Carrossel Interativo:** Exibição de portfólio.
* **Formulário de Contato:** Interface para captação de leads.

### Área do Cliente
* **Login Seguro:** Autenticação de usuários com diferenciação de nível de acesso.
* **Galeria Privada:** O cliente visualiza apenas os álbuns e fotos pertencentes a ele.
* **Download:** Opção para baixar fotos em alta resolução.

### Painel Administrativo
* **Gestão de Clientes:** Cadastro de novos usuários.
* **Gestão de Álbuns:** Criação de álbuns vinculados a clientes específicos.
* **Upload de Fotos:** Envio múltiplo de imagens com criação automática de diretórios.
* **CRUD de Fotos:** Visualização, exclusão e definição de capa do álbum.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3 (Flexbox/Grid), JavaScript Vanilla.
* **Backend:** PHP 8.2 (FPM).
* **Banco de Dados:** PostgreSQL 16.
* **Servidor Web:** Nginx.
* **Infraestrutura:** Docker & Docker Compose.
* **Gerenciador de DB:** Adminer.

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
* Ter o **Docker** e **Docker Compose** instalados na máquina.
* **Git** instalado.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/studio91.git](https://github.com/seu-usuario/studio91.git)
   cd studio91

```

2. **Configure as Variáveis de Ambiente (.env):**
O projeto utiliza um arquivo `.env` para configurar o banco de dados. Crie um arquivo chamado `.env` na raiz do projeto e cole o seguinte conteúdo:
```env
# Configurações do Banco de Dados
POSTGRES_DB=studio91_db
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_HOST=db

# Portas dos Serviços
WEB_PORT=80
ADMINER_PORT=8080

```


3. **Configure as permissões de pasta (Linux/Mac):**
Para que o PHP consiga salvar os uploads de fotos, é necessário dar permissão de escrita na pasta:
```bash
mkdir -p src/uploads
chmod -R 777 src/uploads

```


4. **Suba os containers:**
```bash
docker-compose up -d --build

```


5. **Configuração do Banco de Dados:**
* Acesse o Adminer em: `http://localhost:8080`
* **Sistema:** PostgreSQL
* **Servidor:** `db`
* **Usuário:** `user`
* **Senha:** `password`
* **Banco:** `studio91_db`
* Vá em **Comando SQL** e execute o script contido no arquivo `database/init.sql` (ou copie e cole os comandos de criação de tabelas).


6. **Acesse a Aplicação:**
* **Site Principal:** `http://localhost`
* **Painel Admin:** `http://localhost/admin.html`
* **Área do Cliente:** `http://localhost/login.html`



---

## 🔐 Credenciais de Acesso (Dados de Teste)

O banco de dados já vem populado com usuários para teste imediato:

### 👑 Administrador (Acesso Total)

* **Login:** `admin@studio91.com`
* **Senha:** `admin123`
* *Funcionalidades:* Criar álbuns, subir fotos, gerenciar clientes, excluir imagens.

### 👤 Clientes (Acesso Restrito)

* **Login:** `teste@gmail.com` | **Senha:** `123456`
* **Login:** `carlos@empresa.com` | **Senha:** `123456`
* *Funcionalidades:* Visualizar e baixar apenas as fotos dos seus respectivos álbuns.

---

## 🧠 Conceitos de IHM Aplicados

O desenvolvimento da interface seguiu três pilares principais de Design:

### 1. UI (User Interface)

* **Cinematic Dark Mode:** Uso de fundo escuro para valorizar o conteúdo multimídia e reduzir o cansaço visual.
* **Hierarquia Visual:** Cor dourada reservada para elementos interativos (botões e links), guiando o olhar do usuário (Lei de Fitts).

### 2. UX (User Experience)

* **Feedback de Sistema:** Mensagens de "Carregando", "Sucesso" ou "Erro" em todas as interações de formulário e upload (Heurística de Nielsen: Visibilidade do Status).
* **Prevenção de Erros:** O sistema impede que clientes tentem acessar áreas administrativas ou álbuns de terceiros.

### 3. QoE (Quality of Experience)

* **Performance:** Uso de Nginx para servir arquivos estáticos rapidamente.
* **Acessibilidade:** Contraste adequado e navegação intuitiva.

---

**Desenvolvido por:** Natan Lopes & Carlos Daniel
*Bacharelado em Sistemas de Informação - IFNMG Januária*