import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { questionnaireDesignOutline } from "./outline";
import { questionnaireDesignAuthoredSections } from "./authored-sections";

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const textPattern = (text: string) => escapeRegExp(text).replace(/\s+/g, "\\s+");

const replaceHeading = (
  html: string,
  sourceTag: "p7" | "li7" | "li27",
  sourceText: string,
  replacement: string,
) => {
  const pattern = textPattern(sourceText);

  if (sourceTag === "p7") {
    const exactParagraph = new RegExp(
      `<p class="p7">\\s*(?:<b><\\/b>)?\\s*${pattern}\\s*<\\/p>`,
      "g",
    );
    const replacedExact = html.replace(exactParagraph, replacement);

    if (replacedExact !== html) {
      return replacedExact;
    }

    const suffixParagraph = new RegExp(
      `<p class="p7">([\\s\\S]*?)\\s*(?:<b><\\/b>)?\\s*${pattern}\\s*<\\/p>`,
      "g",
    );

    return html.replace(suffixParagraph, (_match, prefix: string) => {
      const preservedPrefix = prefix.trim();

      if (!preservedPrefix) {
        return replacement;
      }

      return `<p class="p7">${preservedPrefix}</p>${replacement}`;
    });
  }

  if (sourceTag === "li27") {
    return html.replace(
      new RegExp(`<li class="li27">(?:<span class="s4"><\\/span>)?<b>${pattern}<\\/b><\\/li>`, "g"),
      replacement,
    );
  }

  return html.replace(new RegExp(`<li class="li7">${pattern}<\\/li>`, "g"), replacement);
};

const cleanExportMarkup = (html: string) =>
  html
    .replace(/<b><\/b>/g, "")
    .replace(/\sclass="(?:p|li|ul|t|td|s)\d+"/g, "")
    .replace(/<\/?span[^>]*>/g, "")
    .replace(/<p>(?:\s|<br>)*<\/p>/g, "")
    .replace(/<ul>\s*<ul>/g, "<ul>")
    .replace(/<\/ul>\s*<\/ul>/g, "</ul>");

