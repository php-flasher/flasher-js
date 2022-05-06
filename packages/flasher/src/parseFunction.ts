export function parseFunction(func: any): any {
  if (typeof func !== 'string') {
    return func;
  }

  const match = func.match(/^function(?:.+)?(?:\s+)?\((.+)?\)(?:\s+|\n+)?{(?:\s+|\n+)?((?:.|\n)+)}$/m);

  if (!match) {
    return func;
  }

  const args = match[1]?.split(',').map(arg => arg.trim()) ?? [];
  const body = match[2];

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return new Function(...args, body);
}
