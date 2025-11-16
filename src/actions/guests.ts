import { API } from './config';

/**
 * Create a guest id for anonymous users
 * Returns the guestId string on success.
 */
export async function createGuest(): Promise<string> {
  const url = (API as any).guests || `${(API as any).base}/guests`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: ''
  });

  if (!res.ok) {
    throw new Error(`Failed to create guest: ${res.status}`);
  }

  const data = await res.json();
  if (!data || !data.guestId) throw new Error('Invalid guest response');
  return data.guestId as string;
}

export default createGuest;
