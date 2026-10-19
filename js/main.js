(function () {
  var dados = window.FOTOS;
  document.documentElement.classList.add("js");

  // ---------- Galeria ----------
  var todas = [];
  dados.ambientes.forEach(function (a) {
    a.fotos.forEach(function (f) {
      todas.push({ src: "fotos/" + a.id + "/" + f[0], w: f[1], h: f[2], ambiente: a.id, nome: a.nome });
    });
  });

  var filters = document.getElementById("filters");
  var gallery = document.getElementById("gallery");
  var visiveis = todas;

  function botao(id, rotulo, ativo) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (ativo ? " is-active" : "");
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", ativo ? "true" : "false");
    b.dataset.filtro = id;
    b.textContent = rotulo;
    return b;
  }

  filters.appendChild(botao("todos", "Todos (" + todas.length + ")", true));
  dados.ambientes.forEach(function (a) {
    filters.appendChild(botao(a.id, a.nome + " (" + a.fotos.length + ")", false));
  });

  function renderGaleria(alvo, lista) {
    alvo.innerHTML = "";
    lista.forEach(function (f, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "shot";
      b.style.animationDelay = Math.min(i * 30, 400) + "ms";
      b.setAttribute("aria-label", "Ampliar foto: " + f.nome);
      var img = document.createElement("img");
      img.src = f.src;
      img.width = f.w;
      img.height = f.h;
      img.alt = f.nome;
      img.loading = "lazy";
      img.decoding = "async";
      b.appendChild(img);
      var tag = document.createElement("span");
      tag.className = "shot-tag";
      tag.textContent = f.nome;
      b.appendChild(tag);
      b.addEventListener("click", function () { abrir(lista, i); });
      alvo.appendChild(b);
    });
  }

  filters.addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    filters.querySelectorAll(".chip").forEach(function (c) {
      c.classList.toggle("is-active", c === b);
      c.setAttribute("aria-selected", c === b ? "true" : "false");
    });
    var f = b.dataset.filtro;
    visiveis = f === "todos" ? todas : todas.filter(function (x) { return x.ambiente === f; });
    renderGaleria(gallery, visiveis);
  });

  renderGaleria(gallery, todas);

  // Área de lazer
  var lazer = dados.lazer.map(function (f) {
    return { src: "fotos/area-comum/" + f[0], w: f[1], h: f[2], nome: "Área de lazer" };
  });
  if (lazer.length) renderGaleria(document.getElementById("galleryLazer"), lazer);

  // ---------- Vídeos do YouTube: miniatura primeiro, player só no clique ----------
  document.querySelectorAll(".yt").forEach(function (box) {
    var id = box.dataset.id, titulo = box.dataset.title || "Vídeo";
    var b = document.createElement("button");
    b.type = "button";
    b.className = "yt-btn";
    b.setAttribute("aria-label", "Assistir: " + titulo);
    b.style.backgroundImage = "url('" + (box.dataset.poster || "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg") + "')";
    b.innerHTML = '<span class="yt-play" aria-hidden="true"></span>' +
      (box.dataset.label ? '<span class="yt-label"></span>' : "");
    if (box.dataset.label) b.querySelector(".yt-label").textContent = box.dataset.label;
    b.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      f.title = titulo;
      f.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      box.replaceChildren(f);
    });
    box.appendChild(b);
  });

  // ---------- Lightbox ----------
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var atual = [], idx = 0, focoAnterior = null;

  function mostrar() {
    lb.classList.toggle("lb--doc", !!atual[idx].doc);
    lb.scrollTop = 0;
    lbImg.src = atual[idx].src;
    lbImg.alt = atual[idx].nome;
    lbCap.textContent = atual[idx].nome + " · " + (idx + 1) + " de " + atual.length;
  }
  function abrir(lista, i) {
    atual = lista; idx = i; focoAnterior = document.activeElement;
    mostrar();
    lb.hidden = false;
    document.body.classList.add("no-scroll");
    document.getElementById("lbClose").focus();
  }
  function fechar() {
    lb.hidden = true;
    document.body.classList.remove("no-scroll");
    if (focoAnterior) focoAnterior.focus();
  }
  function passo(d) { idx = (idx + d + atual.length) % atual.length; mostrar(); }

  document.getElementById("lbClose").addEventListener("click", fechar);
  document.getElementById("lbPrev").addEventListener("click", function () { passo(-1); });
  document.getElementById("lbNext").addEventListener("click", function () { passo(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) fechar(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowLeft") passo(-1);
    if (e.key === "ArrowRight") passo(1);
  });
  var x0 = null;
  lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) passo(dx < 0 ? 1 : -1);
    x0 = null;
  });

  // ---------- Manual: abas PT/EN, ampliar, copiar link ----------
  var paginas = [
    { src: "manual/manual-pt.jpg", nome: "Manual do hóspede — Português", doc: true },
    { src: "manual/manual-en.jpg", nome: "Guest guide — English", doc: true }
  ];
  var abas = [document.getElementById("tabPt"), document.getElementById("tabEn")];
  var paineis = [document.getElementById("manualPt"), document.getElementById("manualEn")];
  abas.forEach(function (aba, i) {
    aba.addEventListener("click", function () {
      abas.forEach(function (a, j) {
        a.classList.toggle("is-active", i === j);
        a.setAttribute("aria-selected", i === j ? "true" : "false");
        paineis[j].hidden = i !== j;
      });
    });
  });
  paineis.forEach(function (p, i) {
    p.addEventListener("click", function () { abrir(paginas, i); });
  });

  var copiar = document.getElementById("copiarLink");
  copiar.addEventListener("click", function () {
    var url = location.origin + location.pathname;
    var ok = function () { copiar.textContent = "Link copiado ✓"; setTimeout(function () { copiar.textContent = "Copiar link"; }, 2200); };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(ok, function () { prompt("Copie o link:", url); });
    else prompt("Copie o link:", url);
  });

  // ---------- Menu lateral ----------
  var sidebar = document.getElementById("sidebar");
  var menuBtn = document.getElementById("menuBtn");
  var scrim = document.getElementById("scrim");

  function menu(aberto) {
    sidebar.classList.toggle("is-open", aberto);
    menuBtn.classList.toggle("is-open", aberto);
    menuBtn.setAttribute("aria-expanded", aberto ? "true" : "false");
    menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    scrim.hidden = !aberto;
  }
  menuBtn.addEventListener("click", function () { menu(!sidebar.classList.contains("is-open")); });
  scrim.addEventListener("click", function () { menu(false); });
  document.querySelectorAll(".nav-link").forEach(function (a) {
    a.addEventListener("click", function () { menu(false); });
  });

  // Destaca a seção visível no menu
  var links = {};
  document.querySelectorAll(".nav-link").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  var spy = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) {
      if (!en.isIntersecting) return;
      Object.keys(links).forEach(function (k) { links[k].classList.toggle("is-active", k === en.target.id); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("[data-section]").forEach(function (s) { spy.observe(s); });

  // Link com âncora (ex.: .../#energia): o navegador rola antes de a galeria
  // ser montada e das fontes chegarem, e a página cresce acima do alvo.
  var mexeu = false;
  ["wheel", "touchmove", "keydown"].forEach(function (ev) {
    window.addEventListener(ev, function () { mexeu = true; }, { once: true, passive: true });
  });
  function irParaAncora() {
    if (mexeu) return;
    var alvo = location.hash && document.getElementById(location.hash.slice(1));
    if (alvo) alvo.scrollIntoView({ behavior: "instant", block: "start" });
  }
  irParaAncora();
  window.addEventListener("load", irParaAncora);
  if (document.fonts) document.fonts.ready.then(irParaAncora);

  // ---------- Animação de entrada ----------
  var reveal = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("is-in"); reveal.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { reveal.observe(el); });
  // Rede de segurança: se o observer não disparar (aba em segundo plano, navegador
  // antigo), nada pode ficar invisível.
  setTimeout(function () {
    document.querySelectorAll(".reveal:not(.is-in)").forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add("is-in");
    });
  }, 900);
})();
