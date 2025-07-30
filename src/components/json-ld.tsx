export function JsonLd() {
  const structuredData = [{
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Prasenjit Nayak',
    givenName: 'Prasenjit',
    familyName: 'Nayak',
    url: 'https://prasen.dev',
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Self-Employed'
    },
    sameAs: [
      'https://github.com/Star-Knight',
      'https://www.linkedin.com/in/prasenjit-nayak-1b5b3b1b0/',
      'https://twitter.com/Star_Knight12'
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Full Stack Development'
    ],
    description: 'Prasenjit Nayak is a Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Creating modern web applications with clean, efficient code.'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Prasenjit Nayak',
    url: 'https://prasen.dev',
    description: 'Portfolio and blog of Prasenjit Nayak, Full Stack Developer',
    potentialAction: {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://prasen.dev/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    hasPart: [
      {
        '@type': 'WebPage',
        name: 'Projects',
        description: 'Featured development projects and work',
        url: 'https://prasen.dev/projects'
      },
      {
        '@type': 'WebPage',
        name: 'Blog',
        description: 'Technical articles and tutorials',
        url: 'https://prasen.dev/blog'
      },
      {
        '@type': 'WebPage',
        name: 'Gadgets',
        description: 'Tech gadgets and reviews',
        url: 'https://prasen.dev/gadgets'
      },
      {
        '@type': 'WebPage',
        name: 'CLI',
        description: 'Command line interface projects',
        url: 'https://prasen.dev/cli'
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
