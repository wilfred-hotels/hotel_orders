"use server";

import { API } from './config';
import type { LoginResult } from './types';
import { parseJsonSafe } from './_utils';

export async function authCheck(accessToken: string) {
  console.log("checking the token")
  const res = await fetch(`${API.token_check}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ accessToken })
  });
  if (res.status === 401) {
    "Token expired"
  } else {
    return res.status === 201;
  }
}

export async function authRefresh(refreshToken: string): Promise<{ access_token?: string } | null> {
  console.log("refreshing the token")
  const res = await fetch(`${API.token_refresh}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  if (res.status === 401) return null;
  if (!res.ok) return null;
  return (await parseJsonSafe(res)) as { access_token?: string } | null;
}

export async function login(username: string, password: string, hotelId?: string): Promise<LoginResult> {
  const res = await fetch(API.auth_login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, hotelId }),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) return data as LoginResult;
  return data as LoginResult;
}

export async function register(username: string, password: string, role?: string, hotelId?: string, token?: string): Promise<any> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(API.auth_register, {
    method: 'POST',
    headers,
    body: JSON.stringify({ username, password, role, hotelId }),
  });
  const data = await parseJsonSafe(res);
  if (!res.ok) return data;
  return data;
}
