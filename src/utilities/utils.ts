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

export function isNumber(value: string) {
  if (!value) {
    return false;
  }

  return /\d/.test(value);
}

// separateThousands(1200000) === '1,200,000'
// separateThousands(100000.12) === '100,000.12'
export function toCurrency(value: string | number | undefined | null) {
  if (!value) {
    return '0';
  }

  const [intPart, decimals] = String(value).split('.');
  const formattedInt = intPart.replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
  const formattedDec = decimals ? `.${decimals}` : '';

  return `${formattedInt}${formattedDec}`;
}

export // serializeForUri({ param0: 'value 0', param1: 'value:1' }) ===
// 'param0=value%200&param1=value%3A1'
function serializeForUri(obj = {}) {
  return Object.keys(obj)
    .map((key: string) => `${encodeURI(key)}=${encodeURI(obj[key])}`)
    .join('&');
}