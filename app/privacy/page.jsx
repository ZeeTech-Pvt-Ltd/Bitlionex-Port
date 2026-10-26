import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import LegalPage from '@/components/LegalPage.jsx'

export const metadata = pageMetadata('privacy')

export default function LegalPagePage() {
  return (
    <>
      <JsonLd route="privacy" />
      <LegalPage docId="privacy" />
    </>
  )
}
