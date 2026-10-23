# Keller Raposo Advogados

Mockup funcional para validar o design, o conteúdo e a navegação do novo website. A proposta usa gold, grafite, fundos claros e uma composição editorial inspirada na referência Cortiva indicada pelo cliente.

## Executar

Requer Node.js 20 ou superior. Não há dependências npm.

```bash
npm run build
npm run check
npm run dev
```

Abra `http://localhost:3000`. Para uma apresentação orientada, abra `http://localhost:3000/revisao/`. A página de revisão inclui prévia em desktop, tablet, celular e largura de 320 px.

## Páginas e interações

- Início, escritório, áreas de atuação, equipe, publicações e contato.
- Páginas de detalhe para as áreas, os três profissionais informados no site atual e seis exemplos de publicações.
- Menu móvel com navegação por teclado, contenção de foco e fechamento com Escape.
- Abas de atuação na home com controle por teclado.
- Busca, filtros por assunto, paginação e estado sem resultados nas publicações.
- Página de leitura com sumário e compartilhamento por cópia de link.
- Validação de formulário com erros por campo e resultado explícito de simulação.
- Links públicos de telefone, e-mail e localização.

## Conteúdo e limites desta versão

A aplicação é um mockup estático. O Sanity não está conectado e o formulário não envia, registra ou armazena mensagens. Os exemplos editoriais são identificados como demonstrativos. Não há analytics ou pixels de publicidade.

A marca exibida é uma interpretação tipográfica provisória da estrutura do logotipo atual, adaptada à direção gold. O arquivo recebido do site está em `assets/logo-original.png`. A nova marca e o gold oficial serão incorporados quando fornecidos. Os monogramas da equipe reservam espaço para fotografias reais; não foram criados retratos fictícios.

O conteúdo institucional foi adaptado a partir das páginas públicas do site atual. Descrições detalhadas de atuação são propostas de redação e precisam de revisão. Confirmar nomes, cargos, formação e conclusão de cursos, números de inscrição OAB, endereços, telefones, registro da sociedade e presença atual em Brasília antes de qualquer lançamento definitivo.

A navegação agrupa Cível e Contencioso, e Imobiliário e Condominial. As áreas informadas no site anterior permanecem contempladas, sujeitas à validação da organização final.

Todas as páginas possuem `noindex,nofollow`, e `robots.txt` bloqueia rastreamento. Essas configurações evitam indexação voluntária, mas não constituem controle de acesso. A visibilidade do repositório e a disponibilidade pública do ambiente de revisão são decisões separadas.

## Organização do código

```text
src/data.mjs          Conteúdo estruturado e dados demonstrativos
scripts/build.mjs     Componentes e geração das páginas HTML
scripts/check.mjs     Verificação de links, arquivos, IDs e âncoras
assets/styles.css    Sistema visual e layouts responsivos
assets/app.js        Interações no navegador
assets/fonts/        Fontes e licenças
docs/                Arquitetura de produção, fontes e roteiro de revisão
dist/                Resultado gerado pelo build
```

Os links são relativos para funcionar tanto na raiz de um domínio quanto em um subdiretório de GitHub Pages. O projeto pode ser hospedado por qualquer serviço estático que publique o conteúdo de `dist/`. O `404.html` é uma página estática de erro; em hospedagens de subdiretório, o provedor deve configurar seu retorno à raiz correta.

## GitHub Pages

O workflow em `.github/workflows/pages.yml` executa build e verificações e publica o conteúdo de `dist/` via GitHub Actions. A implantação requer habilitar Pages com fonte GitHub Actions nas configurações do repositório e um plano do GitHub compatível com a visibilidade escolhida.

O projeto não contém segredos. O workflow usa somente o `GITHUB_TOKEN` temporário fornecido pelo próprio GitHub. O job de build tem permissão de leitura e o job de publicação recebe as permissões necessárias para Pages.

O build e a verificação executam automaticamente em cada alteração da branch `main`. A publicação fica desativada até que Pages esteja habilitado e a variável de repositório `ENABLE_PAGES` receba o valor `true`. Assim, o repositório pode ser revisado em modo privado sem tentar publicar um ambiente ainda não configurado.

O repositório dedicado é [diegocgomes/keller-raposo-website](https://github.com/diegocgomes/keller-raposo-website). A exposição pública do código, das imagens e do conteúdo demonstrativo foi autorizada em 23 de outubro de 2026. O repositório é público, Pages usa GitHub Actions e `ENABLE_PAGES=true` está configurado. A prévia é destinada à validação com o cliente; o resultado de cada publicação pode ser acompanhado na aba Actions.

## Próxima fase

Após a validação, implementar a aplicação de produção em Next.js com Sanity, conforme `docs/ARQUITETURA.md`. O mockup não presume contratação de hospedagem, alteração de domínio, migração de e-mail ou criação de projeto no CMS.

## Referências

- [Website atual do Keller Raposo](http://www.kellerraposo.com.br/)
- [Referência Cortiva no Dribbble](https://dribbble.com/shots/27814101-Cortiva-Law-Firm-Landing-Page-Design)
- [Sanity com Next.js](https://www.sanity.io/docs/nextjs/introduction)
- [Papéis e permissões no Sanity](https://www.sanity.io/docs/user-guides/roles)
- [Documentação do GitHub Pages](https://docs.github.com/en/pages)

As imagens e os conteúdos de referência estão documentados em `docs/FONTES.md`.
