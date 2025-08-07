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

export function generateGroups(students: Student[], groupCount: number, dayCount: number): AllDaysGroups {
  const days: AllDaysGroups = [];
  const previousGroups: Set<string>[] = []; // Para detectar repeticiones

  for (let day = 0; day < dayCount; day++) {
    let shuffled = shuffle([...students]);
    let dayGroups: DayGroups = [];

    for (let i = 0; i < groupCount; i++) {
      const group = shuffled.splice(0, Math.floor(students.length / groupCount));
      dayGroups.push(group);
    }

    // Validar que los grupos no se repitan exactamente
    if (!isRepeated(dayGroups, previousGroups)) {
      days.push(dayGroups);
      previousGroups.push(new Set(dayGroups.map(g => g.map(s => s.id).sort().join(','))));
    } else {
      day--; // Reintentar
    }
  }

  return days;
}