export function JsonLd() {
  const structuredData = [{
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://prasen.dev/#person',
    name: 'Prasenjit Nayak',
    givenName: 'Prasenjit',
    familyName: 'Nayak',
    url: 'https://prasen.dev',
    image: 'https://prasen.dev/hi.webp',
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    },
    sameAs: [
      'https://github.com/StarKnightt',
      'https://www.linkedin.com/in/prasenjitnayak/',
      'https://twitter.com/Star_Knight12',
      'https://youtube.com/@Star_Knight12',
      'https://codepen.io/StarKnightt'
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Full Stack Development',
      'MongoDB',
      'TailwindCSS'
    ],
    description: 'Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Building modern web applications.'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://prasen.dev/#website',
    name: 'Prasenjit Nayak - Full Stack Developer',
    url: 'https://prasen.dev',
    description: 'Portfolio of Prasenjit Nayak - Full Stack Developer specializing in React, Next.js, and TypeScript',
    publisher: {
      '@id': 'https://prasen.dev/#person'
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
        url: 'https://prasen.dev/projects'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        description: 'Technical articles about web development, React, and software engineering',
        url: 'https://prasen.dev/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Videos',
        description: 'YouTube videos about software development, coding tutorials, and tech',
        url: 'https://prasen.dev/videos'
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Gadgets',
        description: 'Tech setup, PC components, and productivity tools I use daily',
        url: 'https://prasen.dev/gadgets'
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
