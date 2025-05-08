export const COLOR_SCHEME = {
  neutral100: '#F9F7ED',
  neutral200: '#F2ECCF',
  neutral300: '#E6D7A2',
  accent100: '#D7BC6D',
  accent200: '#CBA344',
  accent300: '#B68A35',
  primary100: '#92722A',
  primary200: '#7C5E24',
  primary300: '#6C4527',
  primary400: '#5D3B26',
  primary500: '#361E12',
};

export const TASK_STATUSES = [
  { id: 21, label: 'ICP Approval Pending' },
  { id: 23, label: 'ICP Visa Approval Pending' },
  { id: 25, label: 'ICP Visit Check Pending' },
  { id: 27, label: 'ICP Medical Check Pending' },
  { id: 28, label: 'ICP Biometric Check Pending' },
  { id: 29, label: 'ICP Emirates ID Issue Pending' },
];

export const API_BASE_URL = import.meta.env.VITE_BASE_URL as string;
export const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT as string;