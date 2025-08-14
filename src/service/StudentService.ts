import type { AllDaysGroups, DayGroups, Student } from '../types/Types';

export function shuffle<T>(array: T[]): T[] {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

function isRepeated(groups: DayGroups, previous: Set<string>[]): boolean {
  const current = new Set(groups.map(g => g.map(s => s.id).sort().join(',')));
  
  for (let prev of previous) {
    let same = 0;
    for (let key of current) {
      if (prev.has(key)) same++;
    }
    if (same >= Math.floor(groups.length * 0.8)) {
      return true;
    }
  }
  return false;
}

export function generateGroups(
  students: Student[],
  groupCount: number,
  dayCount: number
): AllDaysGroups {
  if (students.length < groupCount) {
    throw new Error("La cantidad de grupos no puede ser mayor que la cantidad de alumnos.");
  }

  const baseSize  = Math.floor(students.length / groupCount);
  const remainder = students.length % groupCount; 
  
  if (baseSize  === 0) {
    throw new Error("Cada grupo debe tener al menos un alumno.");
  }

  const maxUniqueCombinations = factorial(students.length) / (factorial( baseSize ) ** groupCount );
  if (dayCount > maxUniqueCombinations) {
    throw new Error("No es posible generar tantos días sin repetir grupos.");
  }

  const days: AllDaysGroups = [];
  const previousGroups: Set<string>[] = [];

  for (let day = 0; day < dayCount; day++) {
    let attempts = 0;
    let maxAttempts = 50;
    let validDay = false;

    while (!validDay && attempts < maxAttempts) {
      attempts++;
      const shuffled = shuffle([...students]);
      const dayGroups: DayGroups = [];

      for (let i = 0; i < groupCount; i++) {
        const size = baseSize + (i < remainder ? 1 : 0);
        const group = shuffled.splice(0, size);
        dayGroups.push(group);
      }

      if (!isRepeated(dayGroups, previousGroups)) {
        days.push(dayGroups);
        previousGroups.push(new Set(dayGroups.map(g => g.map(s => s.id).sort().join(','))));
        validDay = true;
      }
    }

    if (!validDay) {
      throw new Error("No se pudieron generar grupos únicos para todos los días.");
    }
  }

  return days;
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
