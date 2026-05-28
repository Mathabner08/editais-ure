// ====================================================================
// BANCO DE DADOS LOCAL (ARQUIVO MODELO)
// 
// INSTRUÇÕES: 
// Substitua as informações dos objetos abaixo com os dados reais dos
// novos editais. Mantenha a estrutura { id, assunto, data, arquivoUrl }.
// A paginação fará o resto de forma automática!
// ====================================================================
const dadosPublicacoes = [
    { id: 1, assunto: "EE. 9 DE JULHO", data: "22/05/2026", arquivoUrl: "pdfs/EE_9_DE_JULHO.pdf" },
    { id: 2, assunto: "EE. DOM BOSCO", data: "22/05/2026", arquivoUrl: "pdfs/EE_DOM_BOSCO.pdf" },
    { id: 3, assunto: "EE. HANS WIRTH", data: "22/05/2026", arquivoUrl: "pdfs/EE_HANS_WIRTH.pdf" },
    { id: 4, assunto: "EE. IRALDO ANTONIO MARTINS DE TOLEDO", data: "22/05/2026", arquivoUrl: "pdfs/EE_IRALDO_ANTONIO_MARTINS_DE_TOLEDO.pdf" },
    { id: 5, assunto: "EE. “ENGº ISAC PEREIRA GARCEZ”", data: "22/05/2026", arquivoUrl: "pdfs/EE_ENG_ISAC_PEREIRA_GARCEZ.pdf" },
    { id: 6, assunto: "EE. JACINTO PERNAS GOMATO", data: "22/05/2026", arquivoUrl: "pdfs/EE_JACINTO_PERNAS_GOMATO.pdf" },
    { id: 7, assunto: "EE. JOÃO BERNARDI", data: "22/05/2026", arquivoUrl: "pdfs/EE_JOAO_BERNARDI.pdf" },
    { id: 8, assunto: "EE. JOÃO BRÁSIO", data: "22/05/2026", arquivoUrl: "pdfs/EE_JOAO_BRASIO.pdf" },
    { id: 9, assunto: "EE. PROFESSOR JOEL AGUIAR", data: "22/05/2026", arquivoUrl: "pdfs/EE_PROFESSOR_JOEL_AGUIAR.pdf" },
    { id: 10, assunto: "EE. PROF.ª LÉA APARECIDA VIEIRA GUEDES", data: "22/05/2026", arquivoUrl: "pdfs/EE_PROF_LEA_APARECIDA_VIEIRA_GUEDES.pdf" },
    { id: 11, assunto: "EE. PROFESSORA MARIA APARECIDA LOPES", data: "22/05/2026", arquivoUrl: "pdfs/EE_PROFESSORA_MARIA_APARECIDA_LOPES.pdf" },
    { id: 12, assunto: "EE. PROF. ORLANDO GUIRADO BRAGA", data: "22/05/2026", arquivoUrl: "pdfs/EE_PROF_ORLANDO_GUIRADO_BRAGA.pdf" },
    { id: 13, assunto: "EE. MINISTRO OSCAR PEDROSO HORTA", data: "22/05/2026", arquivoUrl: "pdfs/EE_MINISTRO_OSCAR_PEDROSO_HORTA.pdf" },
    { id: 14, assunto: "EE. DR. PÉRCIO GOMES GONZALES", data: "22/05/2026", arquivoUrl: "pdfs/EE_DR_PERCIO_GOMES_GONZALES.pdf" },
    { id: 15, assunto: "EE. SALVADOR RAMOS DE MOURA PROF. DR. JOSÉ ALVES", data: "22/05/2026", arquivoUrl: "pdfs/EE_SALVADOR_RAMOS_DE_MOURA_PROF.pdf" },
    { id: 16, assunto: "EE. PROFª TAIEKA TAKAHASHI GIMENES", data: "22/05/2026", arquivoUrl: "pdfs/EE_PROF_TAIEKA_TAKAHASHI_GIMENES.pdf" },
    { id: 17, assunto: "EE. PREF. WALDOMIRO SAMPAIO DE SOUZA", data: "22/05/2026", arquivoUrl: "pdfs/EE_PREF_WALDOMIRO_SAMPAIO_DE_SOUZA.pdf" }
];

// ====================================================================
// VARIÁVEIS DE CONTROLE DA PAGINAÇÃO E TABELA
// ====================================================================
const tableBody = document.getElementById('tableBody');
const searchInput = document.getElementById('searchInput');
const paginationContainer = document.getElementById('paginationContainer');

let dadosFiltrados = [...dadosPublicacoes]; // Controla os dados visíveis
let paginaAtual = 1;
const itensPorPagina = 11; 

function atualizarTela() {
    renderizarTabelaPaginada();
    renderizarControlesPaginacao();
}

