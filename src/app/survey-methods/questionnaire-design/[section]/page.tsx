import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "../page.module.css";
import { getQuestionnaireSectionHtml } from "../content";
import { questionnaireDesignOutline } from "../outline";

const allSections = questionnaireDesignOutline;

export function generateStaticParams() {
  return allSections.map((item) => ({ section: item.id }));
}

export default async function QuestionnaireDesignSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const content = await getQuestionnaireSectionHtml(section);
  const currentIndex = allSections.findIndex((item) => item.id === section);
  const previousSection = currentIndex > 0 ? allSections[currentIndex - 1] : null;
  const nextSection =
    currentIndex >= 0 && currentIndex < allSections.length - 1
      ? allSections[currentIndex + 1]
      : null;

  if (!content) {
    notFound();
  }

  return (
    <section className={styles.page}>
      <div className={styles.intro}>
        <span className="label-tracking">Survey Methods</span>
        <h1 className={styles.title}>{content.title}</h1>
        <div className={styles.topLinks}>
          <Link href="/survey-methods/questionnaire-design" className={styles.pillLink}>
            Questionnaire design
          </Link>
        </div>
      </div>

      <div className={styles.surface}>
        <div
          className={styles.handbook}
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      </div>

      {(previousSection || nextSection) && (
        <nav className={styles.sectionPager} aria-label="Questionnaire section navigation">
          {previousSection ? (
            <Link
              href={`/survey-methods/questionnaire-design/${previousSection.id}`}
              className={styles.pagerCard}
            >
              <span className={styles.pagerLabel}>Previous</span>
              <span className={styles.pagerTitle}>{previousSection.displayText}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextSection ? (
            <Link
              href={`/survey-methods/questionnaire-design/${nextSection.id}`}
              className={styles.pagerCard}
            >
              <span className={styles.pagerLabel}>Next</span>
              <span className={styles.pagerTitle}>{nextSection.displayText}</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}
    </section>
  );
}
