import React from 'react';
import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';
import { styled } from 'styled-components';

export interface ButtonProps extends Omit<AntButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'middle' | 'large';
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const StyledButton = styled(AntButton)<ButtonProps>`
  &.ant-btn {
    // Custom styles based on variant
    &.ant-btn-primary {
      &.variant-secondary {
        background-color: var(--ant-color-success);
        border-color: var(--ant-color-success);

        &:hover {
          background-color: var(--ant-color-success-hover);
          border-color: var(--ant-color-success-hover);
        }
      }

      &.variant-outline {
        background-color: transparent;
        border-color: var(--ant-color-primary);
        color: var(--ant-color-primary);

        &:hover {
          background-color: var(--ant-color-primary);
          border-color: var(--ant-color-primary);
          color: white;
        }
      }

      &.variant-ghost {
        background-color: transparent;
        border-color: transparent;
        color: var(--ant-color-primary);

        &:hover {
          background-color: var(--ant-color-fill);
          border-color: var(--ant-color-fill);
        }
      }

      &.variant-danger {
        background-color: var(--ant-color-error);
        border-color: var(--ant-color-error);

        &:hover {
          background-color: var(--ant-color-error-hover);
          border-color: var(--ant-color-error-hover);
        }
      }
    }

    // Size variants
    &.ant-btn-sm {
      height: 24px;
      padding: 4px 8px;
      font-size: 12px;
    }

    &.ant-btn-lg {
      height: 40px;
      padding: 8px 16px;
      font-size: 16px;
    }

    // Block variant
    &.ant-btn-block {
      width: 100%;
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'middle',
  type = 'primary',
  loading = false,
  disabled = false,
  block = false,
  icon,
  children,
  className,
  ...props
}) => {
  // Map variant to Ant Design button type
  const getButtonType = (): AntButtonProps['type'] => {
    switch (variant) {
      case 'secondary':
        return 'primary';
      case 'outline':
        return 'default';
      case 'ghost':
        return 'text';
      case 'danger':
        return 'primary';
      default:
        return type;
    }
  };

  // Map variant to danger prop
  const isDanger = variant === 'danger';

  return (
    <StyledButton
      type={getButtonType()}
      size={size}
      loading={loading}
      disabled={disabled}
      block={block}
      icon={icon}
      danger={isDanger}
      className={`variant-${variant} ${className || ''}`}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export { Button };
