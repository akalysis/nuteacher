import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mapping Disability Inequality in England | Andrew Kingston",
  description:
    "A short reflection on an interactive Census 2021 map showing how disability prevalence reveals inequality across England.",
};

export default function CensusDisabilityBlogPost() {
  return (
    <article className="blog-article">
      <header className="blog-article-header">
        <Link href="/blog" className="section-pill">
          Back to blog
        </Link>
        <span className="label-tracking">Census 2021</span>
        <h1>Mapping disability inequality across England.</h1>
        <p>
          I built this map because a national disability percentage can sound tidy
          when the reality is anything but. Census 2021 shows a country where the
          likelihood of living with limiting long-term illness or disability is deeply
          patterned by place, age, and the conditions in which people live.
        </p>
        <div className="blog-meta-row">
          <span>Inequality map</span>
          <span>England</span>
          <span>Census 2021</span>
        </div>
      </header>

      <div className="inline-callout blog-project-callout">
        <p>
          Open the project here:{" "}
          <a href="https://census-disability-2021.vercel.app/">
            England Disability Prevalence Map
          </a>
        </p>
      </div>

      <figure className="blog-map-figure">
        <video
          aria-label="Animated 3D map of England showing local authority disability prevalence gaps from the England average."
          autoPlay
          muted
          playsInline
          poster="/census-disability-2021-map.png"
        >
          <source src="/census-disability-2021-map-preview.mp4" type="video/mp4" />
        </video>
        <figcaption>
          The map starts with the gap from the England average, because inequality is
          the story: blue areas sit below the national average, red areas sit above it,
          and taller forms show a larger departure.
        </figcaption>
      </figure>

      <section className="blog-article-section">
        <h2>The inequality is the point</h2>
        <p>
          Disability is often discussed as if it were a single national figure. That
          figure is useful, but it can also hide the most important part of the
          evidence: the unequal distribution. Averages smooth over the fact that some
          places carry far more disability than others, and that those differences are
          not random.
        </p>
        <p>
          Put the data on a map and the national average stops feeling like the whole
          story. Local authorities, regions, and neighbourhood-scale MSOAs reveal a
          geography of unequal burden. Some areas sit close to the England average;
          others are far above or below it. Those gaps matter because they point to
          different local needs, different pressures on families and services, and
          different contexts for interpreting health evidence.
        </p>
      </section>

      <section className="blog-article-section">
        <h2>Designing the map around gaps</h2>
        <p>
          The map uses Census 2021 disability data from Nomis table RM073, combined
          with ONS geography boundaries. It covers 309 local authorities and 6,856
          English MSOAs, so you can move between a broad national pattern and finer
          local texture without changing tools.
        </p>
        <p>
          I designed it around comparison rather than decoration. The default view is
          not just "what is the prevalence here?" but "how far is this place from the
          England average?" That is a small design choice with a big interpretive
          consequence. It keeps inequality in view even when you are inspecting a
          single place.
        </p>
        <p>
          You can still switch to prevalence, move between regions, local authorities,
          and MSOAs, filter by broad age groups, and inspect local figures by hovering
          or clicking. But the ranking and inequality panels keep returning the reader
          to the spread: highest, lowest, and how far apart places are in the current
          view. The map is built to make inequality difficult to miss.
        </p>
      </section>

      <section className="blog-article-section">
        <h2>Why the age filter matters</h2>
        <p>
          Disability and ageing are deeply connected, but they are not the same thing.
          A place can have a high disability prevalence partly because it has an older
          population. Another place may show a concerning pattern among working-age
          adults. If we only look at the all-age figure, we risk mixing together
          demographic structure and underlying health inequality.
        </p>
        <p>
          The age filter is there to slow that down. It lets the reader ask whether a
          pattern is mainly about later life, whether it appears among working-age
          residents too, or whether the local story changes when age is handled more
          carefully. That kind of checking is not a technical extra. It is how we keep
          an inequality story honest.
        </p>
      </section>

      <section className="blog-article-section">
        <h2>What counts as disability in this data?</h2>
        <p>
          Census 2021 asked people about long-term physical or mental health
          conditions or illnesses, and whether these limited their day-to-day
          activities. The ONS disability variable aligns this with the Equality Act
          approach, distinguishing people whose activities are limited a lot, limited a
          little, or not limited in this way.
        </p>
        <p>
          That matters because the map is not a diagnostic atlas and it is not a full
          account of disabled people's lives. It is a population measure based on
          census responses. Used well, it helps us see where limitation in day-to-day
          activities is more common and where local inequalities may need closer
          attention. Used carelessly, it could invite overclaiming. The map is meant
          to encourage the first habit and resist the second.
        </p>
      </section>

      <section className="blog-article-section">
        <h2>Inequality should make us curious</h2>
        <p>
          The best maps do not close a subject down. They open it up. When one place
          has a much higher disability prevalence than another, the next step is not to
          treat the map as the explanation. The next step is to ask what might sit
          underneath the pattern: age structure, deprivation, employment, housing,
          access to care, occupational histories, transport, social support, and the
          long accumulation of advantage or disadvantage.
        </p>
        <p>
          That is where an interactive map earns its keep. It gives students,
          researchers, local analysts, and interested readers a way into the evidence.
          It makes comparison quick enough to be exploratory, but structured enough to
          keep the interpretation grounded. You can start with a national sweep, then
          move down into a place you know and ask whether the pattern feels expected,
          surprising, or in need of a better explanation.
        </p>
      </section>

      <section className="blog-article-section">
        <h2>What I hope people take from it</h2>
        <p>
          I hope the map is useful in a very practical sense: for teaching, for local
          conversations, for methods examples, and for anyone who wants to understand
          how disability varies across England using open public data.
        </p>
        <p>
          But I also hope it does something quieter: I hope it makes the national
          average feel less final. Averages can be helpful, but they can also make
          unequal lives look tidy. The geography matters. The age pattern matters. The
          distance between places matters. And when we can see those differences more
          clearly, we are in a better position to talk about what kind of evidence,
          policy, and local action they call for.
        </p>
      </section>

      <section className="blog-article-section source-note">
        <h2>Sources</h2>
        <ul>
          <li>
            <a href="https://www.nomisweb.co.uk/datasets/c2021rm073">
              Nomis RM073: Disability by sex by age
            </a>
          </li>
          <li>
            <a href="https://www.ons.gov.uk/census/census2021dictionary/variablesbytopic/healthdisabilityandunpaidcarevariablescensus2021/disability">
              ONS Census 2021 dictionary: disability variable
            </a>
          </li>
          <li>
            <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/healthandsocialcare/healthandwellbeing/bulletins/disabilityenglandandwales/census2021">
              ONS: Disability, England and Wales, Census 2021
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}
