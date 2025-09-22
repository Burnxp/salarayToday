/* 
    Arbeitslohn: 
                    Stunde: 20 €

                    Feinplanzuschlag: x€

                    Samstag ab 12 Uhr                35% (Lohn)
                    Nachtschicht von 21:00 - 5:00    25% (Steuerfrei)
                    Minuten 1260 min - 300 min

                    Feiertag                        175% (125% Steuerfrei)
                    Sonntag                         100% (50% Steuerfrei)

                    Samstag                         25% (Zeitzuschlag)
                    Sonntag                         30% (Zeitzuschlag)
*/

// Seite lädt → Daten wiederherstellen
window.addEventListener("DOMContentLoaded", () => {
  datenLadenPHP();
  clickSchicht();
});

// Variablen:
let stdLohnClass = document.querySelector(".stdLohn");
let workTimeTotal = document.querySelector(".workTimeTotal");
const bruttoNettoLohn = document.querySelector(".bruttoNettoLohn");

workTimeMonth;
stdBrutto;

var factorNetto = 0.64;
let stdNetto = 0;

/* function wertSpeichern(key, elementId){
    const wert = document.getElementById(elementId).value;
    localStorage.setItem(key, wert);
    wertLaden(key);
}

function wertLaden(key) {
    
    const gespeicherterWert = localStorage.getItem(key);
    
    if (key === 'stdLohn'){
        if (gespeicherterWert !== null) {
        stdBrutto = Number(gespeicherterWert);
        stdNetto = stdBrutto * factorNetto;

        // Zuschläge auf aktuellen Stundenlohn umrechnen:
            // Zuschläge werden von Prozent in Euro umgerechnet und auf die 2. Nachkommastelle gerundet!

        saAb12Z = (stdNetto * .35).toFixed(2);
    

        nachtZ = (stdBrutto * .25).toFixed(2);

        soZ = ((stdBrutto * .5) + (stdNetto * .5)).toFixed(2);

        feierTagZ = ((stdBrutto * .5) + (stdNetto * 1.25)).toFixed(2);

        

     // StdLohn in Html hinzufügen:
     
         stdLohnClass.innerHTML = `Stundenlohn: <span>${stdBrutto} €</span> <button onclick=neuEingeben('stdLohnClass')>Std Lohn ändern </button>`;
     
     
    }
    }
    if (key === 'worktimeMonth'){
        workTimeMonth = Number(gespeicherterWert);
        workTimeTotal.innerHTML = `Regelarbeitszeit im Monat: <span>${workTimeMonth} std.</span> <button onclick=neuEingeben('workTimeTotal')>Std im Monat ändern </button>`;
    }
    console.log(key)
    if (gespeicherterWert === null) {
        neuEingeben(key)
    }
  bruttoNettoLohnFunction();
}

function neuEingeben(klasse) {
    console.log(klasse + ' wird aufgerufen')
    if (klasse === 'stdLohnClass'){
        console.log(klasse + ' wird aufgerufen')
    stdLohnClass.innerHTML = '';
    stdLohnClass.innerHTML = `<label for="stdLohn">Stundenlohn (Brutto)</label>
        <input type="number" id="stdLohn" class="inputfeld">
        <button onclick="wertSpeichern('stdLohn', 'stdLohn')">Speichern</button>`
        }
    if (klasse === 'workTimeTotal'){
        console.log(klasse + ' wird aufgerufen')
        workTimeTotal.innerHTML = '';
         workTimeTotal.innerHTML =
        `<label for="stdLohn">Arbeitszeit im Monat:</label>
        <input type="number" id="workTotal" class="inputfeld">
        <button onclick="wertSpeichern('worktimeMonth', 'workTotal')">Speichern</button>`
    }
}

function bruttoNettoLohnFunction(){
    console.log(stdBrutto)
    console.log(workTimeMonth)
    if (stdBrutto !== 0 && workTimeMonth !== 0) {
        bruttoNettoLohn.innerHTML = `Bruttomonatseinkommen: ${(stdBrutto* workTimeMonth).toFixed(2)} € <br> Nettomonatseinkommen ca. ${(stdNetto * workTimeMonth).toFixed(2)} € <span class='small'>ohne Zuschläge!  (Mit dem Factor 0.64 berechnet) </span> <br> Bei 13 Gehältern im Jahr durchschntittlich: ${(stdNetto * workTimeMonth*13/12).toFixed(2)} €.`
    }
} */

