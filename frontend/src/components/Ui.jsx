import { Link } from 'react-router-dom'

export function Picture({ src, alt, sizes = '(max-width: 700px) 100vw, 50vw', eager = false, className }) {
  if (!src) return null
  return (
    <img
      className={className}
      src={src}
      sizes={sizes}
      alt={alt || ''}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding={eager ? 'sync' : 'async'}
    />
  )
}

export function Btn({ to, href, fill, light, className = '', children, ...props }) {
  const cls = `btn ${fill ? 'btn--fill' : ''} ${light ? 'btn--light' : ''} ${className}`.trim()
  if (to) return <Link className={cls} to={to} {...props}>{children}</Link>
  if (href) return <a className={cls} href={href} {...props}>{children}</a>
  return <button className={cls} type={props.type || 'button'} {...props}>{children}</button>
}
