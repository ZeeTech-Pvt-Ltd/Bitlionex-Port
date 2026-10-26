import { pageMetadata } from '@/lib/metadata.js'
import JsonLd from '@/components/JsonLd.jsx'
import ThankYou from '@/components/ThankYou.jsx'

export const metadata = pageMetadata('thank-you')

export default function ThankYouPage() {
  return (
    <>
      <JsonLd route="thank-you" />
      <ThankYou />
    </>
  )
}
