import { readFile } from "node:fs/promises";
import { join } from "node:path";
import styles from "./page.module.css";

const headingMap: Array<{ level: "h2" | "h3" | "h4"; text: string }> = [
  { level: "h2", text: "4\tIdentifying the variables for survey research" },
  { level: "h3", text: "In this chapter" },
  { level: "h3", text: "Approaches to determining questionnaire content" },
  { level: "h3", text: "Determining the variables to be included" },
  { level: "h3", text: "Defining variables" },
  { level: "h3", text: "Types of data" },
  { level: "h3", text: "Choosing a suitable scale of measurement" },
  { level: "h3", text: "Sources of survey questions" },
  { level: "h4", text: "The UK Data Service" },
  { level: "h4", text: "ONS harmonised questions" },
  { level: "h4", text: "Questions from US polls and surveys" },
  { level: "h4", text: "Core outcomes" },
  { level: "h4", text: "Questions on health status and quality of life" },
  { level: "h4", text: "Questions on patient satisfaction" },
  { level: "h3", text: "Summary of key points" },
  { level: "h3", text: "References for Chapter 4" },
  { level: "h3", text: "Further reading and resources for Chapter 4" },
  { level: "h2", text: "5\tDevising survey questions" },
  { level: "h3", text: "Communicative and scientific aims of quantitative surveys" },
  { level: "h3", text: "Cognitive aspects of survey methodology" },
  { level: "h3", text: "Asking about behaviour" },
  { level: "h4", text: "Distortions of recall and reporting of events and behaviour" },
  { level: "h4", text: "Forgetting" },
  { level: "h4", text: "Deliberate omissions and distortions" },
  { level: "h4", text: "Unconscious omissions and distortions" },
  { level: "h4", text: "Rationalisation" },
  { level: "h4", text: "Distortion of the perception of elapsed time" },
  { level: "h4", text: "Challenges of posing questions about behaviour and events" },
  { level: "h4", text: "The form and wording of questions to measure behaviour" },
  { level: "h4", text: "Enhancing accuracy and completeness of response" },
  { level: "h3", text: "Asking about assessments, attitudes, values, motives, intentions etc." },
  { level: "h4", text: "Optimising response to knowledge questions" },
  { level: "h4", text: "Obtaining valid and reliable measures of attitudes" },
  { level: "h3", text: "Question forms" },
  { level: "h3", text: "Question wording" },
  { level: "h3", text: "Question ordering" },
  { level: "h3", text: "Summary of key points" },
  { level: "h3", text: "References for Chapter 5" },
  { level: "h3", text: "Further reading and resources for Chapter 5" },
  { level: "h2", text: "6 \tStructure and layout of questionnaires" },
  { level: "h3", text: "Formatting questionnaires" },
  { level: "h3", text: "Aiding ‘navigation’ through the questionnaire" },
  { level: "h3", text: "Choice of type-face and paper" },
  { level: "h3", text: "Design principles for user-friendly questionnaires" },
  { level: "h3", text: "Summary of key points" },
  { level: "h3", text: "References for Chapter 6" },
  { level: "h3", text: "Further reading and resources for Chapter 6" },
  { level: "h2", text: "7\tPre-testing and piloting questionnaires" },
  { level: "h3", text: "Why pre-test and pilot questionnaires?" },
  { level: "h3", text: "Different types of pre-test and pilot" },
  { level: "h3", text: "Cognitive pre-testing" },
  { level: "h3", text: "Rehearsal pilots" },
  { level: "h3", text: "Summary of key points" },
  { level: "h3", text: "References for Chapter 7" },
  { level: "h3", text: "Further reading and resources for Chapter 7" },
];

const replaceParagraphHeading = (html: string, text: string, level: "h2" | "h3" | "h4") => {
  const escaped = text
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\t/g, "(?:<span class=\"Apple-tab-span\">\\s*<\\/span>|\\s+)");

  const pattern = new RegExp(
    `<p class="p7">${escaped}<\\/p>|<li class="li27"><span class="s4"><\\/span><b>${escaped}<\\/b><\\/li>`,
    "g",
  );

  return html.replace(pattern, `<${level}>${text.replace(/\t/g, " ")}</${level}>`);
};

