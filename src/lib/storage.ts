export interface StoredRegistration {
  id: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  name: string;
  email: string;
  department: string;
  eventType: 'technical' | 'cultural' | 'sports';
  qrData?: string;
  qrImageUrl?: string;
  paymentMethod?: 'cash' | 'upi';
}

const REG_KEY = 'registrations';
const EVENTS_KEY = 'events';
const ADMIN_KEY = 'admin_logged_in';

export function readRegistrations(): StoredRegistration[] {
  try {
    const val = localStorage.getItem(REG_KEY);
    return val ? JSON.parse(val) : [];
  } catch {
    return [];
  }
}

export function writeRegistrations(items: StoredRegistration[]) {
  try {
    localStorage.setItem(REG_KEY, JSON.stringify(items));
  } catch {}
}

export function readEvents<T>(fallback: T[]): T[] {
  try {
    const val = localStorage.getItem(EVENTS_KEY);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

export function writeEvents<T>(items: T[]) {
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(items));
  } catch {}
}

export function setAdminLoggedIn(value: boolean) {
  try {
    localStorage.setItem(ADMIN_KEY, value ? '1' : '0');
  } catch {}
}

export function isAdminLoggedIn(): boolean {
  try {
    return localStorage.getItem(ADMIN_KEY) === '1';
  } catch {
    return false;
  }
}

// Waitlist storage
type WaitlistEntry = {
  id: string;
  eventId: string;
  name: string;
  email: string;
  addedAt: number;
};

const WAITLIST_KEY = 'waitlist';

export function readWaitlist(): WaitlistEntry[] {
  try {
    const v = localStorage.getItem(WAITLIST_KEY);
    return v ? JSON.parse(v) : [];
  } catch {
    return [];
  }
}

export function writeWaitlist(items: WaitlistEntry[]) {
  try {
    localStorage.setItem(WAITLIST_KEY, JSON.stringify(items));
  } catch {}
}

export function addToWaitlist(entry: Omit<WaitlistEntry, 'id' | 'addedAt'>) {
  const all = readWaitlist();
  const item: WaitlistEntry = { ...entry, id: `WL-${Date.now()}`, addedAt: Date.now() };
  writeWaitlist([...all, item]);
  return item;
}

export function readWaitlistForEvent(eventId: string) {
  return readWaitlist().filter(w => w.eventId === eventId);
}

