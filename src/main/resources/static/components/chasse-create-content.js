class ChasseCreateContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="class-create-content">
                <header class="page-header">
                    <div>
                        <h1>Chasses aux Trésors</h1>
                        <p>Gère les sessions de récolte et le stock de cartes par extension.</p>
                    </div>
                    <button id="open-modal-btn" class="primary-btn" type="button">Nouvelle Chasse</button>
                </header>

                <div class="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type de Cartes</th>
                            <th>Quantité & Horaire</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody id="chasses-table-body">
                        <tr>
                            <td colspan="4" class="empty-row">Chargement des sessions...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <p id="global-message" class="global-message"></p>
            </section>

            <div id="chasse-modal" class="modal-backdrop hidden" aria-hidden="true">
                <div class="modal-card" role="dialog" aria-modal="true">
                    <div class="modal-header">
                        <h2 id="modal-title">Créer une session de Chasse</h2>
                        <button id="close-modal-btn" class="icon-btn" type="button">×</button>
                    </div>
                    <form id="chasse-create-form" novalidate>
                        
                        <div class="field">
                            <label for="type">Type de cartes</label>
                            <input id="type" name="type" type="text" placeholder="Ex: Cartes en peau de Smilodon (G12)" required>
                        </div>

                        <div class="field">
                            <label for="nbCartes">Nombre de cartes</label>
                            <input id="nbCartes" name="nbCartes" type="number" min="1" step="1" placeholder="Quantité totale" required>
                        </div>

                        <div class="field">
                            <label for="horaire">Date et Heure</label>
                            <input id="horaire" name="horaire" type="datetime-local" required>
                        </div>

                        <div class="actions">
                            <button class="primary-btn" type="submit">Enregistrer la chasse</button>
                        </div>
                    </form>
                </div>
            </div>

            <style>
                .class-create-content { max-width: 980px; width: 100%; background: #ffffff; border: 1px solid #dbe4ef; border-radius: 16px; box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08); padding: 28px; font-family: 'Segoe UI', system-ui, sans-serif; }
                .page-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 18px; }
                .page-header h1 { margin: 0 0 6px 0; font-size: 30px; color: #0f172a; }
                .page-header p { margin: 0; color: #475569; }
                .primary-btn { border: none; background: #2563eb; color: #ffffff; padding: 11px 16px; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25); }
                .primary-btn:hover { background: #1d4ed8; }
                .table-wrapper { border: 1px solid #dbe4ef; border-radius: 12px; overflow: hidden; background: #ffffff; }
                table { width: 100%; border-collapse: collapse; }
                thead { background: #f8fafc; }
                th, td { padding: 13px 14px; text-align: left; border-bottom: 1px solid #e2e8f0; }
                th { color: #334155; font-weight: 700; font-size: 14px; }
                .empty-row { text-align: center; color: #64748b; padding: 30px; }
                .delete-btn { border: none; background: #dc2626; color: #ffffff; padding: 8px 10px; border-radius: 8px; font-weight: 700; cursor: pointer; }
                .badge-qty { background: #eff6ff; color: #1e40af; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 800; border: 1px solid #bfdbfe; }
                .modal-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.5); display: flex; justify-content: center; align-items: center; padding: 20px; z-index: 1000; }
                .modal-backdrop.hidden { display: none; }
                .modal-card { width: 100%; max-width: 450px; background: #ffffff; border-radius: 14px; padding: 25px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .icon-btn { border: none; background: #f1f5f9; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 20px; }
                .field { display: grid; gap: 6px; margin-bottom: 15px; }
                label { font-weight: 700; color: #1e293b; font-size: 14px; }
                input { width: 100%; padding: 11px 14px; border-radius: 10px; border: 1px solid #cbd5e1; outline: none; box-sizing: border-box; }
                input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
                .global-message { min-height: 20px; margin-top: 12px; font-weight: 600; text-align: center; }
                .success { color: #166534; }
                .error { color: #b91c1c; }
                .actions { display: flex; justify-content: flex-end; margin-top: 10px; }
            </style>
        `;

        const tableBody = this.querySelector("#chasses-table-body");
        const openModalBtn = this.querySelector("#open-modal-btn");
        const closeModalBtn = this.querySelector("#close-modal-btn");
        const modal = this.querySelector("#chasse-modal");
        const form = this.querySelector("#chasse-create-form");
        const messageEl = this.querySelector("#global-message");

        const API_VIEW = "/api/chasses";
        const API_WRITE = "/api/chasses";

        const showMessage = (msg, type = "") => {
            messageEl.textContent = msg;
            messageEl.className = `global-message ${type}`;
            setTimeout(() => messageEl.textContent = "", 4000);
        };

        const loadChasses = async () => {
            try {
                const response = await fetch(API_VIEW);
                const chasses = await response.json();
                
                if (chasses.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="4" class="empty-row">Aucune chasse aux trésors programmée.</td></tr>`;
                    return;
                }

                tableBody.innerHTML = chasses.map(chasse => `
                    <tr>
                        <td>#${chasse.id}</td>
                        <td style="font-weight:700; color:#0f172a;">${chasse.type}</td>
                        <td>
                            <span class="badge-qty">${chasse.nbCartes} cartes</span>
                            <div style="font-size:12px; color:#64748b; margin-top:4px;">
                                ${new Date(chasse.horaire).toLocaleString('fr-FR')}
                            </div>
                        </td>
                        <td>
                            <button class="delete-btn" data-id="${chasse.id}">
								<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
								  <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
								</svg>
							</button>
                        </td>
                    </tr>
                `).join("");
            } catch (err) {
                tableBody.innerHTML = `<tr><td colspan="4" class="empty-row error">Erreur de chargement.</td></tr>`;
            }
        };

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const payload = {
                type: form.type.value,
                nbCartes: parseInt(form.nbCartes.value),
                horaire: form.horaire.value
            };

            try {
                const res = await fetch(API_WRITE, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                if (!res.ok) throw new Error();
                
                form.reset();
                modal.classList.add("hidden");
                showMessage("Chasse enregistrée !", "success");
                await loadChasses();
            } catch (err) {
                showMessage("Erreur lors de la création.", "error");
            }
        });

        tableBody.addEventListener("click", async (e) => {
            if (e.target.matches(".delete-btn")) {
                const id = e.target.dataset.id;
                if (confirm("Supprimer cette session de chasse ?")) {
                    await fetch(`${API_WRITE}/${id}`, { method: "DELETE" });
                    await loadChasses();
                    showMessage("Chasse supprimée.");
                }
            }
        });

        openModalBtn.onclick = () => modal.classList.remove("hidden");
        closeModalBtn.onclick = () => modal.classList.add("hidden");
        modal.onclick = (e) => { if (e.target === modal) modal.classList.add("hidden"); };

        loadChasses();
    }
}

customElements.define("chasse-create-content", ChasseCreateContent);