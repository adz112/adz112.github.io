document.addEventListener('DOMContentLoaded', function () {

const forma = document.getElementById('kontaktu-forma');

if (!forma) {
console.error('Forma nerasta!');
return;
}

const laukai = forma.querySelectorAll('input');
const siustiBtn = document.getElementById('siusti-btn');
const isvalytiBtn = document.getElementById('isvalyti-btn');
const rezultatas = document.getElementById('formos-rezultatas');

// Validacija
function klaidosTekstas(laukas) {

const reiksme = laukas.value.trim();

if (reiksme === '') {
return 'Šis laukas privalomas';
}

if (laukas.name === 'vardas' || laukas.name === 'pavarde') {
if (!/^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/.test(reiksme)) {
return 'Galima naudoti tik raides';
}
}

if (laukas.name === 'email') {
if (!/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(reiksme)) {
return 'Neteisingas el. pašto formatas';
}
}

if (laukas.name === 'telefonas') {
if (!/^\+370 6\d{2} \d{5}$/.test(reiksme)) {
return 'Formatas: +370 6xx xxxxx';
}
}

if (laukas.classList.contains('vertinimas')) {
const skaicius = Number(reiksme);

if (!Number.isInteger(skaicius) || skaicius < 1 || skaicius > 10) {
return 'Įvertinimas turi būti nuo 1 iki 10';
}
}

return '';
}

// Klaidos rodymas
function rodytiKlaida(laukas) {

const klaida = klaidosTekstas(laukas);

laukas.classList.toggle('neteisingas', klaida !== '');

const klaidosLaukas = laukas.parentElement.querySelector('.klaida-tekstas');

if (klaidosLaukas) {
klaidosLaukas.textContent = klaida;
}

return klaida === '';
}

// Mygtuko aktyvavimas
function atnaujintiMygtuka() {

let viskasGerai = true;

laukai.forEach(function (laukas) {
if (klaidosTekstas(laukas) !== '') {
viskasGerai = false;
}
});

siustiBtn.disabled = !viskasGerai;
}

// Telefono formatavimas
function formatuotiTelefona(laukas) {

let skaiciai = laukas.value.replace(/\D/g, '');

if (skaiciai.startsWith('370')) {
skaiciai = skaiciai.slice(3);
} else if (skaiciai.startsWith('8') || skaiciai.startsWith('0')) {
skaiciai = skaiciai.slice(1);
}

skaiciai = skaiciai.slice(0, 8);

if (skaiciai.length === 0) {
laukas.value = '';
} else if (skaiciai.length <= 3) {
laukas.value = '+370 ' + skaiciai;
} else {
laukas.value = '+370 ' +
skaiciai.slice(0, 3) + ' ' +
skaiciai.slice(3);
}
}

// Laukų tikrinimas realiu laiku
laukai.forEach(function (laukas) {

laukas.addEventListener('input', function () {

if (laukas.name === 'telefonas') {
formatuotiTelefona(laukas);
}

rodytiKlaida(laukas);
atnaujintiMygtuka();

});

});

// Formos siuntimas
forma.addEventListener('submit', function (e) {

e.preventDefault();

let teisinga = true;

laukai.forEach(function (laukas) {
if (!rodytiKlaida(laukas)) {
teisinga = false;
}
});

atnaujintiMygtuka();

if (!teisinga) return;

const duomenys = {
vardas: forma.elements.namedItem('vardas').value.trim(),
pavarde: forma.elements.namedItem('pavarde').value.trim(),
email: forma.elements.namedItem('email').value.trim(),
telefonas: forma.elements.namedItem('telefonas').value.trim(),
adresas: forma.elements.namedItem('adresas').value.trim(),
klausimas1: Number(forma.elements.namedItem('klausimas1').value),
klausimas2: Number(forma.elements.namedItem('klausimas2').value),
klausimas3: Number(forma.elements.namedItem('klausimas3').value)
};

console.log(duomenys);

const vidurkis = (
duomenys.klausimas1 +
duomenys.klausimas2 +
duomenys.klausimas3
) / 3;

rezultatas.innerHTML = '';

Object.entries(duomenys).forEach(function ([raktas, reiksme]) {

const p = document.createElement('p');
p.textContent = raktas + ': ' + reiksme;
rezultatas.appendChild(p);

});

const p = document.createElement('p');
p.className = 'vidurkis';
p.textContent = duomenys.vardas + ' ' +
duomenys.pavarde + ': ' + vidurkis.toFixed(2);

rezultatas.appendChild(p);

});

// Išvalymo mygtukas
isvalytiBtn.addEventListener('click', function () {

forma.reset();

laukai.forEach(function (laukas) {

laukas.classList.remove('neteisingas');

const klaida = laukas.parentElement.querySelector('.klaida-tekstas');

if (klaida) {
klaida.textContent = '';
}

});

rezultatas.innerHTML = '';
siustiBtn.disabled = true;

});

siustiBtn.disabled = true;

});


