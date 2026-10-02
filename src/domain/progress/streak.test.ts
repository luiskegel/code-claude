import { describe, expect, it } from 'vitest';
import { addDays, daysBetween, isValidDateKey, toLocalDateKey } from './dates';
import { EMPTY_STREAK, getActiveStreak, hasPracticedToday, recordPracticeDay } from './streak';

describe('Kalendertage', () => {
  it('bildet lokale Datumsschlüssel', () => {
    expect(toLocalDateKey(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05');
    expect(toLocalDateKey(new Date(2026, 0, 6, 0, 1))).toBe('2026-01-06');
  });

  it('berechnet Tagesdifferenzen über Monats- und Jahresgrenzen', () => {
    expect(daysBetween('2026-01-31', '2026-02-01')).toBe(1);
    expect(daysBetween('2025-12-31', '2026-01-01')).toBe(1);
    expect(daysBetween('2028-02-28', '2028-03-01')).toBe(2); // Schaltjahr
    expect(daysBetween('2026-03-10', '2026-03-03')).toBe(-7);
  });

  it('ist unabhängig von Sommer- und Winterzeit', () => {
    // Zeitumstellung in Deutschland: 29.03.2026 und 25.10.2026
    expect(daysBetween('2026-03-28', '2026-03-29')).toBe(1);
    expect(daysBetween('2026-03-29', '2026-03-30')).toBe(1);
    expect(daysBetween('2026-10-24', '2026-10-26')).toBe(2);
  });

  it('validiert Datumsschlüssel', () => {
    expect(isValidDateKey('2026-02-28')).toBe(true);
    expect(isValidDateKey('2026-02-30')).toBe(false);
    expect(isValidDateKey('2026-2-3')).toBe(false);
    expect(isValidDateKey(42)).toBe(false);
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });
});

describe('Streak', () => {
  it('startet mit der ersten Übung bei 1', () => {
    expect(recordPracticeDay(EMPTY_STREAK, '2026-05-01')).toEqual({
      current: 1,
      longest: 1,
      lastPracticeDate: '2026-05-01',
    });
  });

  it('zählt mehrere Übungen am selben Tag nur einmal', () => {
    const first = recordPracticeDay(EMPTY_STREAK, '2026-05-01');
    expect(recordPracticeDay(first, '2026-05-01')).toBe(first);
  });

  it('erhöht sich an aufeinanderfolgenden Tagen', () => {
    let streak = EMPTY_STREAK;
    for (const day of ['2026-05-30', '2026-05-31', '2026-06-01', '2026-06-02']) {
      streak = recordPracticeDay(streak, day);
    }
    expect(streak.current).toBe(4);
    expect(streak.longest).toBe(4);
  });

  it('beginnt nach einer Lücke neu und merkt sich den Rekord', () => {
    let streak = recordPracticeDay(EMPTY_STREAK, '2026-05-01');
    streak = recordPracticeDay(streak, '2026-05-02');
    streak = recordPracticeDay(streak, '2026-05-03');
    streak = recordPracticeDay(streak, '2026-05-05');
    expect(streak.current).toBe(1);
    expect(streak.longest).toBe(3);
  });

  it('behandelt Mitternacht korrekt: 23:59 und 00:01 sind zwei Tage', () => {
    const evening = toLocalDateKey(new Date(2026, 4, 1, 23, 59, 30));
    const night = toLocalDateKey(new Date(2026, 4, 2, 0, 0, 30));
    let streak = recordPracticeDay(EMPTY_STREAK, evening);
    streak = recordPracticeDay(streak, night);
    expect(streak.current).toBe(2);
  });

  it('ignoriert Daten in der Vergangenheit (z. B. zurückgestellte Uhr)', () => {
    const streak = recordPracticeDay(recordPracticeDay(EMPTY_STREAK, '2026-05-10'), '2026-05-11');
    expect(recordPracticeDay(streak, '2026-05-09')).toBe(streak);
  });

  it('gilt bis zum Ende des Folgetags und verfällt danach', () => {
    const streak = { current: 5, longest: 7, lastPracticeDate: '2026-05-10' };
    expect(getActiveStreak(streak, '2026-05-10')).toBe(5);
    expect(getActiveStreak(streak, '2026-05-11')).toBe(5);
    expect(getActiveStreak(streak, '2026-05-12')).toBe(0);
    expect(getActiveStreak(EMPTY_STREAK, '2026-05-12')).toBe(0);
    expect(hasPracticedToday(streak, '2026-05-10')).toBe(true);
    expect(hasPracticedToday(streak, '2026-05-11')).toBe(false);
  });
});
