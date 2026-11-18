
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
