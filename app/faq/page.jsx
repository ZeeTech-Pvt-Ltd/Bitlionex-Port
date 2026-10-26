import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import FaqPage from '@/components/FaqPage.jsx'

export const metadata = pageMetadata('faq')

export default function FaqPagePage() {
  return (
    <>
      <JsonLd route="faq" />
      <FaqPage />
    </>
  )
}
