const { protocol, hostname, port } = window.location;

export const environment = {
  env: 'dev',
  appUrl: `${protocol}//${hostname}:${port}`,
};