// Zuschläge:

// Zuschläge werden von Prozent in Euro umgerechnet und auf die 2. Nachkommastelle gerundet!

let saAb12Z = (stdNetto * 0.35).toFixed(2);

let nachtZ = (stdBrutto * 0.25).toFixed(2);

let soZ = (stdBrutto * 0.5 + stdNetto * 0.5).toFixed(2);

let feierTagZ = (stdBrutto * 0.5 + stdNetto * 1.25).toFixed(2);

// Wochentage:
const weekday = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];
let date = new Date(); // neues Datumsobject
let day = date.getDate(); // Kalendertag
let month = date.getMonth(); // Monat
let wDay = date.getDay(); // Wochentag 0 - 6

// Aktuelles datum im Date Input:
function aktDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const formattedDate = `${yyyy}-${mm}-${dd}`;

  document.getElementById("date").value = formattedDate;
}
aktDate();

// Stunden in Minuten umrechnen:
function timeToMinutes(timeStr) {
  let [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}
// Start- und Endminuten übergeben
function hourToMin(hour) {
  let min = timeToMinutes(hour);
  return min;
}

// Arbeitszeit

let arbeitszeit;
let zeitZuschlagSa;
let zeitZuschlagSo;
let soStd;

let saMiMinutes;
let saMiStd;

let nightMinutes;
let nsStd;
let feiTagStd;

// Zuschläge:

let nachtZuschlag;
let sonntagsZuschlag;
let feiertagsZuschlag;

let feinplanzuschlag = 0;

let datenPHP;

const withPause = document.getElementById("pause");

function feinPlanung() {
  console.log("funktion aufruf");
  let abruf = document.getElementById("feinplanzuschlag");
  if (abruf.checked) {
    console.log("wurde geklickt");
    feinplanzuschlag = 41.55 * factorNetto;
    abruf.checked = false;
  } else {
    console.log("not checked");
    feinplanzuschlag = 0;
  }
}



export function gehalt() {
  //Variablen auf null setzten:
  arbeitszeit = 0;
  soStd = 0;
  saMiStd = 0;
  feiTagStd = 0;

  zeitZuschlagSa = 0;
  zeitZuschlagSo = 0;

  nightMinutes = 0;
  nsStd = 0;

  // Zeitabfrage:
  // Datum:

  let workDayValue = document.getElementById("date").value;
  let workDay = new Date(workDayValue);
  let germanDate = workDay.toLocaleDateString("de-DE");
  // Tagabfrage:
  let weekDay = new Date(workDay).getDay();
  // Startzeit
  let start = document.getElementById("startTime").value;
  // Endzeit
  let end = document.getElementById("endTime").value;
  // Ausgabe
  const output = document.getElementById("output");

  console.log(`${weekday[weekDay]} <br> ${start} <br>   ${end}`);

  /* output.innerHTML += `<p> ${germanDate} <br> ${start}  -  ${end} <br>Gesamtlohn </p>`; */

  let minStart = hourToMin(start);
  let minEnd = hourToMin(end);

  zeitZuschlag(minStart, minEnd, weekDay);
  calculateNightShiftMinutes(minStart, minEnd, weekDay);
  startEndtime(minStart, minEnd, weekDay);
  

  if (weekDay === 6) {
    saMi12(minStart, minEnd);
  }
  if (withPause.checked) {
    pauseAbzug();
  }

  let lohn =
    arbeitszeit * stdNetto +
    soStd * soZ +
    nsStd * nachtZ +
    saMiStd * saAb12Z +
    feiTagStd * feierTagZ +
    feinplanzuschlag;
  let zuschlaegeGES =
    soStd * soZ +
    nsStd * nachtZ +
    saMiStd * saAb12Z +
    feiTagStd * feierTagZ +
    feinplanzuschlag;

  // Zuschlagsvariablen:

  nachtZuschlag = nsStd * nachtZ;
  sonntagsZuschlag = soStd * soZ;
  feiertagsZuschlag = feiTagStd * feierTagZ;
 

  /*         output.innerHTML += lohn.toFixed(2) + ' € Netto'
        output.innerHTML += '<br> Arbeitszeit: ' + arbeitszeit + ' std'
        output.innerHTML += '<br> Zuschlaege: ' + zuschlaege.toFixed(2) + ' € Netto' */

  console.log("Die Arbeitszeit beträgt: " + arbeitszeit + " std");
  console.log("Die Sonntagsstd sind: " + soStd + " std");
  console.log("Die Nachtschicht beträgt: " + nsStd + " std");
  console.log("Die saMiStd beträgt: " + saMiStd + " std");
  console.log("Die Feiertagstd beträgt: " + feiTagStd + " std");
  const id = crypto.randomUUID();



  zeileHinzufuegen(
    germanDate,
      id,
      arbeitszeit,
      zeitZuschlagSa,
      zeitZuschlagSo,
      feinplanzuschlag,
      lohn,
      nachtZuschlag,
      feiertagsZuschlag,
      sonntagsZuschlag,
      zuschlaegeGES
  );
}



// Pause ist hinzugefügt
function calculateNightShiftMinutes(start, end, weekDay) {
  // Wenn Schicht über Mitternacht geht, erweitern wir end
  if (end < start) {
    end += 1440;
  }

  const nightPeriods = [
    { start: 1260, end: 1440 }, // 21:00 – 24:00
    { start: 0, end: 300 }, // 0:00 – 5:00
  ];

  let nightMinutes = 0;

  // Ist es kein Samstag oder Sonntag:
  if (weekDay !== 6 && weekDay !== 0) {
    for (let i = start; i < end; i++) {
      const timeOfDay = i % 1440;
      for (const period of nightPeriods) {
        if (timeOfDay >= period.start && timeOfDay < period.end) {
          nightMinutes++;
          break; // Kein zweites Mal zählen
        }
      }
    }
  }
  if (weekDay === 6) {
    // nur bis Mitternacht zählen
    const endLimit = 1440;
    for (let i = start; i < endLimit; i++) {
      const timeOfDay = i % 1440;
      for (const period of nightPeriods) {
        if (timeOfDay >= period.start && timeOfDay < period.end) {
          nightMinutes++;
          break; // Kein zweites Mal zählen
        }
      }
    }
  }
  if (weekDay === 0) {
    // es ist Sonntag und die Nachtschicht startet erst um 0 Uhr (Montag)
    const loopStart = Math.max(start, 1440);
    for (let i = loopStart; i < end; i++) {
      const timeOfDay = i % 1440;
      for (const period of nightPeriods) {
        if (timeOfDay >= period.start && timeOfDay < period.end) {
          nightMinutes++;
          break;
        }
      }
    }
  }

  nsStd = nightMinutes / 60;
  if (nsStd === NaN) {
    nsStd = 0;
  }
}

// Um für jeden Monat eine eigene Tabelle zu erstellen:
function getMonatsKey(germanDate) {
  const [day, month, year] = germanDate.split(".");
  return `${year}-${month.padStart(2, "0")}`;
}

// Ist die Startzeit größer als die Endzeit? Wird über Mitternacht gearbeitet?
function startEndtime(minStart, minEnd, weekDay) {
  if (minStart > minEnd) {
    console.log("Ja es wird über Mitternacht hinaus gearbeitet");
    // Normale Arbeitszeitberechnen:
    arbeitszeit = (1440 - minStart + minEnd) / 60;
    if (weekDay === 6) {
      console.log("Es wird von Samstag in den Sonntag gearbeitet");

      soStd = minEnd / 60;
    }
 /*    if (weekDay === 0) {
      console.log("Es wird von Sonntag in Montag gearbeitet");
      // Sonntagsstd von Sonntag:
      soStd = (1440 - minStart) / 60;
      // Es muss bis 5:00 also 300 minEnd Nachtzuschlag gezahlt werden
      if (minEnd <= 300) {
        nsStd = minEnd / 60;
        console.log(nsStd);
      } else {
        // Wenn die minEnd größer als 300 ist werden 5std nsStd gezahlt
        nsStd = 300 / 60;
        // Wenn Pause gemacht wurde muss davon wieder eine halbe std nsStd abgezogen werden *****************
      } 
    } else {
      console.log("Es wird nicht in den Sonntag gearbeitet!");
      console.log(weekDay);
    } */
  } else {
    console.log("Es ist der gleiche Tag");
    // Wenn es der gleiche Tag ist wird einfach minEnd von minStart abgezogen
    arbeitszeit = (minEnd - minStart) / 60;

    console.log("Die Arbeitszeit beträgt " + arbeitszeit + " std");

    // ist es Sonntag? Dann gibt es Sonntagszuschlag
    if (weekDay === 0) {
      soStd = arbeitszeit;
      console.log("Die Sonntagsarbeit beträgt " + soStd + " std");
    }
  }
}

// Ist es Samstag nach 12:00 Uhr?
function saMi12(minStart, minEnd) {
  saMiMinutes = 0;

  const saPeriods = [
    { start: 720, end: 1260 }, // 12:00 – 21:00
  ];

  const overlaps = (aStart, aEnd, bStart, bEnd) =>
    aStart < bEnd && aEnd > bStart;

  if (overlaps(minStart, minEnd < minStart ? 1440 : minEnd, 720, 1260)) {
    console.log("Es muss Samstagmittagzuschlag, 35% gezahlt werden");

    // Begrenze Endzeit, wenn Arbeitszeit über Mitternacht geht
    const effectiveEnd = minEnd < minStart ? 1440 : minEnd;

    for (let i = minStart; i < effectiveEnd; i++) {
      const timeOfDay = i % 1440;
      for (const period of saPeriods) {
        if (timeOfDay >= period.start && timeOfDay < period.end) {
          saMiMinutes++;
          break;
        }
      }
    }
  }

  // Wird in den Sonntag reingearbeitet?
  if (minStart > minEnd) {
    console.log("Es wurde von Samstag in den Sonntag gearbeitet");
    // Alle minuten die in dem neuen Zeitraum sind sind Sonntagsminuten d.h. soZuschlag
    soStd = minEnd / 60;
    console.log("Es muss für " + soStd + "std Sonntagszuschlag gezahlt werden");
  }

  saMiStd = saMiMinutes / 60;
  return saMiStd;
}

function zeileHinzufuegen(
  germanDate,
      id,
      arbeitszeit,
      zeitZuschlagSa,
      zeitZuschlagSo,
      feinplanzuschlag,
      lohn,
      nachtZuschlag,
      feiertagsZuschlag,
      sonntagsZuschlag,
      zuschlaegeGES,
      
  speichern = true
) {
  const monatsKey = getMonatsKey(germanDate);
  const tabelle = getOderErstelleTabelle(monatsKey);

 

  const tbody = tabelle.querySelector("tbody");
  /* // USER ID
                                                let user_ID = 2; */
  const zeile = document.createElement("tr");
  zeile.setAttribute("data-id", id);
  zeile.innerHTML = `
        <td>${germanDate}</td>
        <td>${arbeitszeit}</td>
        <td>${zeitZuschlagSa}</td>
        <td>${zeitZuschlagSo}</td>
        <td>${feinplanzuschlag.toFixed(2)}</td>
        <td>${lohn.toFixed(2)}</td>
        <td>${nachtZuschlag.toFixed(2)}</td>
        <td>${feiertagsZuschlag.toFixed(2)}</td>
        <td>${sonntagsZuschlag.toFixed(2)}</td>
        <td>${zuschlaegeGES.toFixed(2)}</td>
        <td><button onclick="loescheEintrag(this, '${id}')">Löschen</button></td>
    `;
  tbody.appendChild(zeile);

  summenAktualisieren(arbeitszeit,
      zeitZuschlagSa,
      zeitZuschlagSo,
      feinplanzuschlag,
      lohn,
      nachtZuschlag,
      feiertagsZuschlag,
      sonntagsZuschlag,
      zuschlaegeGES,monatsKey);

/*   document.getElementById(`teilZuschlaege-${monatsKey}`).textContent = (
    parseFloat(
      document.getElementById(`teilZuschlaege-${monatsKey}`).textContent
    ) +
    zuschlaege / 5 
  ).toFixed(2);*/

  // Speichern
  if (speichern) {
    const daten = JSON.parse(localStorage.getItem("lohnDaten-test5")) || [];
    daten.push({
      id,
      germanDate,
      
      arbeitszeit,
      zeitZuschlagSa,
      zeitZuschlagSo,
      feinplanzuschlag,
      lohn,
      nachtZuschlag,
      feiertagsZuschlag,
      sonntagsZuschlag,
      zuschlaegeGES,
  
    });
    localStorage.setItem("lohnDaten-test", JSON.stringify(daten));
    
  }
}


/* 
// Beispielfunktionsausführung
zeigeStatus("hallo", "red");

function zeigeStatus(nachricht, farbe) {
  const statusBox = document.getElementById("statusmeldung");
  statusBox.textContent = nachricht;
  statusBox.style.color = farbe;

  // Statusmeldung nach 5 Sekunden wieder ausblenden (optional)
  setTimeout(() => {
    statusBox.textContent = "";
  }, 5000);
} */



/* 
    Es müssen Samstag 25 % Zeitzuschlag bezahlt werden
              Sonntag 30 % Zeitzuschlag!


              Welcher Tag ist heute?

                 Ist weekDay === 6 (Samstag)
                 ist weekDay === 0 (Sonntag)

             Wird in 6 oder 0 reingearbeitet??

             Wird in 6 oder 0 rausgearbeitet???
*/

function zeitZuschlag(start, end, weekDay) {
  if (weekDay === 5 && start > end) {
    // es wird von Freitag in den Samstag gearbeitet

    if (withPause.checked) {
      end = abzugZeit(end);
    }

    zeitZuschlagSa = ((end * 0.25) / 60).toFixed(3);
  }
  if (weekDay === 6) {
    if (start < end) {
      // Es ist der gleiche Tag
      if (withPause.checked) {
        end = abzugZeit(end);
      }
      zeitZuschlagSa = ((end - start) * 0.25) / 60;

      console.log(zeitZuschlagSa);
    }
  }
  if (weekDay === 6 && start > end) {
    // es wird von Samstag in den Sonntag gearbeitet

    if (withPause.checked) {
      end = end - 0.5;
      withPause.checked = false;
    }

    zeitZuschlagSa = ((1440 - start) * 0.25) / 60;
    zeitZuschlagSo = (end * 0.3) / 60;
    console.log(zeitZuschlagSa);
    console.log(zeitZuschlagSo);
  }
  if (weekDay === 0) {
    if (start < end) {
      // Es ist der gleiche Tag

      if (withPause.checked) {
        end = abzugZeit(end);
      }

      zeitZuschlagSo = ((end - start) * 0.3) / 60;
      console.log(zeitZuschlagSo);
    }
    if (start > end) {
      // Es wird in den Montag gearbeitet!
      zeitZuschlagSo = ((1440 - start) * 0.3) / 60;
      console.log(zeitZuschlagSo);
    }
  }
  console.log(zeitZuschlagSa);
  console.log(zeitZuschlagSo);
}

function getOderErstelleTabelle(monatsKey) {
  
  let tabelle = document.getElementById(`lohnTabelle-${monatsKey}`);

  if (!tabelle) {
    const container = document.getElementById("tabellenContainer");
    
    const neueTabelle = document.createElement("table");
    neueTabelle.id = `lohnTabelle-${monatsKey}`;
    neueTabelle.classList.add("newtabelle");
    neueTabelle.innerHTML = `
            <caption>Lohnabrechnung für ${monatsKey}</caption>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Arbeitszeit</th>
                <th>Zuschlag Sa (Std)</th>
                <th>Zuschlag So (Std)</th>
                <th>Feinplanz. (€)</th>
                <th>Lohn (€)</th>
                
                <th>Nachtzu (€)</th>
                <th>Feiertagsz. (€)</th>
                <th>Sonntagsz. (€)</th>
                <th>Zuschläge ges. (€)</th>
                 <th>Aktion</th>
              </tr>
            </thead>
            <tbody></tbody>
            <tfoot>
              <tr class='sum'>
                <td>Summe</td>
                <td id="sumZeit-${monatsKey}">0.00</td>
                <td id="sumZeitZuSa-${monatsKey}">0.00</td>
                <td id="sumZeitZuSo-${monatsKey}">0.00</td>
                
                <td id="sumFPlan-${monatsKey}">0.00</td>
                <td id="sumLohn-${monatsKey}">0.00</td>
                <td id="sumNacht-${monatsKey}">0.00</td>
                <td id="sumFeier-${monatsKey}">0.00</td>
                <td id="sumSo-${monatsKey}">0.00</td>
                <td id="sumZuschlaege-${monatsKey}">0.00</td>
                
              </tr>
            </tfoot>
        `;
    container.appendChild(neueTabelle);
    tabelle = neueTabelle;
  }

  return tabelle;
}

// radio Buttons zur schnellen Schichtauswahl
export function clickSchicht() {
  const radios = document.querySelectorAll('input[name="schicht"]');
  const startTime = document.getElementById("startTime");
  const endTime = document.getElementById("endTime");

  const zeiten = {
    frueh: { start: "05:30", ende: "13:45" },
    spaet: { start: "13:30", ende: "21:45" },
    nacht: { start: "21:30", ende: "05:45" },
  };

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const schicht = radio.value;
      if (zeiten[schicht]) {
        startTime.value = zeiten[schicht].start;
        endTime.value = zeiten[schicht].ende;
      }
    });
  });
}

