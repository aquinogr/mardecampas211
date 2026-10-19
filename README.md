# Mar de Campas 211

Guia do hóspede do flat Mar de Campas 211, em Tamandaré-PE.
Publicado em https://aquinogr.github.io/mardecampas211/

Site estático (HTML, CSS e JS puros), sem build.

## Acrescentar fotos

1. Salve a foto na pasta do ambiente: `fotos/quarto`, `fotos/sala`, `fotos/cozinha`,
   `fotos/banheiro`, `fotos/decoracao` ou `fotos/area-comum`.
2. Inclua o nome em `js/fotos.js`.

## Privacidade

O repositório é público. A meta `noindex` pede aos buscadores
que não indexem o site, mas qualquer pessoa com o link consegue abri-lo.
Não publique aqui senhas, códigos de acesso ou fotos com números de
identificação.

## Manual do hóspede

As imagens e o PDF em `manual/` são gerados fora deste repositório, por
`MAR DE CAMPAS 211/manual/gerar.py`, a partir de `manual.html`. O script
produz duas versões: a impressa (completa, fica no flat) e a do site, que
omite tudo o que estiver marcado como `privado` (Wi-Fi, telefone, acesso) e
falha se algum desses valores aparecer no PDF publicado.
