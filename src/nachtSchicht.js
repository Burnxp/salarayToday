// Hilfsfunktion: Wochentag (0=Sonntag ... 6=Samstag)
const getWeekday = (dateString) => {
  const date = new Date(dateString);
  return date.getDay();
};
// Hilfsfunktion: Stunden und Minuten in Minuten umrechnen
const hourToMin = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

// Berechnet die Nachtschicht-Minuten
export function calculateNightShiftMinutes(startTime, endTime, dateString, nachtzeitenStart, nachtzeitenEnd, feiertagMorgen) {
  let start = hourToMin(startTime);
  let end = hourToMin(endTime);
  const weekDay = getWeekday(dateString);

  // Falls Schicht über Mitternacht geht -> end verlängern
  if (end < start) {
    end += 1440;
  }

  // Nachtgrenzen aus Einstellungen
  const nachtStart = hourToMin(nachtzeitenStart || "21:00");
  const nachtEnd = hourToMin(nachtzeitenEnd || "05:00");

  // Nacht geht über Mitternacht
  const nightPeriods = [
    { start: nachtStart, end: 1440 },
    { start: 0, end: nachtEnd },
  ];

  let nightMinutes = 0;
if (feiertagMorgen) {
  const endLimit = Math.min(end, 1440);
  for (let i = start; i < endLimit; i++) {
    const timeOfDay = i % 1440;
    for (const period of nightPeriods) {
      if (timeOfDay >= period.start && timeOfDay < period.end) {
        nightMinutes++;
        break;
      }
    }
  }
} else {
  // Wochentag prüfen
  if (weekDay !== 6 && weekDay !== 0) {
    console.log("Normaler Werktag");
    // Normaler Werktag
    for (let i = start; i < end; i++) {
      const timeOfDay = i % 1440;
      for (const period of nightPeriods) {
        if (timeOfDay >= period.start && timeOfDay < period.end) {
          nightMinutes ++;
          break;
        }
      }
    }
  } 
  // ist es Samstag?
  if (weekDay === 6) {
  // Samstag -> nur bis Mitternacht ODER bis Schichtende, je nachdem was früher kommt
  console.log("Samstag");
  const endLimit = Math.min(end, 1440);
  for (let i = start; i < endLimit; i++) {
    const timeOfDay = i % 1440;
    for (const period of nightPeriods) {
      if (timeOfDay >= period.start && timeOfDay < period.end) {
        nightMinutes++;
        break;
      }
    }
  }
} 
  // ist es Sonntag?
if (weekDay === 0) {
  console.log("Sonntag");
    // Sonntag -> Nachtschicht beginnt Montag 0 Uhr
    const loopStart = Math.max(start, 1440);
    for (let i = loopStart; i < end; i++) {
      const timeOfDay = i % 1440;
      for (const period of nightPeriods) {
        if (timeOfDay >= period.start && timeOfDay < period.end) {
          nightMinutes++;
          break;
        }
      }
    } console.log("Night Minutes Sonntag:", nightMinutes);
  }
}
  return nightMinutes / 60; // Stunden zurückgeben

}