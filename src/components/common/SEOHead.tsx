export default function SEOHead() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "NextGen Computing",
          url: "https://nextgencomputing.co.ke",
          logo: "https://nextgencomputing.co.ke/logo.png",
          description:
            "Buy High Quality PCs, gaming rigs, laptops, and accessories in Kenya.",
        }),
      }}
    />
  );
}
