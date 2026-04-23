class ActivityDetailContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="activity-detail">
                <header class="page-header">
                    <div>
                        <h1>Detail d'activite</h1>
                        <p id="subtitle">Chargement de l'activite...</p>
                    </div>
                </header>

                <div id="status" class="status">Chargement...</div>

                <div id="content" class="content hidden">
                    <section class="card recap-card">
                        <h2>Recap activite</h2>
                        <div class="meta-grid" id="meta-grid"></div>
                    </section>

                    <section class="card groupes-card">
                        <h2>Groupes concernes</h2>
                        <div id="groups-list" class="stack"></div>
                    </section>

                    <section class="card players-card">
                        <h2>Players concernes</h2>
                        <div id="players-list" class="stack"></div>
                    </section>
                </div>
            </section>
            <style>
                .activity-detail {
                    width: 100%;
                    max-width: none;
                    display: grid;
                    gap: 16px;
                }

                .page-header h1 {
                    margin: 0 0 6px 0;
                    font-size: 30px;
                    color: #0f172a;
                }

                .page-header p {
                    margin: 0;
                    color: #475569;
                }

                .status {
                    border: 1px solid #dbe4ef;
                    border-radius: 12px;
                    background: #ffffff;
                    padding: 12px 14px;
                    color: #334155;
                    font-weight: 600;
                }

                .status.error {
                    color: #b91c1c;
                    border-color: #fecaca;
                    background: #fff7f7;
                }

                .content.hidden {
                    display: none;
                }

                .content {
                    display: grid;
                    gap: 16px;
                    grid-template-columns: 1fr;
                    grid-template-areas:
                        "recap"
                        "groupes"
                        "players";
                }

                .recap-card {
                    grid-area: recap;
                }

                .groupes-card {
                    grid-area: groupes;
                }

                .players-card {
                    grid-area: players;
                }

                .card {
                    background: #ffffff;
                    border: 1px solid #dbe4ef;
                    border-radius: 14px;
                    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
                    padding: 18px;
                }

                .card h2 {
                    margin: 0 0 10px 0;
                    font-size: 20px;
                    color: #0f172a;
                }

                .meta-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
                    gap: 10px;
                }

                .meta-item {
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    padding: 10px;
                    background: #f8fafc;
                }

                .meta-item strong {
                    display: block;
                    color: #334155;
                    margin-bottom: 2px;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .stack {
                    display: grid;
                    gap: 10px;
                }

                .row {
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    padding: 10px 12px;
                    background: #f8fafc;
                }

                .row-title {
                    margin: 0 0 4px 0;
                    font-weight: 700;
                    color: #1e293b;
                }

                .badges {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }

                .badge {
                    background: #eff6ff;
                    color: #1d4ed8;
                    border: 1px solid #bfdbfe;
                    border-radius: 999px;
                    padding: 3px 9px;
                    font-size: 12px;
                    font-weight: 700;
                }

                @media (min-width: 1100px) {
                    .content {
                        grid-template-columns: 1fr 1fr;
                        grid-template-areas:
                            "recap recap"
                            "groupes players";
                    }
                }
            </style>
        `;

        const statusEl = this.querySelector("#status");
        const subtitleEl = this.querySelector("#subtitle");
        const contentEl = this.querySelector("#content");
        const metaGridEl = this.querySelector("#meta-grid");
        const groupsListEl = this.querySelector("#groups-list");
        const playersListEl = this.querySelector("#players-list");

        const extractActivityId = () => {
            const pathMatch = window.location.pathname.match(/\/activit(?:e|é)\/(\d+)/u);
            if (pathMatch) {
                return pathMatch[1];
            }
            const queryId = new URLSearchParams(window.location.search).get("id");
            return queryId;
        };

        const addMeta = (label, value) => {
            const item = document.createElement("div");
            item.className = "meta-item";
            item.innerHTML = `<strong>${label}</strong><span>${value ?? "-"}</span>`;
            metaGridEl.appendChild(item);
        };

        const render = (detail) => {
            subtitleEl.textContent = `Activite #${detail.id}`;
            statusEl.textContent = "Detail charge.";
            statusEl.classList.remove("error");
            contentEl.classList.remove("hidden");

            metaGridEl.innerHTML = "";
            addMeta("ID", detail.id);
            addMeta("Categorie", detail.categorie);
            addMeta("Horaire", detail.horaire ?? "-");
            addMeta("Nom", detail.nom ?? "-");
            addMeta("Type", detail.type ?? "-");
            addMeta("Difficulte", detail.difficulte ?? "-");
            addMeta("Farm Session", detail.isFarmSession == null ? "-" : String(detail.isFarmSession));
            addMeta("Nombre de cartes", detail.nbCartes ?? "-");

            groupsListEl.innerHTML = "";
            if (!Array.isArray(detail.groupes) || detail.groupes.length === 0) {
                groupsListEl.innerHTML = "<div class='row'>Aucun groupe associe.</div>";
            } else {
                detail.groupes.forEach((groupe) => {
                    const playersCount = Array.isArray(groupe.players) ? groupe.players.length : 0;
                    const row = document.createElement("div");
                    row.className = "row";
                    row.innerHTML = `<p class="row-title">#${groupe.id ?? "-"} - ${groupe.nom ?? "-"}</p><div>${playersCount} player(s) dans ce groupe.</div>`;
                    groupsListEl.appendChild(row);
                });
            }

            playersListEl.innerHTML = "";
            if (!Array.isArray(detail.players) || detail.players.length === 0) {
                playersListEl.innerHTML = "<div class='row'>Aucun player associe.</div>";
            } else {
                detail.players.forEach((player) => {
                    const classes = Array.isArray(player.classes) ? player.classes : [];
                    const classesHtml = classes.length === 0
                        ? "<span>-</span>"
                        : `<div class="badges">${classes.map((classe) =>
                            `<span class="badge">${classe.nom} (${classe.role})</span>`).join("")}</div>`;
                    const row = document.createElement("div");
                    row.className = "row";
                    row.innerHTML = `
                        <p class="row-title">#${player.id ?? "-"} - ${player.nom ?? "-"}</p>
                        ${classesHtml}
                    `;
                    playersListEl.appendChild(row);
                });
            }
        };

        const load = async () => {
            const id = extractActivityId();
            if (!id) {
                statusEl.textContent = "Identifiant d'activite manquant dans l'URL.";
                statusEl.classList.add("error");
                return;
            }

            try {
                const response = await fetch(`/api/activites/${id}/detail`);
                if (!response.ok) {
                    statusEl.textContent = "Activite introuvable.";
                    statusEl.classList.add("error");
                    return;
                }

                const detail = await response.json();
                render(detail);
            } catch (error) {
                statusEl.textContent = "Erreur reseau lors du chargement du detail.";
                statusEl.classList.add("error");
            }
        };

        load();
    }
}

customElements.define("activity-detail-content", ActivityDetailContent);
