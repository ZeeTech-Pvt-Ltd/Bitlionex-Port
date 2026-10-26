import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import NotFound from '@/components/NotFound.jsx'

// Next marks a not-found page noindex on its own. Setting robots here as well
// emitted a second robots meta tag on the same page, so only the
// title/description/OG block is taken from the shared config.
const base = pageMetadata('404')
const { robots: _robots, ...metadata } = base
export { metadata }

export default function NotFoundPage() {
  return (
    <>
      <JsonLd route="404" />
      <NotFound />
    </>
  )
}
