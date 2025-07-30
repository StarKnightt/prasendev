import { DATA } from "@/data/resume";

export function WebsiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: DATA.name,
          url: DATA.url,
          description: DATA.summary,
          potentialAction: {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${DATA.url}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          sameAs: [
            DATA.contact.social.GitHub.url,
            DATA.contact.social.LinkedIn.url,
            DATA.contact.social.X.url,
          ],
          about: {
            "@type": "Person",
            name: DATA.name,
            url: DATA.url
          }
        })
      }}
    />
  );
}