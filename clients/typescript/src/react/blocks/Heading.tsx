/** A general block's optional eyebrow and heading. */
export function Heading({
  eyebrow,
  heading,
}: {
  eyebrow?: string | null;
  heading?: string | null;
}) {
  return (
    <>
      {eyebrow && <p className="eyebrow tone-secondary mb-eyebrow">{eyebrow}</p>}
      {heading && <h2 className="title-section">{heading}</h2>}
    </>
  );
}