function abzugZeit(wert) {
  // 30 Min abziehen
  wert = wert - 30;
  arbeitszeit = arbeitszeit - 0.5;

  return wert;
}

function pauseAbzug() {
  if (nsStd > 4) {
    nsStd = nsStd - 0.5;
  }

  if (soStd > 4) {
    soStd = soStd - 0.5;
  }

  if (feiTagStd > 4) {
    feiTagStd = feiTagStd - 0.5;
  }

  if (saMiStd > 4) {
    saMiStd = saMiStd - 0.5;
  }

  arbeitszeit = arbeitszeit - 0.5;

  withPause.checked = false;
}







function summenAktualisieren(      arbeitszeit,
      zeitZuschlagSa,
      zeitZuschlagSo,
      feinplanzuschlag,
      lohn,
      nachtZuschlag,
      feiertagsZuschlag,
      sonntagsZuschlag,
      zuschlaegeGES,monatsKey){
    // Summen aktualisieren – IDs sind monatsabhängig
  document.getElementById(`sumZeit-${monatsKey}`).textContent = (
    parseFloat(document.getElementById(`sumZeit-${monatsKey}`).textContent) +
    arbeitszeit
  ).toFixed(2);

  document.getElementById(`sumZeitZuSa-${monatsKey}`).textContent = (
    parseFloat(
      document.getElementById(`sumZeitZuSa-${monatsKey}`).textContent
    ) + zeitZuschlagSa
  ).toFixed(2);

  document.getElementById(`sumZeitZuSo-${monatsKey}`).textContent = (
    parseFloat(
      document.getElementById(`sumZeitZuSo-${monatsKey}`).textContent
    ) + zeitZuschlagSo
  ).toFixed(2);



  document.getElementById(`sumFPlan-${monatsKey}`).textContent = (
    parseFloat(document.getElementById(`sumFPlan-${monatsKey}`).textContent) +
    feinplanzuschlag
  ).toFixed(2)+ ' €';

    document.getElementById(`sumLohn-${monatsKey}`).textContent = (
    parseFloat(document.getElementById(`sumLohn-${monatsKey}`).textContent) +
    lohn
  ).toFixed(2)+ ' €';

  document.getElementById(`sumZuschlaege-${monatsKey}`).textContent = (
    parseFloat(
      document.getElementById(`sumZuschlaege-${monatsKey}`).textContent
    ) + zuschlaegeGES
  ).toFixed(2)+ ' €';
}