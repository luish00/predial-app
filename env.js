import app from './app.json';

export const devMode = app.devMode;
export const GOOGLE_MAP_KEY = 'AIzaSyA3MNW0WHEsFJl9htBnsSFyrR5aJ9m9_3Q';
export const URL_BASE = devMode ? 'http://192.168.1.68:8881/api' : '';
