import { DATA } from "@/data/resume";

export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Prasenjit Nayak",
          alternateName: ["Prasen", "Star Knight"],
          description: DATA.description,
          image: `${DATA.url}/me.png`,
          url: DATA.url,
          sameAs: [
            DATA.contact.social.GitHub.url,
            DATA.contact.social.LinkedIn.url,
            DATA.contact.social.X.url,
            DATA.contact.social.Youtube.url,
            DATA.contact.social.CodePen.url,
          ],
          jobTitle: "Full Stack Developer",
          worksFor: {
            "@type": "Organization",
            name: "Freelance"
          },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Trident Academy Of Technology"
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Odisha",
            addressCountry: "India"
          },
          email: DATA.contact.email,
          knowsAbout: DATA.skills
        })
      }}
    />
  );
}