// 12 LD
document.addEventListener('DOMContentLoaded', function () {

if (!document.getElementById('sarasas-Atlikta')) return;

// 1 – įgūdžių masyvas
const pradiniaiIgudziai = [
{ pavadinimas: 'Elektros tinklų analizė', busena: 'Planuojama', xp: 80, ikona: 'bi-diagram-3' },
{ pavadinimas: 'Energijos kaupimo sistemos', busena: 'Planuojama', xp: 50, ikona: 'bi-battery-charging' },
{ pavadinimas: 'Dažnio keitiklių valdymas', busena: 'Mokomasi', xp: 40, ikona: 'bi-speedometer2' },
{ pavadinimas: 'Išmaniųjų valdiklių konfigūravimas', busena: 'Mokomasi', xp: 70, ikona: 'bi-cpu' },
{ pavadinimas: 'Elektros variklių prijungimas', busena: 'Atlikta', xp: 50, ikona: 'bi-lightning-charge' },
{ pavadinimas: 'Elektros įrangos diagnostika', busena: 'Atlikta', xp: 40, ikona: 'bi-tools' },
{ pavadinimas: 'Valdymo grandinių montavimas', busena: 'Atlikta', xp: 60, ikona: 'bi-broadcast' },
{ pavadinimas: 'Elektros aparatų parinkimas', busena: 'Atlikta', xp: 30, ikona: 'bi-plug' }
];

const busenos = ['Planuojama', 'Mokomasi', 'Atlikta'];

// PAPILDOMA 1 – Local Storage
function ikeltiIgudzius() {
const issaugoti = localStorage.getItem('igudziai');
if (issaugoti) {
return JSON.parse(issaugoti);
}
return pradiniaiIgudziai;
}

function issaugotiIgudzius() {
localStorage.setItem('igudziai', JSON.stringify(igudziai));
}

let igudziai = ikeltiIgudzius();

// 1, 2 – kortelių atvaizdavimas ir būsenos keitimas
function piestiKorteles() {
busenos.forEach(function (busena) {
document.getElementById('sarasas-' + busena).innerHTML = '';
});

igudziai.forEach(function (igudis, indeksas) {
const kortele = document.createElement('div');
kortele.className = 'skill-card';

const ikona = document.createElement('i');
ikona.className = 'bi ' + igudis.ikona;

const turinys = document.createElement('div');

const pavadinimas = document.createElement('h4');
pavadinimas.textContent = igudis.pavadinimas;

const xp = document.createElement('span');
xp.className = 'skill-xp';
xp.textContent = 'XP: ' + igudis.xp;

const pasirinkimas = document.createElement('select');
pasirinkimas.className = 'skill-select';
busenos.forEach(function (busena) {
const variantas = document.createElement('option');
variantas.value = busena;
variantas.textContent = busena;
if (busena === igudis.busena) {
variantas.selected = true;
}
pasirinkimas.appendChild(variantas);
});

pasirinkimas.addEventListener('change', function () {
igudziai[indeksas].busena = pasirinkimas.value;
atnaujintiModuli();
});

turinys.appendChild(pavadinimas);
turinys.appendChild(xp);
turinys.appendChild(pasirinkimas);
kortele.appendChild(ikona);
kortele.appendChild(turinys);

document.getElementById('sarasas-' + igudis.busena).appendChild(kortele);
});
}

// 3 – XP, lygis ir rangas
function skaiciuotiXP() {
let suma = 0;
igudziai.forEach(function (igudis) {
if (igudis.busena === 'Atlikta') {
suma += igudis.xp;
}
});
return suma;
}

function gautiLygi(xp) {
if (xp >= 300) return { lygis: 4, rangas: 'Profesionalas', nuo: 300, iki: 300 };
if (xp >= 150) return { lygis: 3, rangas: 'Specialistas', nuo: 150, iki: 300 };
if (xp >= 50) return { lygis: 2, rangas: 'Praktikantas', nuo: 50, iki: 150 };
return { lygis: 1, rangas: 'Pradedantysis', nuo: 0, iki: 50 };
}

// 3, 4 – informacija ir progreso juosta
function atnaujintiProgresa() {
const xp = skaiciuotiXP();
const lygis = gautiLygi(xp);

document.getElementById('xp-suma').textContent = xp + ' XP';
document.getElementById('xp-lygis').textContent = lygis.lygis;
document.getElementById('xp-rangas').textContent = lygis.rangas;

let procentai = 100;
let tekstas = 'Pasiektas maksimalus lygis (' + xp + ' XP)';
if (lygis.lygis < 4) {
procentai = Math.round((xp - lygis.nuo) / (lygis.iki - lygis.nuo) * 100);
tekstas = 'Pažanga siekiant kito lygio (' + xp + ' / ' + lygis.iki + ' XP)';
}

const juosta = document.getElementById('progreso-juosta');
juosta.style.width = procentai + '%';
juosta.textContent = procentai + '%';
document.getElementById('progreso-tekstas').textContent = tekstas;
}

// 5 – statistika
function atnaujintiStatistika() {
const viso = igudziai.length;
let atlikta = 0;
igudziai.forEach(function (igudis) {
if (igudis.busena === 'Atlikta') {
atlikta++;
}
});
const procentas = Math.round(atlikta / viso * 100);

document.getElementById('stat-viso').textContent = viso;
document.getElementById('stat-atlikta').textContent = atlikta;
document.getElementById('stat-procentas').textContent = procentas + '%';
}

// 7 – viskas atnaujinama kartu
function atnaujintiModuli() {
piestiKorteles();
atnaujintiProgresa();
atnaujintiStatistika();
issaugotiIgudzius();
}

atnaujintiModuli();

});

