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
export function calculateNightShiftMinutes(startTime, endTime, dateString) {
  let start = hourToMin(startTime);
  let end = hourToMin(endTime);
  const weekDay = getWeekday(dateString);

  // Falls Schicht über Mitternacht geht -> end verlängern
  if (end < start) {
    end += 1440;
  }

  const nightPeriods = [
    { start: 1260, end: 1440 }, // 21:00–24:00
    { start: 0, end: 300 },     // 0:00–5:00
  ];

  let nightMinutes = 0;

  // Wochentag prüfen
  if (weekDay !== 6 && weekDay !== 0) {
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
  } else if (weekDay === 6) {
  // Samstag -> nur bis Mitternacht ODER bis Schichtende, je nachdem was früher kommt
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
} else if (weekDay === 0) {
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
    }
  }

  return nightMinutes / 60; // Stunden zurückgeben
}
