// src/js/admin-login.js
document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('admin-login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const emailField = document.getElementById('email');
            const senhaField = document.getElementById('senha');
            const btnSubmit = document.querySelector('.btn-login');

            // Feedback visual
            const textoOriginal = btnSubmit.innerText;
            btnSubmit.innerText = "VERIFICANDO...";
            btnSubmit.disabled = true;
            btnSubmit.style.opacity = "0.7";
            
            limparErro();

            const payload = {
                email: emailField.value,
                password: senhaField.value 
            };

            try {
                const response = await fetch('api/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.ok && data.sucesso) {
                    // VERIFICAÇÃO DE SEGURANÇA NO FRONT
                    if (data.is_admin === true) {
                        window.location.href = 'admin.html';
                    } else {
                        mostrarErro("Acesso negado. Esta área é apenas para administradores.");
                        // Opcional: Deslogar o usuário cliente que acabou de logar por engano
                        await fetch('api/logout.php'); 
                        restaurarBotao(btnSubmit, textoOriginal);
                    }
                } else {
                    mostrarErro(data.erro || "Falha ao realizar login.");
                    restaurarBotao(btnSubmit, textoOriginal);
                }

            } catch (error) {
                console.error("Erro:", error);
                mostrarErro("Erro de conexão com o servidor.");
                restaurarBotao(btnSubmit, textoOriginal);
            }
        });
    }
});

function restaurarBotao(btn, textoOriginal) {
    btn.innerText = textoOriginal;
    btn.disabled = false;
    btn.style.opacity = "1";
}

function mostrarErro(mensagem) {
    const form = document.querySelector('form');
    const btn = document.querySelector('.btn-login');
    let errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ff4d4d';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginBottom = '15px';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.fontWeight = 'bold';
    errorDiv.innerText = mensagem;
    form.insertBefore(errorDiv, btn);
}

function limparErro() {
    const errorMsg = document.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();
}