'use client';

import React from 'react';
import { getStatusColor, getStatusLabel } from '@/lib/admin-utils';

interface StatusBadgeProps {
  status: string;
  type?: 'order' | 'review' | 'account';
}

export const StatusBadge = ({ status, type = 'order' }: StatusBadgeProps) => {
  const color = getStatusColor(status, type);
  const label = getStatusLabel(status, type);

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${color}`}>
      {label}
    </span>
  );
};

interface LoadingSpinnerProps {
  text?: string;
}

export const LoadingSpinner = ({ text = 'Đang tải...' }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">{text}</p>
      </div>
    </div>
  );
};

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = ({
  icon,
  title = 'Không có dữ liệu',
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      {icon && <div className="mb-4 text-4xl text-gray-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'yellow';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export const StatsCard = ({ label, value, icon, color = 'blue', trend }: StatsCardProps) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    purple: 'bg-purple-100 text-purple-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}`}
            >
              {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {icon && (
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

interface ActionButtonGroupProps {
  children: React.ReactNode;
  justified?: boolean;
}

export const ActionButtonGroup = ({ children, justified = false }: ActionButtonGroupProps) => {
  return <div className={`flex gap-2 ${justified ? 'justify-end' : ''}`}>{children}</div>;
};

interface FormGroupProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export const FormGroup = ({ label, required, error, children }: FormGroupProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default {
  StatusBadge,
  LoadingSpinner,
  EmptyState,
  StatsCard,
  ActionButtonGroup,
  FormGroup,
};
