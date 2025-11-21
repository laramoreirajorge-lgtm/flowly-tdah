**Flowfly:** A Knowledge Base de TDAHs Produtivos.

https://ibb.co/Tqtnmpvc

O Flowfly é uma base de conhecimento interativa, projetada para ajudar pessoas com Transtorno do Defict de Atenção (TDAH) a superar a procrastinação, a paralisia por análise e a falta de foco. Inspirado em técnicas da neuropsicologia explorados por uma criadora também TDAH e AHSD, o projeto oferece estratégias rápidas e acionáveis para iniciar tarefas, manter a concentração e gerenciar a energia mental ao longo do dia.
A ferramenta foi criada para transformar momentos de bloqueio em ação imediata, fornecendo o "empurrão" de dopamina necessário para começar.

**Funcionalidades Principais**
O projeto é uma aplicação web estática que renderiza as estratégias a partir de um arquivo JSON, com diversas funcionalidades para facilitar a busca pela "carta" perfeita para cada momento:

**Busca Dinâmica:** Pesquise por título ou tags para encontrar uma estratégia específica.
**Tags:** Filtre por categorias como Foco, Iniciação, Calma, Planejamento, etc. É possível combinar múltiplas tags.
**Sistema de Filtros Múltiplos:**
  - **Nível de Dopamina**: Encontre ações com base no potencial de recompensa rápida (de 1 a 5).
  - **Tempo Estimado:** Filtre por atividades curtas, médias ou longas.
**Ordenação Inteligente:** Os resultados são automaticamente ordenados pelo maior nível de dopamina, mostrando primeiro as estratégias com maior potencial de recompensa.
**Pop-up de Ação Rápida**: Ao clicar em um card, um pop-up exibe:
  - **O Primeiro Passo Imediato:** Uma ação simples para quebrar a inércia.
  - **Botão de Copiar:** Copie o primeiro passo para a área de transferência com um único clique.
  - **Checklist:** Um guia passo a passo para executar a estratégia.
**Design Responsivo:** Acesse e utilize a ferramenta em qualquer dispositivo.

**Guia de Uso**
A interface foi pensada para ser simples e intuitiva.

**Navegue pelos Cards:** Role a página para ver as estratégias disponíveis.
**Filtre sua Busca:** Use a barra de pesquisa e os filtros no topo da página para refinar os resultados de acordo com sua necessidade atual. Por exemplo, se estiver com baixa energia e precisando começar uma tarefa, filtre por Iniciação e Baixa Energia.
**Escolha uma Estratégia:** Clique no card que mais lhe agrada.
**Aja Imediatamente:** No pop-up, leia o "Primeiro Passo Imediato", clique no ícone de cópia (content_copy) e cole onde for preciso (um novo arquivo, um chat, etc.) para começar agora mesmo!

**Como o Projeto Funciona (Estrutura Técnica)**
O projeto é construído com tecnologias web fundamentais, sem a necessidade de frameworks complexos, tornando-o leve e fácil de manter.

HTML (index.html): A estrutura semântica da página.
CSS (style.css): Responsável por toda a estilização, incluindo o layout dos cards, o design do pop-up e a responsividade.
JavaScript (script.js): O cérebro da aplicação. Ele é responsável por:
Carregar os dados do arquivo infos.json via fetch.
Renderizar dinamicamente os cards na tela.
Gerenciar toda a lógica de busca, filtragem e ordenação.
Controlar a exibição e interatividade do pop-up de detalhes.
JSON (infos.json): A base de dados que armazena todas as estratégias. A separação dos dados do código facilita a adição, remoção ou edição de cards sem precisar alterar a lógica da aplicação.

**Agradecimentos**
Obrigada por chegar até aqui!
Meu coração TDAH transborda com a ideia de ganhar uma bolsa na FIAP, mas independente disso, já agradeço imensamente ao Gui, Monica e Ahirton por todo o aprendizado compartilhado pela Alura em suas imersões gratuitas.
