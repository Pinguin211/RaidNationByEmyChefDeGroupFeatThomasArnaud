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
                    min-height: 72px;
                    padding: 10px;
                    background: #f8fafc;
                    transition: background-color 120ms ease-in-out, border-color 120ms ease-in-out, transform 120ms ease-in-out;
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
            </style>
            <section class="calendar-card">
                <h2>Prochains 30 jours</h2>
                <p>Calendrier vide pour le moment.</p>
                <div class="days-grid">
                    ${days.map((date) => `
                        <div class="day-cell">
                            <span class="day-label">${formatter.format(date)}</span>
                        </div>
                    `).join("")}
                </div>
            </section>
        `;
    }
}

customElements.define("upcoming-calendar", UpcomingCalendar);
