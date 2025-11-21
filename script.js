document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');
    const filtersContainer = document.getElementById('tag-filters-container');
    const campoBusca = document.getElementById('campo-busca');
    let allData = []; // Armazena todos os dados carregados

    // Mapeamento de energia para classes CSS
    const energyClassMap = {
        'Baixa': 'energy-low',
        'Média': 'energy-med',
        'Alta': 'energy-high'
    };

    // Função auxiliar para criar as bolinhas de dopamina (1 a 5)
    function gerarDopaminaHTML(nivel) {
        let html = '<div class="dopamine-meter">';
        for (let i = 1; i <= 5; i++) {
            // Se o índice for menor ou igual ao nível, adiciona a classe 'active'
            const activeClass = i <= nivel ? 'active' : '';
            html += `<div class="dopamine-dot ${activeClass}"></div>`;
        }
        html += '</div>';
        return html;
    }

    /**
     * Cria e exibe um pop-up com os detalhes do verso do card.
     * @param {object} cardData - O objeto de dados do card clicado.
     */
    function showPopup(cardData) {
        // Previne a criação de múltiplos pop-ups
        if (document.querySelector('.popup-overlay')) {
            return;
        }

        const { titulo_acao, conteudo_verso } = cardData;

        const popupOverlay = document.createElement('div');
        popupOverlay.className = 'popup-overlay';

        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';

        popupContent.innerHTML = `
            <button class="popup-close material-symbols-outlined">close</button>
            <h2>${titulo_acao}</h2>
            <div class="popup-section">
                <div class="popup-section-header">
                    <strong>Primeiro Passo Imediato:</strong>
                    <button class="copy-button" title="Copiar para a área de transferência">
                        <span class="material-symbols-outlined">content_copy</span>
                    </button>
                </div>
                <p id="text-to-copy">${conteudo_verso.primeiro_passo_imediato}</p>
            </div>
            <div class="popup-section">
                <strong>Checklist:</strong>
                <ul>
                    ${conteudo_verso.checklist_chunked.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            <div class="popup-footer">
                <a href="#" class="external-link-popup">
                    <span class="material-symbols-outlined">play_circle</span>
                    Assista como fazer
                </a>
            </div>
        `;

        popupOverlay.appendChild(popupContent);
        document.body.appendChild(popupOverlay);

        // Funções para fechar o pop-up
        const closePopup = () => document.body.removeChild(popupOverlay);
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) closePopup();
        });
        popupContent.querySelector('.popup-close').addEventListener('click', closePopup);

        // Lógica para o botão de copiar
        const copyBtn = popupContent.querySelector('.copy-button');
        const textToCopy = popupContent.querySelector('#text-to-copy').textContent;

        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Feedback visual de sucesso
                copyBtn.innerHTML = '<span class="material-symbols-outlined">check</span>';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.innerHTML = '<span class="material-symbols-outlined">content_copy</span>';
                    copyBtn.classList.remove('copied');
                }, 2000); // Volta ao normal após 2 segundos
            }).catch(err => console.error('Falha ao copiar texto: ', err));
        });

        // Adiciona o evento de clique para o link "Assista como fazer"
        const watchLink = popupContent.querySelector('.external-link-popup');
        watchLink.addEventListener('click', (e) => {
            e.preventDefault(); // Previne a navegação do link
            alert('Disponível em breve se eu ganhar a bolsa da FIAP 😊');
        });
    }

    /**
     * Renderiza os cards na tela.
     * @param {Array} data - O array de objetos de card.
     */
    function renderCards(data) {
        cardsContainer.innerHTML = '';
        if (data.length === 0) {
            cardsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">Nenhuma estratégia encontrada com os filtros atuais.</p>';
            return;
        }

        data.forEach(item => {
            const article = document.createElement('article');
            const energyClass = energyClassMap[item.energia_necessaria] || '';
            article.className = `card ${energyClass}`;

            article.innerHTML = `
                <span class="card-icon material-symbols-outlined">${item.icone_visual}</span>
                <h2>${item.titulo_acao}</h2>
                <div class="time-badge">
                    <span class="material-symbols-outlined">timer</span>
                    ${item.tempo_estimado_minutos} min
                </div>
                <div class="tags-container">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="dopamine-label">Nível de Dopamina</div>
                ${gerarDopaminaHTML(item.nivel_dopamina)}
            `;
            cardsContainer.appendChild(article);

            // Adiciona o evento de clique para abrir o pop-up
            article.addEventListener('click', (e) => {
                // Garante que o clique no link externo não abra o pop-up
                if (!e.target.closest('.external-link')) {
                    showPopup(item);
                }
            });
        });
    }

    /**
     * Cria e exibe os botões de filtro com base nas tags disponíveis.
     * @param {Array} data - O array de objetos de card.
     */
    function initializeFilters(data) {
        const allTags = new Set(data.flatMap(item => item.tags));

        allTags.forEach(tag => {
            const filterButton = document.createElement('button');
            filterButton.className = 'filter-tag';
            filterButton.textContent = tag;
            filterButton.addEventListener('click', () => {
                filterButton.classList.toggle('active');
                applyFilters();
            });
            filtersContainer.appendChild(filterButton);
        });
    }

    /**
     * Filtra os cards com base no termo de busca E nas tags ativas.
     */
    function applyFilters() {
        const dopamineFilter = document.getElementById('dopamine-filter').value;
        const tempoFilter = document.getElementById('tempo-filter').value;

        // 1. Obter o termo de busca
        const searchTerm = campoBusca.value.toLowerCase();

        // 2. Obter todas as tags ativas
        const activeTags = new Set();
        document.querySelectorAll('.filter-tag.active').forEach(button => {
            activeTags.add(button.textContent);
        });

        // 3. Filtrar os dados originais
        const filteredData = allData.filter(card => {
            // Verifica a busca por texto
            const matchesSearch = searchTerm === '' ||
                card.titulo_acao.toLowerCase().includes(searchTerm) ||
                card.tags.some(tag => tag.toLowerCase().includes(searchTerm));

            // Verifica se o card possui TODAS as tags ativas
            const matchesTags = activeTags.size === 0 ||
                [...activeTags].every(activeTag => card.tags.includes(activeTag));

            const matchesDopamine = dopamineFilter === '' || card.nivel_dopamina === parseInt(dopamineFilter);

            let matchesTempo = true;
            if (tempoFilter === 'curto') {
                matchesTempo = card.tempo_estimado_minutos < 30;
            } else if (tempoFilter === 'medio') {
                matchesTempo = card.tempo_estimado_minutos >= 30 && card.tempo_estimado_minutos <= 60;
            } else if (tempoFilter === 'longo') {
                matchesTempo = card.tempo_estimado_minutos > 60;
            }

            // O card deve corresponder a AMBOS os critérios
            return matchesSearch && matchesTags && matchesDopamine && matchesTempo;
        });

        filteredData.sort((a, b) => {
            // Ordena os resultados com base no nível de dopamina (maior primeiro)
            return b.nivel_dopamina - a.nivel_dopamina;
        });

        // 4. Renderizar os cards filtrados
        renderCards(filteredData);
    }

    // --- INICIALIZAÇÃO ---

    fetch('infos.json')
        .then(response => response.json())
        .then(data => {
            allData = data;
            renderCards(allData);
            initializeFilters(allData);
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));

    // Adiciona os eventos para disparar a filtragem
    campoBusca.addEventListener('input', applyFilters);

    document.getElementById('dopamine-filter').addEventListener('change', applyFilters);
    document.getElementById('tempo-filter').addEventListener('change', applyFilters);
    // O botão de busca agora é opcional, pois a busca é em tempo real,
    // mas podemos mantê-lo para acessibilidade ou preferência.
    document.getElementById('botao-busca').addEventListener('click', (e) => {
        e.preventDefault(); // Previne o envio de formulário, se houver
        applyFilters();
    });
});