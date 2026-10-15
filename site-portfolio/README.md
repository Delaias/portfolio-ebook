# O Próximo Salto — Portfólio Fod@

Página fiel ao Figma K5E3ISNv6mKTEzvzl4WymB, frame 1:2. Os três PNGs originais estão em assets/. Os textos, campos e botão são HTML editável, não uma captura da página. Sora é a fonte do layout.

## Edição para o proprietário
Abra /admin usando a conta ChatGPT autorizada em OWNER_EMAIL (padrão: delaiasdesign@gmail.com). Altere textos, cores, imagens e link do material. A prévia não salva; “Salvar alterações” persiste as mudanças no R2 e atualiza todos os dispositivos. Imagens até 1 MB. Não há senha no código. Caso o e-mail do proprietário no ChatGPT seja diferente, ajuste OWNER_EMAIL pela configuração segura do servidor.

## Captura e Sheets
O formulário pede e-mail e telefone, valida no servidor e registra os dados no R2 antes de liberar o link do Drive. Autorização para novidades é separada e opcional. O ID do envio é preservado para reenvios; nenhum cadastro fica no localStorage. Exportação CSV e lista são limitadas a 500 registros nesta versão de teste; ampliar/paginar antes de uso de volume.

O envio ao Google Sheets DEPENDE de uma implantação do Apps Script da conta proprietária. Código completo em integration/Code.gs; instruções também no painel /admin → Google Sheets. Configure WEBHOOK_TOKEN nas propriedades do script e implante o app. No Sites configure SHEETS_WEBHOOK_URL e SHEETS_WEBHOOK_TOKEN. Nunca publique segredos no GitHub. Não conectar apps de cada visitante: os leads vão à planilha do responsável.

Sem receptor configurado, os dados continuam no servidor e aparecem como pendentes; não se declara o Sheets conectado. Depois de configurar, sincronize pelo painel e valide um cadastro na planilha. O script cria uma planilha privada e evita duplicatas por ID.

## Desenvolvimento no VS Code
Abra esta pasta no VS Code. Edite web/ (HTML, CSS e JS), assets/ e worker/runtime.js. Execute `node scripts/build.mjs` e `node scripts/validate-artifact.mjs`. Para prévia local: `node scripts/preview.mjs`; abra http://127.0.0.1:4173. A prévia usa armazenamento isolado em .local-data/ e identidade simulada APENAS no adaptador local. Não é evidência de autenticação hospedada nem integração Sheets.

## Hospedagem e testes
Sites Worker ESM sem dependências npm; dados em R2 com binding BUCKET. Código hospedado usa identidade confiável do Sites; endpoints administrativos exigem proprietário e mutações verificam origem. Primeira publicação privada para testes. Nunca tornar pública sem conferir autenticação, proteção antispam, recebimento no Sheets e retenção de dados. Limitador em memória é de melhor esforço e não substitui proteção na borda em uma campanha pública.

O repositório de fonte do Sites é independente de um repositório GitHub do usuário. Se não houver integração GitHub disponível, não declarar publicação no GitHub concluída.
