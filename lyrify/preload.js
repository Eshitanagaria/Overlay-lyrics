const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Application Configurations
  getSettings: () => ipcRenderer.invoke('get-settings'),
  setSettings: (partial) => ipcRenderer.invoke('set-settings', partial),
  connectSpotify: (clientId) => ipcRenderer.invoke('spotify-connect', clientId),
  disconnectSpotify: () => ipcRenderer.invoke('spotify-disconnect'),
  getSpotifyStatus: () => ipcRenderer.invoke('get-spotify-status'),
  openSpotifyDashboard: () => ipcRenderer.invoke('open-spotify-dashboard'),
  toggleClickThrough: () => ipcRenderer.invoke('toggle-click-through'),
  quitApp: () => ipcRenderer.invoke('quit-app'),
  
  onNowPlaying: (cb) => {
    const subscription = (event, data) => cb(data);
    ipcRenderer.on('now-playing', subscription);
    
    return () => {
      ipcRenderer.removeListener('now-playing', subscription);
    };
  },
});
