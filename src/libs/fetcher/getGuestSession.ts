export default async function getGuestSession(token: string): Promise<string> {
  const url = `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${token}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch guest session");
  }
  if (!data.guest_session_id) {
    throw new Error("Guest session ID not found in response");
  }
  return data.guest_session_id;
}
