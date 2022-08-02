// use localStorage to store the authority info, which might be sent from server in actual project.
export async function getAuthority(): Promise<string> {
  const token = await localStorage.getItem('antd-pro-authority');
  return token || '';
}

export function setAuthority(authority: string): void {
  localStorage.setItem('antd-pro-authority', authority);
}

export function removeAuthority(): void {
  localStorage.removeItem('antd-pro-authority');
}
