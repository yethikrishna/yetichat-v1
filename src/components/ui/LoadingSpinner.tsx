/**
 * LoadingSpinner Component - Reusable loading indicator
 */
import { cn } from "../../lib/utils";
import type { LoadingSpinnerProps } from "../../types";

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  className,
  children 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-indigo-600',
    secondary: 'text-purple-600',
    white: 'text-white',
    gray: 'text-gray-600'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-current border-t-transparent",
          sizeClasses[size],
          typeof color === 'string' && color in colorClasses 
            ? colorClasses[color as keyof typeof colorClasses]
            : color
        )}
        style={typeof color === 'string' && !(color in colorClasses) ? { color } : undefined}
      />
      {children && (
        <div className="mt-2 text-sm text-gray-600">
          {children}
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
