(function () {
  var g = window.GEN, list = document.getElementById('names');
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function one() {
    var a = pick(g.a), b = pick(g.b), a2, b2;
    do { a2 = pick(g.a); } while (a2 === a);
    do { b2 = pick(g.b); } while (b2 === b);
    return pick(g.patterns)
      .replace('{a2}', a2).replace('{b2}', b2)
      .replace('{a}', a).replace('{b}', b).replace('{b}', b2)
      .replace('{c}', g.c.length ? pick(g.c) : '');
  }
  function run() {
    var seen = {}, html = '';
    while (Object.keys(seen).length < 10) seen[one()] = 1;
    for (var n in seen) html += '<li>' + n + '</li>';
    list.innerHTML = html;
  }
  document.getElementById('go').onclick = run;
  run();
})();