function renderizarTabelaPaginada() {
    tableBody.innerHTML = "";
    
    if (dadosFiltrados.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: #888; padding: 40px;">Nenhum resultado encontrado para a pesquisa.</td></tr>`;
        return;
    }

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const itensPagina = dadosFiltrados.slice(inicio, fim);

    itensPagina.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.assunto}</td>
            <td class="td-date">${item.data}</td>
            <td class="td-download">
                <a href="${item.arquivoUrl}" download="${item.assunto}.pdf" class="btn-download" title="Baixar Publicação">
                    <i class="fa-solid fa-file-pdf"></i>
                </a>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function renderizarControlesPaginacao() {
    paginationContainer.innerHTML = "";
    
    const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina);
    
    if (totalPaginas <= 1) return;

    const btnVoltar = document.createElement('button');
    btnVoltar.textContent = '<';
    btnVoltar.className = `page-btn page-arrow ${paginaAtual === 1 ? 'disabled' : ''}`;
    btnVoltar.onclick = () => {
        if (paginaAtual > 1) {
            paginaAtual--;
            atualizarTela();
        }
    };
    paginationContainer.appendChild(btnVoltar);

    let paginas = [];
    if (totalPaginas <= 5) {
        for (let i = 1; i <= totalPaginas; i++) paginas.push(i);
    } else {
        if (paginaAtual <= 3) {
            paginas = [1, 2, 3, '...', totalPaginas];
        } else if (paginaAtual >= totalPaginas - 2) {
            paginas = [1, '...', totalPaginas - 2, totalPaginas - 1, totalPaginas];
        } else {
            paginas = [1, '...', paginaAtual - 1, paginaAtual, paginaAtual + 1, '...', totalPaginas];
        }
    }

    paginas.forEach(p => {
        const btn = document.createElement('button');
        if (p === '...') {
            btn.className = 'page-btn page-dots';
            btn.textContent = '...';
            btn.disabled = true;
        } else {
            btn.className = `page-btn page-number ${p === paginaAtual ? 'active' : ''}`;
            btn.textContent = p;
            btn.onclick = () => {
                paginaAtual = p;
                atualizarTela();
            };
        }
        paginationContainer.appendChild(btn);
    });

    const btnAvancar = document.createElement('button');
    btnAvancar.textContent = '>';
    btnAvancar.className = `page-btn page-arrow ${paginaAtual === totalPaginas ? 'disabled' : ''}`;
    btnAvancar.onclick = () => {
        if (paginaAtual < totalPaginas) {
            paginaAtual++;
            atualizarTela();
        }
    };
    paginationContainer.appendChild(btnAvancar);
}

searchInput.addEventListener('input', (e) => {
    const termoBusca = e.target.value.toLowerCase();
    
    dadosFiltrados = dadosPublicacoes.filter(item => {
        return item.assunto.toLowerCase().includes(termoBusca) || 
               item.data.toLowerCase().includes(termoBusca);
    });
    
    paginaAtual = 1; 
    atualizarTela();
});

// ====================================================================
// LÓGICA DE ORDENAÇÃO DE DATA (Crescente / Decrescente)
// ====================================================================
const btnSortData = document.getElementById('btnSortData');
const iconSortData = document.getElementById('iconSortData');
let ordemMaisNovaParaAntiga = true; // Por padrão, do mais novo pro mais antigo

btnSortData.addEventListener('click', () => {
    ordemMaisNovaParaAntiga = !ordemMaisNovaParaAntiga;
    
    dadosFiltrados.sort((a, b) => {
        // Converte as strings "DD/MM/YYYY" para objetos de Data verificáveis
        const [diaA, mesA, anoA] = a.data.split('/');
        const [diaB, mesB, anoB] = b.data.split('/');
        const dataObjetoA = new Date(anoA, mesA - 1, diaA);
        const dataObjetoB = new Date(anoB, mesB - 1, diaB);
        
        if (ordemMaisNovaParaAntiga) {
            return dataObjetoB - dataObjetoA; // Decrescente (Mais nova 1º)
        } else {
            return dataObjetoA - dataObjetoB; // Crescente (Mais antiga 1º)
        }
    });

    // Alterna o ícone de feedback visual
    if (ordemMaisNovaParaAntiga) {
        iconSortData.className = "fa-solid fa-sort-down sort-icon";
    } else {
        iconSortData.className = "fa-solid fa-sort-up sort-icon";
    }

    // Retorna para a página 1 após ordenar
    paginaAtual = 1;
    atualizarTela();
});

// ====================================================================
// CONTROLE DE MENUS E SUBMENUS ACIONADOS POR CLIQUE
// ====================================================================

const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const nestedToggles = document.querySelectorAll('.nested-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        const parent = this.parentElement;
        const menu = parent.querySelector('.dropdown-menu');

        document.querySelectorAll('.dropdown-menu').forEach(m => {
            if (m !== menu) {
                m.classList.remove('show');
                m.parentElement.querySelector('a').classList.remove('active-dropdown');
            }
        });
        
        document.querySelectorAll('.nested-menu').forEach(m => m.classList.remove('show'));

        menu.classList.toggle('show');
        this.classList.toggle('active-dropdown');
    });
});

nestedToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation(); 

        const parent = this.parentElement;
        const menu = parent.querySelector('.nested-menu');

        const parentDropdown = this.closest('.dropdown-menu');
        parentDropdown.querySelectorAll('.nested-menu').forEach(m => {
            if (m !== menu) {
                m.classList.remove('show');
            }
        });

        menu.classList.toggle('show');
    });
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-bar')) {
        document.querySelectorAll('.dropdown-menu, .nested-menu').forEach(menu => menu.classList.remove('show'));
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => toggle.classList.remove('active-dropdown'));
    }
});

// ====================================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ====================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Força a ordenação inicial para organizar do mais novo pro antigo logo de cara
    btnSortData.click(); // Dispara o evento de sort artificialmente para arrumar o array e o ícone
    
    document.querySelectorAll('.dropdown-menu, .nested-menu').forEach(menu => {
        menu.classList.remove('show');
    });
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.classList.remove('active-dropdown');
    });
});