const guideWideReplacements: Array<[RegExp, string]> = [
  [
    /<p>In the chapters below,[\s\S]*?consider carefully whether the recommendations are appropriate to your particular survey!<\/p>/i,
    "<p>In the sections below, specific articles and resources are listed for those who wish to explore the subject further. Web-based material is included as a working resource for future surveys. Links should be checked before use, and inclusion of a resource does not imply endorsement of every aspect of it. No single approach to survey data collection is right in all settings, so each recommendation should be judged against the aims, population, and constraints of the survey in hand.</p>",
  ],
  [
    /<p>References for Chapter \d+<\/p>/gi,
    "<h3>References</h3>",
  ],
  [
    /<p>Further reading and resources for Chapter \d+<\/p>/gi,
    "<h3>Further reading and resources</h3>",
  ],
  [
    /<p>In this chapter<\/p>/gi,
    "<h3>In this section</h3>",
  ],
  [
    /By the end of this chapter/gi,
    "By the end of this section",
  ],
  [
    /In this handbook, the main focus is on steps 6 to 10\./g,
    "Here, the main focus is on steps 6 to 10.",
  ],
  [
    /identified in the Further Reading section at the end of this handbook/gi,
    "identified in the further reading section at the end of this guide",
  ],
  [
    /The American Association for Public Opinion Research has produced a useful guide to best practice in survey and public opinion research, elaborating on issues raised in this chapter and elsewhere in this handbook\./g,
    "The American Association for Public Opinion Research has produced a useful guide to best practice in survey and public opinion research, elaborating on issues raised in this section and elsewhere in this guide.",
  ],
  [
    /As we have seen in Chapter 1,/g,
    "As discussed earlier,",
  ],
  [
    /\(we will develop this topic further in Chapter 10\)/g,
    "(this topic is developed further in the section on sampling for survey research)",
  ],
  [
    /\(we will develop this topic further in Chapter 8\)/g,
    "(this topic is developed further in the section on maximising response rates)",
  ],
  [
    /\(we will develop this topic further in Chapter 5\)/g,
    "(this topic is developed further in the section on devising survey questions)",
  ],
  [
    /\(see Chapters 4, 5 and 7\)/g,
    "(see the sections on identifying the variables for survey research, devising survey questions, and pre-testing and piloting questionnaires)",
  ],
  [
    /\(we will return to this in Chapter 5\)/g,
    "(we return to this in the section on devising survey questions)",
  ],
  [
    /\(we will examine this further in Chapter 10\)/g,
    "(we examine this further in the section on sampling for survey research)",
  ],
  [
    /In this course and handbook, therefore, we concentrate on postal and other self-completion surveys\./g,
    "Here, the focus is on postal and other self-completion surveys.",
  ],
  [
    /\(this has been covered in Chapter 10\)/g,
    "(this is covered in the section on sampling for survey research)",
  ],
  [
    /As discussed in Chapter 10,/g,
    "As discussed in the section on sampling for survey research,",
  ],
  [
    /\(this will be discussed further in Chapter 5, 6 and 8\)/g,
    "(this is discussed further in the sections on devising survey questions, structure and layout of questionnaires, and maximising response rates)",
  ],
  [
    /In Chapters 1 and 2, we have already emphasised/g,
    "Earlier sections have already emphasised",
  ],
  [
    /We will return to the challenges of wording questions so that the operational and conceptual definitions match as closely as possible, and are adequately conveyed to the respondent, in Chapter 5\./g,
    "We return to the challenges of wording questions so that the operational and conceptual definitions match as closely as possible, and are adequately conveyed to the respondent, in the section on devising survey questions.",
  ],
  [
    /Question development and wording are taken up in the section on devising survey questions\./g,
    "Question development and wording are taken up in the section on devising survey questions.",
  ],
  [
    /In Chapter 5, we discuss development and wording of questions and their associated response categories\./g,
    "Question development and wording are taken up in the section on devising survey questions.",
  ],
  [
    /\(covered in Chapter 11\)/g,
    "(covered in the section on coding and data processing in survey research)",
  ],
  [
    /\(see Chapter 2\)/g,
    "(see the section on measurement error in survey research)",
  ],
  [
    /\(see Chapter 10\)/g,
    "(see the section on sampling for survey research)",
  ],
  [
    /\(see Chapter 8\)/g,
    "(see the section on maximising response rates)",
  ],
  [
    /\(see Chapter 9\)/g,
    "(see the section on survey management)",
  ],
  [
    /\(see Chapter 4\)/g,
    "(see the section on identifying the variables for survey research)",
  ],
  [
    /\(sampling is covered in Chapter 10\)/g,
    "(sampling is covered in the section on sampling for survey research)",
  ],
  [
    /\(a form of measurement error\), which occurs when a response is received but is unsatisfactory or invalid for the purposes of the survey \(e\.g\. social desirability bias – see Chapter 5\)\./g,
    "(a form of measurement error), which occurs when a response is received but is unsatisfactory or invalid for the purposes of the survey (e.g. social desirability bias – see the section on devising survey questions).",
  ],
  [
    /\(as discussed in Chapter 10\)/g,
    "(as discussed in the section on sampling for survey research)",
  ],
  [
    /\(issues of coding are discussed in Chapter 11\)/g,
    "(issues of coding are discussed in the section on coding and data processing in survey research)",
  ],
  [
    /\(if OMR \/ OCR questionnaires are being used – see Chapter 11\)/g,
    "(if OMR / OCR questionnaires are being used – see the section on coding and data processing in survey research)",
  ],
  [
    /\(see Chapter 7\)/g,
    "(see the section on pre-testing and piloting questionnaires)",
  ],
  [
    /As noted in Chapter 8,/g,
    "As noted in the section on maximising response rates,",
  ],
  [
    /Issues of coding and data processing are discussed in greater detail in Chapter 11\./g,
    "Issues of coding and data processing are discussed in greater detail in the section on coding and data processing in survey research.",
  ],
  [
    /includes \(mainly in Chapter 10\) some information on sampling in surveys/g,
    "includes some information on sampling in surveys",
  ],
  [
    /The preceding sections of this handbook should have convinced the reader/g,
    "The preceding sections should have made clear",
  ],
  [
    /\bthis handbook\b/g,
    "this guide",
  ],
  [
    /\bThis handbook\b/g,
    "This guide",
  ],
  [
    /\bchapters below\b/g,
    "sections below",
  ],
  [
    /\bthe remainder of this chapter\b/g,
    "the remainder of this section",
  ],
];

