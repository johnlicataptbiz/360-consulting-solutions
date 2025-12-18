
export interface AnalysisResult {
  strategy: string;
  operations: string;
  growth: string;
  summary: string;
}

export enum SectionId {
  Home = 'home',
  Clients = 'clients',
  Testimonials = 'testimonials',
  WhatWeDo = 'what-we-do',
  About = 'about',
  Analysis = 'analysis',
  Blog = 'blog',
  Contact = 'contact'
}

export interface Partner {
  name: string;
  logo: string;
  description: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}