const buildHandbookHtml = async () => {
  const filePath = join(process.cwd(), "src/content/survey-methods-handbook.html");
  const raw = await readFile(filePath, "utf8");
  const styleBlock = raw.match(/<style[^>]*>([\s\S]*?)<\/style>/i)?.[1] ?? "";
  const body = raw.match(/<body>([\s\S]*?)<\/body>/i)?.[1] ?? raw;

  const startMarker = "<li class=\"li27\"><span class=\"s4\"></span><b>4";
  const endMarker = "<li class=\"li7\">8";
  const startIndex = body.indexOf(startMarker);
  const endIndex = body.indexOf(endMarker, startIndex);

  let section = body.slice(startIndex, endIndex);

  for (const heading of headingMap) {
    section = replaceParagraphHeading(section, heading.text, heading.level);
  }

  section = section.replace(/<p class="p7"><\/p>/g, "");

  return `<style>${styleBlock}</style>${section}`;
};

export default async function QuestionnaireDesignPage() {
  const handbookHtml = await buildHandbookHtml();

  return (
    <section className={styles.page}>
      <div className={styles.intro}>
        <span className="label-tracking">Survey Methods</span>
        <h1 className={styles.title}>Questionnaire Design Handbook</h1>
        <p className={styles.note}>
          The material below reproduces the relevant questionnaire-design chapters from
          <em> Survey Methods Handbook 2024</em> in verbatim form. The original references
          are retained; additional updated references are appended below.
        </p>
      </div>

      <div className={styles.surface}>
        <div
          className={styles.handbook}
          dangerouslySetInnerHTML={{ __html: handbookHtml }}
        />

        <div className={styles.additionalReferences}>
          <h3>Additional updated references</h3>
          <p>
            The items below are added to the handbook references and do not replace the
            original citations.
          </p>
          <ul>
            <li>
              Dillman DA, Smyth JD, Christian LM. <em>Internet, Phone, Mail, and Mixed-Mode
              Surveys: The Tailored Design Method</em>. 4th ed. Hoboken, NJ: Wiley; 2014.
            </li>
            <li>
              Fowler FJ Jr. <em>Survey Research Methods</em>. 5th ed. Thousand Oaks, CA:
              Sage; 2014.
            </li>
            <li>
              Robinson SB, Leonard KF. <em>Designing Quality Survey Questions</em>. 2nd ed.
              Thousand Oaks, CA: Sage; 2024.
            </li>
            <li>
              Artino AR Jr, La Rochelle JS, Dezee KJ, Gehlbach H. Developing questionnaires
              for educational research: AMEE Guide No. 87. <em>Medical Teacher</em>.
              2014;36(6):463-474.
            </li>
            <li>
              AAPOR. Best Practices for Survey Research. Available at{" "}
              <a href="https://aapor.org/standards-and-ethics/best-practices/">
                https://aapor.org/standards-and-ethics/best-practices/
              </a>
              .
            </li>
            <li>
              CDC National Center for Health Statistics. Cognitive Interviewing. Updated April
              16, 2024. Available at{" "}
              <a href="https://www.cdc.gov/nchs/ccqder/question-evaluation/cognitive-interviewing.html">
                https://www.cdc.gov/nchs/ccqder/question-evaluation/cognitive-interviewing.html
              </a>
              .
            </li>
            <li>
              Office for National Statistics. Question and questionnaire development overview
              for Census 2021. Available at{" "}
              <a href="https://www.ons.gov.uk/census/censustransformationprogramme/questiondevelopment/questionandquestionnairedevelopmentoverviewforcensus2021">
                https://www.ons.gov.uk/census/censustransformationprogramme/questiondevelopment/questionandquestionnairedevelopmentoverviewforcensus2021
              </a>
              .
            </li>
            <li>
              Agency for Healthcare Research and Quality. Formatting CAHPS Questionnaires for
              Mail, Web, and Phone Administrations. Reviewed August 2024. Available at{" "}
              <a href="https://www.ahrq.gov/cahps/surveys-guidance/survey-methods-research/formatting-questionnaires.html">
                https://www.ahrq.gov/cahps/surveys-guidance/survey-methods-research/formatting-questionnaires.html
              </a>
              .
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
