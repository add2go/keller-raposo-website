# Arquitetura de produção proposta

O mockup valida a experiência pública antes do desenvolvimento e da contratação da infraestrutura definitiva. A aplicação de produção será uma etapa própria, com integração real ao CMS, envio de mensagens, controles de acesso e plano de migração.

## Decisões confirmadas

- Idioma: português brasileiro.
- Público e atuação: manter como base o site atual do escritório.
- Identidade: gold substitui o vinho; logotipo e códigos oficiais de cor ainda pendentes.
- CMS: priorizar Sanity.
- Operação editorial: uma pessoa escreve, outra revisa, a pessoa que escreveu publica.
- Domínio atualmente na Locaweb, com possibilidade de reavaliação.
- Investimento e prazo ainda não definidos.
- Esta fase: mockup funcional no GitHub para validação com o cliente.

## Aplicação e entrega de conteúdo

Proposta de produção: Next.js com TypeScript, Sanity Studio separado e hospedagem compatível com uso comercial. O domínio pode permanecer registrado na Locaweb; registro de domínio, hospedagem do site e serviço de e-mail são funções independentes.

O conteúdo institucional, as áreas de atuação, a equipe e as publicações devem ser modelados no Sanity. Templates e componentes controlam apresentação, tipografia e comportamento responsivo. As credenciais de escrita e leitura de rascunhos devem ficar restritas aos ambientes autorizados, sem exposição ao navegador público.

A estratégia de atualização poderá usar o Live Content API, com versões compatíveis de Next.js e next-sanity, ou cache e revalidação por webhooks assinados. Escolher um caminho principal, observar o consumo e testar tanto a publicação quanto a retirada e a alteração de conteúdo. A prévia de rascunhos precisa de autenticação; `noindex` não a protege.

Referências: [integração oficial](https://www.sanity.io/docs/nextjs/introduction) e [alertas de compatibilidade e consumo](https://www.sanity.io/docs/help/nextjs-16-sanitylive-status).

## Modelos do CMS

| Tipo | Campos principais | Uso |
| --- | --- | --- |
| siteSettings | Marca, contatos, unidades, menu, rodapé e metadados padrão | Informações globais |
| page | Título, introdução, imagem e seções com modelos limitados | Home e escritório |
| practiceArea | Nome, slug, descrição, atividades, imagem, equipe e SEO | Áreas de atuação |
| person | Nome, slug, cargo, bio, formação, OAB, foto e áreas | Perfis profissionais e autoria |
| post | Tipo, título, slug, resumo, corpo Portable Text, autores, áreas, assuntos, capa, alt, fontes, datas e SEO | Artigos, análises e notícias |
| subject | Nome e slug | Filtros e organização editorial |
| redirect | Origem, destino e justificativa | Migração e alteração de URLs |

Datas de publicação, atualização e revisão têm significados distintos. O tempo de leitura pode ser calculado. Mudanças de slug em conteúdo publicado exigem redirecionamento. Imagens e arquivos são públicos apenas quando adequados à publicação; o CMS não deve armazenar documentos de clientes ou informações de processos confidenciais.

## Fluxo editorial

1. O autor prepara o rascunho com fontes, autoria, área relacionada e metadados.
2. O revisor analisa conteúdo, referências, datas e adequação jurídica.
3. A revisão fica registrada com responsável, data e observações.
4. O autor confere a prévia e publica a versão revisada.
5. Alterações materiais após a revisão retornam à revisão antes de nova publicação.

O autor precisa de permissão para publicar, conforme o fluxo solicitado. Portanto, dar a ele o papel Contributor, que não publica, não atende sozinho ao processo. No Growth, Editor pode editar e publicar; o revisor também precisa de acesso compatível com as ações que executará. O plano gratuito disponibiliza apenas Administrator e Viewer, e comentários e outros recursos devem ser confirmados no plano escolhido.

Um campo visual de aprovação não equivale a uma barreira de segurança. Uma ação personalizada no Studio pode orientar o processo, mas um bloqueio obrigatório também por API exige uma arquitetura de permissões e/ou um serviço de publicação apropriados. Definir o nível de controle necessário antes de contratar o plano. Não prometer separação rigorosa de poderes só com um status editorial.

Referências: [papéis](https://www.sanity.io/docs/user-guides/roles) e [planos](https://www.sanity.io/pricing).

## Contato e privacidade

Na produção, o formulário deve usar um endpoint de servidor com validação de dados, limitação de requisições, proteção contra abuso e envio ao destino aprovado pelo escritório. Definir acesso, retenção e descarte das mensagens e evitar informações sensíveis desnecessárias no primeiro contato. Não encaminhar contatos ao dataset público do CMS.

A política de privacidade precisa corresponder ao funcionamento real do site, dos provedores e das ferramentas de medição. Recursos externos e cookies devem ser avaliados conforme a implementação adotada. O aviso incluído no mockup descreve somente o mockup.

## Migração e operação

- Inventariar URLs e conteúdos existentes; criar mapa de redirecionamentos 301.
- Preservar os registros de e-mail do domínio, inclusive MX e os registros aplicáveis de SPF, DKIM e DMARC, ao alterar hospedagem ou DNS.
- Validar HTTPS, canonical, metadados, sitemap, robots e páginas de erro.
- Definir propriedade das contas, repositório, acessos, manutenção e backups do conteúdo e dos arquivos.
- Configurar monitoramento, orçamento de consumo, alertas e recuperação de falhas.
- Testar restauração e manter plano de retorno durante a migração.
- Revisar os conteúdos, OAB, imagens e identidade antes do lançamento.

Não há migração do domínio, alteração de DNS, assinatura de plano ou conexão de Sanity executada nesta versão.

## Repositório de revisão

O código é mantido em [diegocgomes/keller-raposo-website](https://github.com/diegocgomes/keller-raposo-website), dedicado a este cliente. O repositório permanece privado até a definição da exposição do ambiente de revisão.

GitHub Actions executa o build e verifica os links em cada push. O job de publicação está condicionado à variável `ENABLE_PAGES=true` e só deve ser habilitado depois de configurar Pages e aprovar a disponibilidade pública da prévia. No plano atual, o GitHub informa que Pages exige repositório público ou atualização de plano.
