export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  return typeof token === "string" && token.length > 0;
}
