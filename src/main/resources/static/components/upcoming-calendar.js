class UpcomingCalendar extends HTMLElement {
    connectedCallback() {
        if (this.shadowRoot) {
            return;
        }

        const shadow = this.attachShadow({ mode: "open" });
        const today = new Date();
        const days = Array.from({ length: 30 }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() + index);
            return date;
        });

        const formatter = new Intl.DateTimeFormat("fr-FR", {
            weekday: "short",
            day: "2-digit",
            month: "2-digit"
        });

        const toDayKey = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-top: 22px;
                }

                .calendar-card {
                    background: #ffffff;
                    border: 1px solid #dbe4ef;
                    border-radius: 16px;
                    padding: 20px;
                    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
                }

                h2 {
                    margin: 0 0 6px 0;
                    color: #0f172a;
                    font-size: 24px;
                }

                p {
                    margin: 0 0 14px 0;
                    color: #475569;
                }

                .days-grid {
                    display: grid;
                    grid-template-columns: repeat(6, minmax(100px, 1fr));
                    gap: 10px;
                }

                .day-cell {
                    border: 1px solid #dbe4ef;
                    border-radius: 10px;
                    min-height: 84px;
                    padding: 10px;
                    background: #f8fafc;
                    transition: background-color 120ms ease-in-out, border-color 120ms ease-in-out, transform 120ms ease-in-out;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .day-cell:hover {
                    background: #dbeafe;
                    border-color: #93c5fd;
                    transform: translateY(-1px);
                }

                .day-label {
                    display: block;
                    font-size: 13px;
                    font-weight: 700;
                    color: #334155;
                }

                .logos-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin-top: 8px;
                }

                .activity-logo {
                    width: 22px;
                    height: 22px;
                    border-radius: 6px;
                    border: 1px solid #cbd5e1;
                    background: #ffffff;
                    padding: 2px;
                    transition: transform 160ms ease-in-out, box-shadow 160ms ease-in-out, border-color 160ms ease-in-out;
                }

                .activity-link {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    text-decoration: none;
                    outline: none;
                }

                .activity-link:hover .activity-logo {
                    transform: rotate(12deg) scale(1.16);
                    border-color: #60a5fa;
                    box-shadow: 0 6px 14px rgba(37, 99, 235, 0.26);
                }

                .activity-link:focus-visible .activity-logo {
                    transform: rotate(12deg) scale(1.16);
                    border-color: #60a5fa;
                    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.26);
                }

                .status {
                    margin: 0 0 14px 0;
                    color: #475569;
                }
            </style>
            <section class="calendar-card">
                <h2>Prochains 30 jours</h2>
                <p id="calendar-status" class="status">Chargement des activites...</p>
                <div class="days-grid">
                    ${days.map((date) => `
                        <div class="day-cell" data-day-key="${toDayKey(date)}">
                            <span class="day-label">${formatter.format(date)}</span>
                            <div class="logos-row"></div>
                        </div>
                    `).join("")}
                </div>
            </section>
        `;

        const statusEl = shadow.querySelector("#calendar-status");
        const dayCells = Array.from(shadow.querySelectorAll(".day-cell"));

        const normalizeActivity = (activity, sourceType) => {
            if (!activity || !activity.horaire) {
                return null;
            }
            const date = new Date(activity.horaire);
            if (Number.isNaN(date.getTime())) {
                return null;
            }

            const kind = sourceType
                || (typeof activity.nbCartes === "number" ? "chasse" : "raid");

            return {
                id: activity.id,
                dayKey: toDayKey(date),
                logo: kind === "chasse" ? "/svg/logo-chasse-tresor.svg" : "/svg/logo-raid.svg",
                label: kind === "chasse" ? "Chasse au tresor" : "Raid"
            };
        };

        const fetchActivities = async () => {
            const merged = [];

            // Endpoint agrégé si disponible.
            try {
                const response = await fetch("/api/activites");
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        data.forEach((item) => {
                            const normalized = normalizeActivity(item);
                            if (normalized) {
                                merged.push(normalized);
                            }
                        });
                        return merged;
                    }
                }
            } catch (error) {
                // Fallback silencieux vers endpoints spécialisés.
            }

            const [raidsResult, chassesResult] = await Promise.allSettled([
                fetch("/api/raids"),
                fetch("/api/chasses")
            ]);

            if (raidsResult.status === "fulfilled" && raidsResult.value.ok) {
                const raids = await raidsResult.value.json();
                if (Array.isArray(raids)) {
                    raids.forEach((item) => {
                        const normalized = normalizeActivity(item, "raid");
                        if (normalized) {
                            merged.push(normalized);
                        }
                    });
                }
            }

            if (chassesResult.status === "fulfilled" && chassesResult.value.ok) {
                const chasses = await chassesResult.value.json();
                if (Array.isArray(chasses)) {
                    chasses.forEach((item) => {
                        const normalized = normalizeActivity(item, "chasse");
                        if (normalized) {
                            merged.push(normalized);
                        }
                    });
                }
            }

            return merged;
        };

        const renderActivities = async () => {
            try {
                const activities = await fetchActivities();
                const activitiesByDay = new Map();

                activities.forEach((activity) => {
                    const list = activitiesByDay.get(activity.dayKey) || [];
                    list.push(activity);
                    activitiesByDay.set(activity.dayKey, list);
                });

                let renderedCount = 0;
                dayCells.forEach((cell) => {
                    const key = cell.getAttribute("data-day-key");
                    const logoRow = cell.querySelector(".logos-row");
                    const dayActivities = activitiesByDay.get(key) || [];

                    logoRow.innerHTML = dayActivities
                        .map((entry) => {
                            if (entry.id == null) {
                                return `<img class="activity-logo" src="${entry.logo}" alt="${entry.label}" title="${entry.label}">`;
                            }
                            return `<a class="activity-link" href="/activite/${entry.id}" title="Ouvrir ${entry.label}">
                                <img class="activity-logo" src="${entry.logo}" alt="${entry.label}">
                            </a>`;
                        })
                        .join("");

                    renderedCount += dayActivities.length;
                });

                if (renderedCount === 0) {
                    statusEl.textContent = "Aucune activite planifiee sur les 30 prochains jours.";
                } else {
                    statusEl.textContent = `${renderedCount} activite(s) planifiee(s) sur les 30 prochains jours.`;
                }
            } catch (error) {
                statusEl.textContent = "Impossible de charger les activites.";
            }
        };

        renderActivities();
    }
}

customElements.define("upcoming-calendar", UpcomingCalendar);
