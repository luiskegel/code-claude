import type { ComponentProps, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router';
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonStyles';
import { Icon, type IconName } from './Icon';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconEnd?: IconName;
  children?: ReactNode;
}

/** In React 19 ist `ref` ein normales Prop – es wird an das <button> weitergereicht. */
type ButtonProps = CommonProps & ComponentProps<'button'>;

export function Button({
  variant,
  size,
  icon,
  iconEnd,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const iconSize = size === 'sm' ? 16 : 18;
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
      {icon && <Icon name={icon} size={iconSize} />}
      {children}
      {iconEnd && <Icon name={iconEnd} size={iconSize} />}
    </button>
  );
}

type ButtonLinkProps = CommonProps & LinkProps;

/** Navigation, die wie ein Button aussieht – semantisch bleibt es ein Link. */
export function ButtonLink({
  variant,
  size,
  icon,
  iconEnd,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const iconSize = size === 'sm' ? 16 : 18;
  return (
    <Link className={buttonClasses(variant, size, className)} {...rest}>
      {icon && <Icon name={icon} size={iconSize} />}
      {children}
      {iconEnd && <Icon name={iconEnd} size={iconSize} />}
    </Link>
  );
}
