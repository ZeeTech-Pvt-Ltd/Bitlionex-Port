import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import LegalPage from '@/components/LegalPage.jsx'

export const metadata = pageMetadata('terms')

export default function LegalPagePage() {
  return (
    <>
      <JsonLd route="terms" />
      <LegalPage docId="terms" />
    </>
  )
}
