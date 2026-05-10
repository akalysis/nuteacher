import LogoConcepts from "@/components/LogoConcepts";

export default function LogoOptionsPage() {
  return (
    <section className="collection-page logo-options-page">
      <div className="section-heading logo-options-heading">
        <span className="label-tracking">Logo concepts</span>
        <h1>Five directions for the site identity.</h1>
        <p>
          These are working logo routes, not final lockups. The strongest direction can
          be refined into the live sidebar logo, favicon, and social preview mark.
        </p>
      </div>

      <LogoConcepts />
    </section>
  );
}