const sectionSpecificReplacements: Record<string, Array<[RegExp, string]>> = {
  "choosing-a-suitable-scale-of-measurement": [
    [
      /The choice of level and scale of measurement also determines what statistical techniques can be used, as shown in Table 5 above\./g,
      "The choice of level and scale of measurement also determines what statistical techniques can be used, as shown in the summary just presented.",
    ],
    [
      /\(see table 5 above\)/gi,
      "(see the summary just presented)",
    ],
  ],
};

const normalizeGuideMarkup = (html: string) =>
  guideWideReplacements.reduce(
    (currentHtml, [pattern, replacement]) => currentHtml.replace(pattern, replacement),
    html,
  );

const rewriteSectionHtml = (id: string, html: string) => {
  const replacements = sectionSpecificReplacements[id];

  if (!replacements) {
    return html;
  }

  return replacements.reduce(
    (currentHtml, [pattern, replacement]) => currentHtml.replace(pattern, replacement),
    html,
  );
};

let transformedHandbookPromise: Promise<{ html: string }> | null = null;

const getTransformedHandbook = async () => {
  if (!transformedHandbookPromise) {
    transformedHandbookPromise = (async () => {
      const filePath = join(process.cwd(), "src/content/survey-methods-handbook.html");
      const raw = await readFile(filePath, "utf8");
      const body = raw.match(/<body>([\s\S]*?)<\/body>/i)?.[1] ?? raw;

      let section = body
        .replace(/<span class="Apple-tab-span">[\s\S]*?<\/span>/g, " ")
        .replace(/<span class="Apple-converted-space">[\s\S]*?<\/span>/g, " ")
        .replace(/<span class="s4"><\/span>/g, "")
        .replace(/<p class="p7"><\/p>/g, "");

      for (const item of questionnaireDesignOutline.filter((entry) => entry.contentSource !== "authored")) {
        if (!item.sourceTag || !item.sourceText) {
          continue;
        }

        section = replaceHeading(
          section,
          item.sourceTag,
          item.sourceText,
          `<${item.level} id="${item.id}">${item.displayText}</${item.level}>`,
        );
      }

      return {
        html: normalizeGuideMarkup(cleanExportMarkup(section)),
      };
    })();
  }

  return transformedHandbookPromise;
};

const headingRegex = /<(h[234]) id="([^"]+)">([\s\S]*?)<\/\1>/g;

export const getQuestionnaireDocumentHtml = async () => {
  const { html } = await getTransformedHandbook();
  return html;
};

export const getQuestionnaireSectionHtml = async (id: string) => {
  const outlineItem = questionnaireDesignOutline.find((item) => item.id === id);

  if (!outlineItem) {
    return null;
  }

  if (outlineItem.contentSource === "authored") {
    const html = questionnaireDesignAuthoredSections[id];

    if (!html) {
      return null;
    }

    return {
      title: outlineItem.displayText,
      html: rewriteSectionHtml(id, html),
    };
  }

  const { html } = await getTransformedHandbook();
  const matches = [...html.matchAll(headingRegex)].map((match) => ({
    full: match[0],
    level: Number(match[1].slice(1)),
    id: match[2],
    index: match.index ?? 0,
  }));

  const currentIndex = matches.findIndex((match) => match.id === id);

  if (currentIndex === -1) {
    return null;
  }

  const current = matches[currentIndex];
  let endIndex = html.length;

  for (let i = currentIndex + 1; i < matches.length; i += 1) {
    if (matches[i].level <= current.level) {
      endIndex = matches[i].index;
      break;
    }
  }

  const rawSection = html.slice(current.index, endIndex);
  const sectionBody = rawSection.replace(current.full, "").trim();

  return {
    title: outlineItem.displayText,
    html: rewriteSectionHtml(id, sectionBody),
  };
};
