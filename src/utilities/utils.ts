export function validateEmail(email: string): boolean {
  if (email?.length === 0) {
    return false;
  }

  const regexString =
    '^[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)*@' +
    '[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)*\\.[a-zA-Z0-9]{1,}$';
  const regex = new RegExp(regexString);

  return regex.test(String(email).toLowerCase());
}
