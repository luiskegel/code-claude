import { useEffect } from 'react'

const SITE = 'Claude Academy'

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(path: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = new URL(path, window.location.origin).toString()
}

/**
 * Setzt Title, Description und Open-Graph-Angaben pro Seite.
 * Bewusst minimal – die Website ist eine Lernplattform, keine SEO-Maschine.
 */
export function Seo({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  useEffect(() => {
    const full = title === SITE ? title : `${title} – ${SITE}`
    document.title = full
    setMeta('description', description)
    setMeta('og:title', full, 'property')
    setMeta('og:description', description, 'property')
    setCanonical(path)
  }, [title, description, path])

  return null
}
