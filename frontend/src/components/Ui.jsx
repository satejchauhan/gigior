import { Link } from 'react-router-dom'
import { imgSrc } from '../lib/api'

export function Picture({ src, alt, widths = [480, 800, 1200], sizes = '(max-width: 700px) 100vw, 50vw', eager = false, className }) {
  if (!src) return null
  const srcSet = widths.map((w) => `${imgSrc(src, w)} ${w}w`).join(', ')
  return (
    <img
      className={className}
      src={imgSrc(src, widths[Math.min(1, widths.length - 1)])}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt || ''}
      width={widths[1] || 800}
      height={widths[1] || 800}
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
