class RaidCreateContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="class-create-content">
                <header class="page-header">
                    <div>
                        <h1>Liste des Raids</h1>
                        <p>Gère la programmation des raids, défis et sessions de farm.</p>
                    </div>
                    <button id="open-modal-btn" class="primary-btn" type="button">Ajouter un raid</button>
                </header>

                <div class="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom & Horaire</th>
                            <th>Configuration</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody id="raids-table-body">
                        <tr>
                            <td colspan="4" class="empty-row">Chargement des raids...</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <p id="global-message" class="global-message"></p>
            </section>

            <div id="raid-modal" class="modal-backdrop hidden" aria-hidden="true">
                <div class="modal-card" role="dialog" aria-modal="true">
                    <div class="modal-header">
                        <h2 id="modal-title">Programmer un Raid</h2>
                        <button id="close-modal-btn" class="icon-btn" type="button">×</button>
                    </div>
                    <form id="raid-create-form" novalidate>
                        <div class="field">
                            <label for="nom">Nom du raid</label>
                            <input id="nom" name="nom" type="text" placeholder="Ex: Abyssos, P12S..." required>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                            <div class="field">
                                <label for="type">Type</label>
                                <input id="type" name="type" type="text" placeholder="Ex: Alliances, Défis...">
                            </div>
                            <div class="field">
                                <label for="difficulte">Difficulté</label>
                                <input id="difficulte" name="difficulte" type="text" placeholder="Ex: Sadique, Extrême...">
                            </div>
                        </div>

                        <div class="field">
                            <label for="horaire">Date et Heure</label>
                            <input id="horaire" name="horaire" type="datetime-local" required>
                        </div>

                        <div style="display: flex; align-items: center; gap: 10px; background: #f8fafc; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 15px;">
                            <input id="isFarmSession" name="isFarmSession" type="checkbox" style="width: 20px; height: 20px; cursor: pointer;">
                            <label for="isFarmSession" style="margin:0; cursor: pointer;">Cocher s'il s'agit d'une session de Farm</label>
                        </div>

                        <div class="actions">
                            <button class="primary-btn" type="submit">Créer le raid</button>
                        </div>
                    </form>
                </div>
            </div>

            <style>
                /* CSS identique au modèle pour la cohérence visuelle */
                .class-create-content { max-width: 980px; width: 100%; background: #ffffff; border: 1px solid #dbe4ef; border-radius: 16px; box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08); padding: 28px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
                .page-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 18px; }
                .page-header h1 { margin: 0 0 6px 0; font-size: 30px; color: #0f172a; }
                .page-header p { margin: 0; color: #475569; }
                .primary-btn { border: none; background: #2563eb; color: #ffffff; padding: 11px 16px; border-radius: 10px; font-weight: 700; cursor: pointer; box-shadow: 0 8px 16px rgba(37, 99, 235, 0.25); transition: background 0.2s; }
                .primary-btn:hover { background: #1d4ed8; }
                .table-wrapper { border: 1px solid #dbe4ef; border-radius: 12px; overflow: hidden; background: #ffffff; }
                table { width: 100%; border-collapse: collapse; }
                thead { background: #f8fafc; }
                th, td { padding: 13px 14px; text-align: left; border-bottom: 1px solid #e2e8f0; }
                th { color: #334155; font-weight: 700; font-size: 14px; }
                .empty-row { text-align: center; color: #64748b; padding: 30px; }
                .delete-btn { border: none; background: #dc2626; color: #ffffff; padding: 8px 10px; border-radius: 8px; font-weight: 700; cursor: pointer; }
                .badge { background: #f1f5f9; color: #475569; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 600; display: inline-block; margin-right: 4px; }
                .badge-farm { background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 700; }
                .modal-backdrop { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.5); display: flex; justify-content: center; align-items: center; padding: 20px; z-index: 1000; }
                .modal-backdrop.hidden { display: none; }
                .modal-card { width: 100%; max-width: 500px; background: #ffffff; border-radius: 14px; padding: 20px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .icon-btn { border: none; background: #f1f5f9; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 20px; }
                .field { display: grid; gap: 6px; margin-bottom: 12px; }
                label { font-weight: 700; color: #1e293b; font-size: 14px; }
                input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #cbd5e1; outline: none; box-sizing: border-box; }
                .global-message { min-height: 20px; margin-top: 12px; font-weight: 600; text-align: center; }
                .success { color: #166534; }
                .error { color: #b91c1c; }
                .actions { display: flex; justify-content: flex-end; margin-top: 10px; }
            </style>
        `;

        // Éléments DOM
        const tableBody = this.querySelector("#raids-table-body");
        const openModalBtn = this.querySelector("#open-modal-btn");
        const closeModalBtn = this.querySelector("#close-modal-btn");
        const modal = this.querySelector("#raid-modal");
        const form = this.querySelector("#raid-create-form");
        const messageEl = this.querySelector("#global-message");

        const API_VIEW = "/api/raids";
        const API_WRITE = "/api/raids";

        const showMessage = (msg, type = "") => {
            messageEl.textContent = msg;
            messageEl.className = `global-message ${type}`;
            setTimeout(() => messageEl.textContent = "", 4000);
        };

        const loadRaids = async () => {
            try {
                const response = await fetch(API_VIEW);
                const raids = await response.json();
                
                if (raids.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="4" class="empty-row">Aucun raid programmé.</td></tr>`;
                    return;
                }

                tableBody.innerHTML = raids.map(raid => `
                    <tr>
                        <td>#${raid.id}</td>
                        <td>
                            <div style="font-weight:700; color:#0f172a;">${raid.nom}</div>
                            <div style="font-size:12px; color:#64748b;">${new Date(raid.horaire).toLocaleString('fr-FR')}</div>
                        </td>
                        <td>
                            <span class="badge">${raid.type || 'N/A'}</span>
                            <span class="badge">${raid.difficulte || 'Normal'}</span>
                            ${raid.isFarmSession ? `<span class="badge-farm">✓ FARM</span>` : ''}
                        </td>
                        <td>
                            <button class="delete-btn" data-id="${raid.id}">
							<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
							  <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
							</svg>

							</button>
                        </td>
                    </tr>
                `).join("");
            } catch (err) {
                tableBody.innerHTML = `<tr><td colspan="4" class="empty-row error">Erreur de chargement des données.</td></tr>`;
            }
        };

		form.addEventListener("submit", async (e) => {
		    e.preventDefault();
		    
		    // Utiliser FormData est plus fiable pour récupérer les valeurs
		    const formData = new FormData(form);
		    
		    const payload = {
		        nom: formData.get("nom"),
		        type: formData.get("type"),
		        difficulte: formData.get("difficulte"),
		        horaire: formData.get("horaire"),
		        isFarmSession: form.querySelector("#isFarmSession").checked
		    };

		    // DEBUG : Vérifie si les données s'affichent dans la console F12
		    console.log("Envoi du payload :", payload);

		    if (!payload.nom || !payload.horaire) {
		        showMessage("Le nom et l'horaire sont obligatoires.", "error");
		        return;
		    }

		    try {
		        const res = await fetch(API_WRITE, {
		            method: "POST",
		            headers: { "Content-Type": "application/json" },
		            body: JSON.stringify(payload)
		        });

		        if (!res.ok) {
		            const errorMsg = await res.text();
		            throw new Error(errorMsg);
		        }
		        
		        form.reset();
		        modal.classList.add("hidden");
		        showMessage("Raid ajouté avec succès !", "success");
		        await loadRaids(); // On recharge la liste
		    } catch (err) {
		        console.error("Erreur détaillée :", err);
		        showMessage("Erreur lors de la création : " + err.message, "error");
		    }
		});

        tableBody.addEventListener("click", async (e) => {
            if (e.target.matches(".delete-btn")) {
                const id = e.target.dataset.id;
                if (confirm("Supprimer ce raid ?")) {
                    await fetch(`${API_WRITE}/${id}`, { method: "DELETE" });
                    await loadRaids();
                    showMessage("Raid supprimé.");
                }
            }
        });

        openModalBtn.onclick = () => modal.classList.remove("hidden");
        closeModalBtn.onclick = () => modal.classList.add("hidden");
        modal.onclick = (e) => { if (e.target === modal) modal.classList.add("hidden"); };

        loadRaids();
    }
}

customElements.define("raid-create-content", RaidCreateContent);