(function () {
  var items = [
    ["index.html", "Главная"],
    ["prezentaciavrachi.html", "Врачи"],
    ["lechenie.html", "Лечение"],
    ["udalenie.html", "Удаление"],
    ["chistka.html", "Гигиена"],
    ["chistka.html#otbelivanie", "Профессиональное отбеливание зубов"],
    ["anestezia.html", "Анестезия и седация"],
    ["narkoz.html", "Лечение во сне"],
    ["breketi.html", "Ортодонтия"],
    ["implantasia.html", "Имплантация"],
    ["protezirovanie.html", "Протезирование"],
    ["ssnimki.html", "Снимки"]
  ];

  var file = location.pathname.split("/").pop() || "index.html";

  var nav = document.createElement("nav");
  items.forEach(function (item) {
    var a = document.createElement("a");
    a.href = item[0];
    a.textContent = item[1];
    var whitening = location.hash === "#otbelivanie";
    var current = file === "chistka.html" ? (whitening ? "chistka.html#otbelivanie" : "chistka.html") : file;
    if (a.getAttribute("href") === current) {
      a.className = "active";
    }
    nav.appendChild(a);
  });

  var footer = document.createElement("footer");
  footer.textContent = "© Клиника";

  document.body.prepend(nav);
  document.body.append(footer);
})();
