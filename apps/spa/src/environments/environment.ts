const { protocol, hostname, port } = window.location;

export const environment = {
  env: 'prod',
  appUrl: `${protocol}//${hostname}:${port}`,
  apiUrl: `${protocol}//${hostname}:${port}/api`,
  websocketUrl: `${protocol}//${hostname}:${port}`,
  isThreadMemorized: true,
  isAudioEnabled: true,
  isTranscriptionEnabled: true,
  isAttachmentEnabled: true,
  isRefreshEnabled: true,
  isConfigEnabled: false,
  isAutoOpen: true,
  isStreamingEnabled: true,
};
