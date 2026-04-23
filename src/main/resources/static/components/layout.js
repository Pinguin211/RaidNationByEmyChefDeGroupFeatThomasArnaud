class AppLayout extends HTMLElement {
    connectedCallback() {
        if (this.shadowRoot) {
            return;
        }

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
            <style>
                :root {
                    font-family: "Segoe UI", Tahoma, sans-serif;
                    color: #0f172a;
                    background: #f1f5f9;
                }

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    min-height: 100vh;
                    background: #f1f5f9;
                }

                .layout-root {
                    display: flex;
                    min-height: 100vh;
                    background:
                        radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.08), transparent 40%),
                        radial-gradient(circle at 80% 0%, rgba(14, 165, 233, 0.08), transparent 35%),
                        #f8fafc;
                }

                .app-bar {
                    width: 260px;
                    background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
                    color: #f8fafc;
                    padding: 28px 18px;
                    border-right: 1px solid #1f2937;
                    min-height: 100vh;
                    position: sticky;
                    top: 0;
                    align-self: flex-start;
                    box-shadow: 8px 0 24px rgba(15, 23, 42, 0.16);
                }

                .app-bar h2 {
                    margin: 0 0 22px 0;
                    font-size: 24px;
                    letter-spacing: 0.4px;
                }

                .app-bar nav {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .app-bar a {
                    color: #bfdbfe;
                    text-decoration: none;
                    font-weight: 600;
                    border-radius: 10px;
                    padding: 10px 12px;
                    transition: background-color 140ms ease-in-out, color 140ms ease-in-out, transform 140ms ease-in-out;
                }

                .app-bar a:hover {
                    background: #1e293b;
                    color: #dbeafe;
                    transform: translateX(2px);
                }

                .app-bar a[aria-current="page"] {
                    background: #2563eb;
                    color: #ffffff;
                }

                .layout-content {
                    flex: 1;
                    padding: 42px 28px;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                }
            </style>
            <div class="layout-root">
                <app-bar></app-bar>
                <main class="layout-content">
                    <slot name="content"></slot>
                </main>
            </div>
        `;
    }
}

customElements.define("app-layout", AppLayout);
