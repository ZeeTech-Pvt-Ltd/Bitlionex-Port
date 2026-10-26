import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import Contact from '@/components/Contact.jsx'

export const metadata = pageMetadata('contact')

export default function ContactPage() {
  return (
    <>
      <JsonLd route="contact" />
      <Contact />
    </>
  )
}
