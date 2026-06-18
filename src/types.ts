/**
 * Shared Type Definitions for Ginet AI Web Portal
 */

export type AppTab = 'ecosystem' | 'solutions' | 'portfolio' | 'contact';

export interface Project {
  id: string;
  title: string;
  category: 'ai' | 'edge' | 'fullstack';
  tags: string[];
  description: string;
  detailedDesc: string;
  metric: string;
  metricLabel: string;
  status: 'operational' | 'optimizing' | 'lab-testing';
  latency?: string;
}

export interface Transmission {
  id: string;
  name: string;
  email: string;
  scope: 'generative-ai' | 'edge-iot' | 'high-performance' | 'fullstack-portal' | 'custom-research';
  message: string;
  timestamp: string;
  status: 'DECRYPTED' | 'AUTHENTICATING' | 'SECURED_LINK' | 'COMPLETED';
  routingNode: string;
}

export interface EngineerStatus {
  name: string;
  role: string;
  status: string;
  color: 'emerald' | 'cyan' | 'amber';
  node: string;
  avatar: string;
}

export interface TelemetryLogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'TRACE' | 'DEBUG' | 'WARN';
  message: string;
}
