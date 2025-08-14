import React from 'react';
import { Card as AntCard, type CardProps as AntCardProps } from 'antd';
import { styled } from 'styled-components';

export interface CardProps extends Omit<AntCardProps, 'size' | 'variant'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'small' | 'middle' | 'large';
  hoverable?: boolean;
  children?: React.ReactNode;
}

const StyledCard = styled(AntCard)<CardProps>`
  &.ant-card {
    // Variant styles
    &.variant-elevated {
      box-shadow: var(--ant-box-shadow-base);
      border: none;

      &:hover {
        box-shadow: var(--ant-box-shadow-lg);
      }
    }

    &.variant-outlined {
      border: 1px solid var(--ant-color-border);
      box-shadow: none;

      &:hover {
        border-color: var(--ant-color-primary);
      }
    }

    &.variant-filled {
      background-color: var(--ant-color-fill);
      border: none;
      box-shadow: none;

      &:hover {
        background-color: var(--ant-color-fill-secondary);
      }
    }

    // Size variants
    &.ant-card-small {
      .ant-card-head {
        min-height: 40px;
        padding: 0 12px;

        .ant-card-head-title {
          font-size: 14px;
          line-height: 40px;
        }
      }

      .ant-card-body {
        padding: 12px;
      }
    }

    &.ant-card-large {
      .ant-card-head {
        min-height: 56px;
        padding: 0 24px;

        .ant-card-head-title {
          font-size: 18px;
          line-height: 56px;
        }
      }

      .ant-card-body {
        padding: 24px;
      }
    }

    // Hoverable styles
    &.ant-card-hoverable {
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
      }
    }
  }
`;

const Card: React.FC<CardProps> = ({
  variant = 'default',
  size = 'middle',
  hoverable = false,
  children,
  className,
  ...props
}) => {
  return (
    <StyledCard
      size={size}
      hoverable={hoverable}
      className={`variant-${variant} ${className || ''}`}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

// Export Card components for convenience
export const CardMeta = AntCard.Meta;
export const CardGrid = AntCard.Grid;

export { Card };
