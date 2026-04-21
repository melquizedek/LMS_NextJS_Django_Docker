import Cookies from 'js-cookie';

const SESSION_EXPIRY_DAYS = 1;

const COOKIE_OPTIONS = { expires: SESSION_EXPIRY_DAYS } as const;

export const COOKIE_KEYS = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    userProfile: 'userProfile',
} as const;

export interface UserProfile {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    profile: any;
}

export interface AuthSession {
    access: string;
    refresh: string;
    user: UserProfile;
}

export function setSession(session: AuthSession): void {
    console.log('setSession', session )
    Cookies.set(COOKIE_KEYS.accessToken, session.access, COOKIE_OPTIONS);
    Cookies.set(COOKIE_KEYS.refreshToken, session.refresh, COOKIE_OPTIONS);
    Cookies.set(COOKIE_KEYS.userProfile, JSON.stringify(session.user), COOKIE_OPTIONS);
}

export function clearSession(): void {
    Cookies.remove(COOKIE_KEYS.accessToken);
    Cookies.remove(COOKIE_KEYS.refreshToken);
    Cookies.remove(COOKIE_KEYS.userProfile);
}

export function getAccessToken(): string | undefined {
    return Cookies.get(COOKIE_KEYS.accessToken);
}

export function getRefreshToken(): string | undefined {
    return Cookies.get(COOKIE_KEYS.refreshToken);
}

export function getUserProfile(): UserProfile | null {
    const raw = Cookies.get(COOKIE_KEYS.userProfile);
    if (!raw) return null;
    try {
        const user = JSON.parse(raw) as UserProfile;
        if (!user.full_name) {
            user.full_name = `${user.profile.first_name} ${user.profile.last_name}`.trim();
        }
        console.log('getUserProfile', user)
        return user;
    } catch {
        return null;
    }
}

export function getUserDisplayName(profile: UserProfile): string {
    if (profile.full_name) return profile.full_name;
    return `${profile.first_name} ${profile.last_name}`.trim() || profile.email;
}
