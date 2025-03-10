export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Hidayah",
          "url": "https://www.hidayah.co.in",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.hidayah.co.in/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "description": "Chat with an AI Imam for guidance on Islamic education and principles",
        })
      }}
    />
  )
} 