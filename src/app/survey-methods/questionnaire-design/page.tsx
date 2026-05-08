import Link from "next/link";
import styles from "./page.module.css";
import { questionnaireDesignOutline } from "./outline";

const mainSections = questionnaireDesignOutline.filter(
  (item) => item.level === "h2" && item.showInMenu,
);
const focusedSections = questionnaireDesignOutline.filter(
  (item) => item.level !== "h2" && item.showInMenu,
);

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
        <div className={styles.tocGrid}>
          <div className={styles.tocBlock}>
            <h2 className={styles.tocTitle}>Main sections</h2>
            <ul className={styles.tocList}>
              {mainSections.map((item) => (
                <li key={item.id}>
                  <Link href={`/survey-methods/questionnaire-design/${item.id}`}>
                    {item.displayText}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.tocBlock}>
            <h2 className={styles.tocTitle}>Focused topics</h2>
            <ul className={styles.tocList}>
              {focusedSections.map((item) => (
                <li key={item.id}>
                  <Link href={`/survey-methods/questionnaire-design/${item.id}`}>
                    {item.displayText}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
