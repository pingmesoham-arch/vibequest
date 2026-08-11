import React from 'react';
import { cn } from '../lib/utils';
import { tokens } from '../styles/tokens';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'medium' | 'dark';
  children: React.ReactNode;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ 
  variant = 'medium', 
  className, 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={cn(
        tokens.colors.glass[variant],
        tokens.effects.blur,
        tokens.effects.shadow,
        'border',
        tokens.colors.border,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
