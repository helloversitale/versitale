interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * Renders JSON-LD inline so it is present in the prerendered HTML rather than
 * being appended by an effect that only runs after hydration. JSON-LD is valid
 * anywhere in the document, so rendering it in place is fine.
 */
export const StructuredData = ({ data }: StructuredDataProps) => (
  <script
    type="application/ld+json"
    // `<` is escaped so a string in the data can't terminate the script tag.
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, '\u003c'),
    }}
  />
);
