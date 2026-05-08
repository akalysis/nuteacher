import Link from "next/link";
import styles from "./page.module.css";
import {
  getQuestionnaireDesignGroupSections,
  questionnaireDesignNavigationGroups,
} from "./navigation";

export default function QuestionnaireDesignIndexPage() {
  return (
    <section className={styles.page}>
      <div className={styles.intro}>
        <span className="label-tracking">Survey Methods</span>
        <h1 className={styles.title}>Questionnaire Design</h1>
        <p className={styles.lead}>
          A section-by-section guide to questionnaire design, covering core principles, question
          construction, structure, fieldwork, data quality, and digital delivery.
        </p>
      </div>

      <div className={styles.surface}>
        <div className={styles.groupList}>
          {questionnaireDesignNavigationGroups.map((group) => {
            const sections = getQuestionnaireDesignGroupSections(group.sectionIds);

            return (
              <section key={group.title} className={styles.groupCard}>
                <div className={styles.groupHeader}>
                  <div>
                    <h2 className={styles.tocTitle}>
                      <Link href={group.href}>{group.title}</Link>
                    </h2>
                    <p className={styles.groupSummary}>{group.summary}</p>
                  </div>
                  <span className={styles.groupMeta}>{sections.length} sections</span>
                </div>

                <ul className={styles.tocList}>
                  {sections.map((item) => (
                    <li key={item.id}>
                      <Link href={`/survey-methods/questionnaire-design/${item.id}`}>
                        {item.displayText}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
