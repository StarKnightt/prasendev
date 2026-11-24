import { DATA } from "@/data/resume";

export function JsonLd() {
  const structuredData = [{
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${DATA.url}/#person`,
    name: 'Prasenjit Nayak',
    givenName: 'Prasenjit',
    familyName: 'Nayak',
    url: DATA.url,
    image: `${DATA.url}/prasen.webp`,
    jobTitle: 'Creative Engineer',
    nationality: {
      '@type': 'Country',
      name: 'India'
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Trident Academy of Technology',
      url: 'https://tat.ac.in'
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    },
    sameAs: [
      'https://github.com/StarKnightt',
      'https://www.linkedin.com/in/prasenx/',
      'https://x.com/prasenx',
      'https://youtube.com/@prasendev',
      'https://medium.com/@prasenx',
      'https://www.instagram.com/prasenn_x/',
      'https://codepen.io/StarKnightt',
      'https://learn.prasen.dev'
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Full Stack Development',
      'MongoDB',
      'TailwindCSS',
      'PostgreSQL',
      'REST APIs',
      'AI Integration'
    ],
    knowsLanguage: ['English', 'Hindi', 'Odia'],
    description: 'Creative engineer. Making code alive: games, films and art built with AI.'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${DATA.url}/#website`,
    name: 'Prasenjit Nayak - Creative Engineer',
    url: DATA.url,
    description: 'Portfolio of Prasenjit Nayak, a creative engineer making games, films and art with code and AI',
    publisher: {
      '@id': `${DATA.url}/#person`
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Site Sections',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Projects',
        description: 'Web applications and open source projects built with React, Next.js, and TypeScript',
        url: `${DATA.url}/projects`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        description: 'Technical articles about web development, React, and software engineering',
        url: `${DATA.url}/blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Videos',
        description: 'YouTube videos about software development, coding tutorials, and tech',
        url: `${DATA.url}/videos`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Gadgets',
        description: 'Tech setup, PC components, and productivity tools I use daily',
        url: `${DATA.url}/gadgets`
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Lab',
        description: 'Browser 3D worlds, games and a code-generated trailer built with Claude',
        url: `${DATA.url}/lab`
      }
    ]
  }];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
