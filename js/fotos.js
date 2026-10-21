// Galeria. Para acrescentar uma foto: salve em fotos/<ambiente>/ e inclua
// [arquivo, largura, altura, legenda opcional] na lista. Largura e altura reservam o espaco da
// foto antes de ela carregar -- sem isso o menu lateral salta para o lugar
// errado enquanto as imagens de cima ainda estao chegando.
window.FOTOS = {
  ambientes: [
    { id: "predio", nome: "Prédio", fotos: [
      ["fachada.jpg", 1018, 1280]
    ]},
    { id: "praia", nome: "Praia de Campas", fotos: [
      ["campas-02.jpg", 960, 1280, "Praia de Campas, em frente ao prédio"],
      ["campas-01.jpg", 960, 1280, "Praia de Campas, Tamandaré"],
      ["campas-igreja-sao-pedro.jpg", 960, 1280, "Igreja de São Pedro, a 150 m do prédio"]
    ]},
    { id: "quarto", nome: "Quarto", fotos: [
      ["foto-15.jpg", 720, 1280],
      ["foto-16.jpg", 720, 1280],
      ["foto-17.jpg", 720, 1280],
      ["foto-18.jpg", 720, 1280],
      ["foto-19.jpg", 720, 1280],
      ["foto-20.jpg", 720, 1280],
      ["foto-21.jpg", 720, 1280],
      ["foto-22.jpg", 720, 1280]
    ]},
    { id: "sala", nome: "Sala e varanda", fotos: [
      ["foto-42.jpg", 1034, 1280, "Bancada para mais comodidade nas refeições"],
      ["foto-24.jpg", 899, 1599],
      ["foto-25.jpg", 899, 1599],
      ["foto-23.jpg", 899, 1599],
      ["foto-26.jpg", 899, 1599],
      ["foto-01.jpg", 899, 1599],
      ["foto-08.jpg", 899, 1599],
      ["foto-40.jpg", 899, 1599],
      ["foto-29.jpg", 899, 1599],
      ["foto-04.jpg", 899, 1599]
    ]},
    { id: "cozinha", nome: "Cozinha", fotos: [
      ["foto-39.jpg", 1599, 899],
      ["foto-30.jpg", 899, 1599],
      ["foto-09.jpg", 899, 1599],
      ["foto-14.jpg", 1280, 720],
      ["foto-10.jpg", 1280, 720],
      ["foto-12.jpg", 1280, 720],
      ["foto-11.jpg", 1280, 720],
      ["foto-13.jpg", 1280, 720],
      ["foto-05.jpg", 1599, 899],
      ["foto-07.jpg", 1599, 899],
      ["foto-03.jpg", 1599, 899],
      ["foto-37.jpg", 1599, 899],
      ["foto-38.jpg", 1599, 899]
    ]},
    { id: "banheiro", nome: "Banheiro", fotos: [
      ["foto-06.jpg", 899, 1599],
      ["foto-33.jpg", 899, 1599],
      ["foto-31.jpg", 899, 1599],
      ["foto-32.jpg", 899, 1599],
      ["foto-02.jpg", 899, 1599]
    ]},
    { id: "decoracao", nome: "Decoração", fotos: [
      ["foto-34.jpg", 899, 1599],
      ["foto-35.jpg", 899, 1599],
      ["foto-36.jpg", 899, 1599],
      ["foto-41.jpg", 899, 1599]
    ]}
  ],
  lazer: [  // mesmo formato, arquivos em fotos/area-comum/
    ["rooftop-01.jpg", 591, 1062, "Vista do rooftop da Praia de Campas, Tamandaré"],
    ["rooftop-02.jpg", 591, 1062, "Piscina do rooftop"]
  ]
};
