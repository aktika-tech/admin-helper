(function () {
  var items = [
    ["index.html", "Главная"],
    ["prezentaciavrachi.html", "Врачи"],
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
    if (a.getAttribute("href") === file) {
      a.className = "active";
    }
    nav.appendChild(a);
  });

  var footer = document.createElement("footer");
  footer.textContent = "© Клиника";

  document.body.prepend(nav);
  document.body.append(footer);
})();
