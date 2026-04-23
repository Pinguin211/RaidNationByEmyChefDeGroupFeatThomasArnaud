class IndexContent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section class="index-content">
                <h1>Page principale</h1>
                <p>Bienvenue sur la page principale construite avec le layout de base.</p>
                <upcoming-calendar></upcoming-calendar>
            </section>
            <style>
                .index-content {
                    background: #ffffff;
                    border: 1px solid #dbe4ef;
                    border-radius: 16px;
                    padding: 32px;
                    max-width: 860px;
                    width: 100%;
                    box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
                }

                .index-content h1 {
                    margin-top: 0;
                    margin-bottom: 10px;
                    font-size: 32px;
                    color: #0f172a;
                }

                .index-content p {
                    margin: 0;
                    font-size: 17px;
                    line-height: 1.6;
                    color: #334155;
                }
            </style>
        `;
    }
}

customElements.define("index-content", IndexContent);
