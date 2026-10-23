# Verificação da versão 0.1

Verificação realizada em 23 de outubro de 2026 no Chrome disponibilizado pelo ambiente de trabalho.

## Resultado

- Build estático concluído com 26 páginas de conteúdo e uma página de erro.
- Verificação automatizada de 957 links internos e 91 referências de arquivos, sem caminhos ou âncoras ausentes.
- IDs sem duplicação e diretiva noindex presente nas páginas geradas.
- Imagens da home carregadas sem falhas na observação do navegador.
- Abas de atuação trocam o painel e aceitam navegação com teclado, incluindo End.
- Publicações: paginação, filtro Empresarial com dois resultados, busca sem acentos, estado vazio e limpeza de busca verificados.
- Abertura da página de leitura a partir da listagem verificada.
- Menu móvel: abertura e fechamento com Escape verificados em iframe de 390 px.
- Home e páginas principais Escritório, Atuação, Equipe, Publicações e Contato sem rolagem horizontal na prévia em iframe de 320 px. A área útil medida foi 305 px devido à barra de rolagem do navegador desktop.
- Formulário vazio: erros por campo e foco no primeiro campo inválido verificados.
- Formulário preenchido com dados fictícios: seleção de assunto, validação e mensagem explícita de simulação verificadas. O formulário não envia mensagens.

## Correções durante a verificação

Foram corrigidas as opções do seletor de assunto do formulário e a separação entre palavras em títulos com quebra de linha adaptada ao celular. As verificações de build e links e o fluxo completo do formulário foram repetidos após as correções.

## Limites

Não foram executados testes em dispositivos físicos, Safari ou Firefox. A inspeção responsiva foi feita com iframes de largura controlada no Chrome. Copiar links depende de suporte e permissão de clipboard do navegador, normalmente em HTTPS; há mensagem de alternativa quando indisponível.

O relatório acima descreve a verificação local do mockup. GitHub Actions executa também o build e a verificação de links no repositório remoto. Pages foi configurado para publicar por Actions, com `ENABLE_PAGES=true`; o histórico e o resultado das publicações ficam disponíveis na aba Actions. Sanity, envio real de formulário, domínio e infraestrutura de produção não fazem parte da integração ativa deste mockup.
