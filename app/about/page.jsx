import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import About from '@/components/About.jsx'

export const metadata = pageMetadata('about')

export default function AboutPage() {
  return (
    <>
      <JsonLd route="about" />
      <About />
    </>
  )
}
