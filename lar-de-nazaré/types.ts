export interface NavItem {
  label: string;
  href: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ChartData {
  name: string;
  value: number;
  color: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}