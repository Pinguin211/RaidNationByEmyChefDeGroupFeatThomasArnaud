class IndexContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="index-content">
                <h1>Page principale</h1>
                <p>Bienvenue sur la page principale construite avec le layout de base.</p>
            </section>
            <style>
                .layout-root {
                    display: flex;
                    min-height: 100vh;
                }

                .app-bar {
                    width: 260px;
                    background: #111827;
                    color: #f9fafb;
                    padding: 24px 16px;
                }

                .app-bar h2 {
                    margin-top: 0;
                    margin-bottom: 16px;
                    font-size: 22px;
                }

                .app-bar nav {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .app-bar a {
                    color: #93c5fd;
                    text-decoration: none;
                    font-weight: 600;
                }

                .layout-content {
                    flex: 1;
                    padding: 32px;
                }

                .index-content {
                    background: #ffffff;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    padding: 24px;
                    max-width: 760px;
                }

                .index-content h1 {
                    margin-top: 0;
                    margin-bottom: 12px;
                }
            </style>
        `;
    }
}

customElements.define("index-content", IndexContent);
