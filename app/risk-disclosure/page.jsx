import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import LegalPage from '@/components/LegalPage.jsx'

export const metadata = pageMetadata('risk-disclosure')

export default function LegalPagePage() {
  return (
    <>
      <JsonLd route="risk-disclosure" />
      <LegalPage docId="risk" />
    </>
  )
}
