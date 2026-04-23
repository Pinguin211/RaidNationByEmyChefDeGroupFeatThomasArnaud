class ClassCreateContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="class-create-content">
                <header>
                    <h1>Ajouter une classe</h1>
                    <p>Cree une nouvelle classe avec verification client avant envoi.</p>
                </header>

                <form id="class-create-form" novalidate>
                    <div class="field">
                        <label for="nom">Nom de la classe</label>
                        <input id="nom" name="nom" type="text" placeholder="Ex: Guerrier" required maxlength="60">
                        <small class="error" data-error-for="nom"></small>
                    </div>

                    <div class="field">
                        <label for="role">Role de la classe</label>
                        <input id="role" name="role" type="text" placeholder="Ex: Tank" required maxlength="40">
                        <small class="error" data-error-for="role"></small>
                    </div>

                    <div class="actions">
                        <button type="submit">Creer la classe</button>
                    </div>
                    <p id="global-message" class="global-message"></p>
                </form>
            </section>
            <style>
                .class-create-content {
                    max-width: 860px;
                    width: 100%;
                    background: #ffffff;
                    border: 1px solid #dbe4ef;
                    border-radius: 16px;
                    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
                    padding: 30px;
                }

                .class-create-content h1 {
                    margin: 0 0 8px 0;
                    font-size: 32px;
                }

                .class-create-content p {
                    margin: 0;
                    color: #475569;
                }

                #class-create-form {
                    margin-top: 24px;
                    display: grid;
                    gap: 18px;
                }

                .field {
                    display: grid;
                    gap: 6px;
                }

                label {
                    font-weight: 700;
                    color: #1e293b;
                }

                input {
                    width: 100%;
                    padding: 12px 14px;
                    border-radius: 10px;
                    border: 1px solid #cbd5e1;
                    background: #f8fafc;
                    outline: none;
                    transition: border-color 120ms ease-in-out, box-shadow 120ms ease-in-out;
                }

                input:focus {
                    border-color: #2563eb;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
                }

                input.invalid {
                    border-color: #dc2626;
                    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.12);
                }

                .error {
                    color: #b91c1c;
                    min-height: 16px;
                    font-size: 13px;
                }

                .actions button {
                    border: none;
                    background: #2563eb;
                    color: #ffffff;
                    padding: 11px 16px;
                    border-radius: 10px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25);
                }

                .actions button:hover {
                    background: #1d4ed8;
                }

                .global-message {
                    min-height: 18px;
                    font-weight: 600;
                }

                .global-message.success {
                    color: #166534;
                }

                .global-message.error {
                    color: #b91c1c;
                }
            </style>
        `;

        const form = this.querySelector("#class-create-form");
        const nomInput = this.querySelector("#nom");
        const roleInput = this.querySelector("#role");
        const messageEl = this.querySelector("#global-message");

        const setFieldError = (field, message) => {
            const errorEl = this.querySelector(`[data-error-for="${field.name}"]`);
            if (errorEl) {
                errorEl.textContent = message;
            }
            field.classList.toggle("invalid", Boolean(message));
        };

        const clearMessages = () => {
            messageEl.textContent = "";
            messageEl.className = "global-message";
        };

        const validateField = (field) => {
            const value = field.value.trim();
            if (value.length < 2) {
                setFieldError(field, "Minimum 2 caracteres.");
                return false;
            }
            setFieldError(field, "");
            return true;
        };

        nomInput.addEventListener("input", () => validateField(nomInput));
        roleInput.addEventListener("input", () => validateField(roleInput));

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            clearMessages();

            const isNomValid = validateField(nomInput);
            const isRoleValid = validateField(roleInput);

            if (!isNomValid || !isRoleValid) {
                messageEl.textContent = "Veuillez corriger les champs en erreur.";
                messageEl.classList.add("error");
                return;
            }

            const payload = {
                nom: nomInput.value.trim(),
                role: roleInput.value.trim()
            };

            try {
                const response = await fetch("/api/classes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    messageEl.textContent = "La creation a echoue. Verifie les donnees saisies.";
                    messageEl.classList.add("error");
                    return;
                }

                form.reset();
                setFieldError(nomInput, "");
                setFieldError(roleInput, "");
                messageEl.textContent = "Classe creee avec succes.";
                messageEl.classList.add("success");
            } catch (error) {
                messageEl.textContent = "Impossible de joindre le serveur.";
                messageEl.classList.add("error");
            }
        });
    }
}

customElements.define("class-create-content", ClassCreateContent);
