const { protocol, hostname, port } = window.location;

export const environment = {
  env: 'dev',
  appUrl: `${protocol}//${hostname}:${port}`,
  apiUrl: `${protocol}//${hostname}:3000/api`,
  websocketUrl: `${protocol}//${hostname}:3000`,
  isThreadMemorized: true,
  isAudioEnabled: true,
  isTranscriptionEnabled: true,
  isAttachmentEnabled: true,
  isRefreshEnabled: true,
  isConfigEnabled: false,
  isAutoOpen: true,
  isStreamingEnabled: true,
};
