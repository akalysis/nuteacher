import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { questionnaireDesignOutline } from "./outline";
import { questionnaireDesignAuthoredSections } from "./authored-sections";

const questionnaireDesignIntroductionHtml = `
  <p>This section of the website sets out a practical approach to questionnaire design for survey research. Its purpose is to help researchers move from a broad information need to a questionnaire that respondents can understand, complete accurately, and complete with as little unnecessary burden as possible.</p>
  <p>Questionnaire design is treated here as part of the whole survey process, not as a final formatting task. Good questions depend on clearly defined constructs, appropriate measures, suitable response options, careful ordering, accessible layout, realistic fieldwork planning, and testing before use.</p>
  <p>The material is organised so that it can be used in different ways: as a complete route through questionnaire design, as a reference for specific decisions such as question wording or response categories, and as a checklist for reviewing an existing instrument before it goes into the field.</p>
  <p>It covers traditional self-completion and postal surveys alongside online, mobile, SMS, app-based, social-platform and mixed-mode approaches. The aim is to keep the core standards of good survey measurement while recognising how people now encounter and complete questionnaires across devices and platforms.</p>
`;

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
    .replace(/<\/ul>\s*<\/ul>/g, "</ul>")
    .replace(/<\/ul>\s*<ul>/g, "");

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
    "identified in the further reading section",
  ],
  [
    /The American Association for Public Opinion Research has produced a useful guide to best practice in survey and public opinion research, elaborating on issues raised in this chapter and elsewhere in this handbook\./g,
    "The American Association for Public Opinion Research has produced a useful resource on best practice in survey and public opinion research, elaborating on issues raised in this section and elsewhere on this topic.",
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
    "this section",
  ],
  [
    /\bThis handbook\b/g,
    "This section",
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

const urlReplacement = (url: string) => new RegExp(escapeRegExp(url), "g");

const resourceLinkReplacements: Array<[RegExp, string]> = [
  [urlReplacement("http://www.natcen.ac.uk/"), "https://natcen.ac.uk/"],
  [urlReplacement("http://www.natcen.ac.uk/our-research"), "https://natcen.ac.uk/our-research"],
  [urlReplacement("http://www.ccsr.ac.uk/"), "https://www.cmi.manchester.ac.uk/"],
  [urlReplacement("http://www.ons.gov.uk/ons/guide-method/index.html"), "https://www.ons.gov.uk/methodology"],
  [urlReplacement("http://www.cdc.gov/nchs/surveys.htm"), "https://www.cdc.gov/nchs/dqs/index.html"],
  [
    urlReplacement("http://www.norc.org/Research/Capabilities/Pages/study-design-and-survey-methodology.aspx"),
    "https://www.norc.org/services-solutions/design-and-methodology.html",
  ],
  [urlReplacement("http://www.sesrc.wsu.edu/dillman/papers.html"), "Dillman's published work on tailored questionnaire design"],
  [urlReplacement("http://www.socialresearchmethods.net/kb/"), "https://conjointly.com/kb/"],
  [urlReplacement("http://www.socialresearchmethods.net/kb/index.htm"), "https://conjointly.com/kb/"],
  [urlReplacement("http://www.socialresearchmethods.net/kb/survey.htm"), "https://conjointly.com/kb/survey-research/"],
  [urlReplacement("http://www.socialresearchmethods.net/kb/measure.htm"), "https://conjointly.com/kb/measurement-in-research/"],
  [urlReplacement("http://www.socialresearchmethods.net/kb/measlevl.htm"), "https://conjointly.com/kb/levels-of-measurement/"],
  [urlReplacement("http://www.socialresearchmethods.net/kb/sampling.htm"), "https://conjointly.com/kb/sampling-in-research/"],
  [urlReplacement("https://conjointly.com/kb/index.htm"), "https://conjointly.com/kb/"],
  [urlReplacement("https://conjointly.com/kb/survey.htm"), "https://conjointly.com/kb/survey-research/"],
  [urlReplacement("https://conjointly.com/kb/measure.htm"), "https://conjointly.com/kb/measurement-in-research/"],
  [urlReplacement("https://conjointly.com/kb/measlevl.htm"), "https://conjointly.com/kb/levels-of-measurement/"],
  [urlReplacement("https://conjointly.com/kb/sampling.htm"), "https://conjointly.com/kb/sampling-in-research/"],
  [
    urlReplacement("http://www.socialsciences.manchester.ac.uk/morgan-centre/research/resources/toolkits/"),
    "the University of Manchester research methods resources",
  ],
  [urlReplacement("https://ccsg.isr.umich.edu/"), "the University of Michigan cross-cultural survey guidelines"],
  [
    urlReplacement("https://www.aapor.org/Standards-Ethics/Best-Practices.aspx"),
    "https://aapor.org/standards-and-ethics/best-practices/",
  ],
  [urlReplacement("http://writing.colostate.edu/guides/guide.cfm?guideid=68"), "Colorado State University's general writing and research guides"],
  [urlReplacement("http://ukdataservice.ac.uk/get-data/key-data.aspx"), "https://datacatalogue.ukdataservice.ac.uk/"],
  [urlReplacement("http://discover.ukdataservice.ac.uk/variables"), "https://datacatalogue.ukdataservice.ac.uk/searchresults?sort=2&tab=3"],
  [
    urlReplacement("http://www.ons.gov.uk/ons/guide-method/harmonisation/harmonisation-index-page/index.html"),
    "https://www.ons.gov.uk/methodology/classificationsandstandards/harmonisationwithinthegss",
  ],
  [
    urlReplacement("https://gss.civilservice.gov.uk/statistics/methodology-2/harmonisation/introduction-to-harmonisation/#primary"),
    "https://www.ons.gov.uk/methodology/classificationsandstandards/harmonisationwithinthegss",
  ],
  [urlReplacement("http://wwwn.cdc.gov/qbank/Home.aspx"), "https://www.cdc.gov/nchs/ccqder/technology-products/index.html"],
  [
    urlReplacement("https://sesrc.wsu.edu/dillman/papers/1997/A%20Theory%20of%20Self-Administered%20Questionnaire%20Design.pdf"),
    "https://www.census.gov/library/working-papers/1995/adrm/sm95-06.html",
  ],
  [
    urlReplacement("https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.463.5473&amp;rep=rep1&amp;type=pdf"),
    "https://www.cambridge.org/core/books/designing-effective-web-surveys/1EF1C9064FCC5464ED4B63C237482D61",
  ],
  [urlReplacement("http://www.textmatters.com/resources/pdfs/visImpd_typogTM.pdf"), "current accessible typography guidance"],
  [
    urlReplacement("https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide"),
    "https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace",
  ],
  [
    urlReplacement("http://www.unescap.org/sites/default/files/Disability-question-testing-guidelines.pdf"),
    "the UNESCAP disability statistics and questionnaire-testing resources",
  ],
  [urlReplacement("http://edithl.home.xs4all.nl/surveyhandbook/BMS55.pdf"), "the BMS article archive"],
  [urlReplacement("https://www.census.gov/library/working-papers/1998/adrm/sm98-03.html"), "the US Census Bureau survey-methods working papers"],
  [
    urlReplacement("https://www.researchgate.net/publication/259812768_Question_Appraisal_System_QAS_99_Manual"),
    "https://www.websm.org/db/12/15804/Web%20Survey%20Bibliography/Question_Appraisal_System__QAS99_/",
  ],
  [
    urlReplacement("https://wwwn.cdc.gov/QBANK/Search/Reports.aspx#/Reports"),
    "https://www.cdc.gov/nchs/ccqder/question-evaluation/index.html",
  ],
  [
    urlReplacement("https://wwwn.cdc.gov/QBANK/QUEST.aspx#/Home"),
    "https://www.cdc.gov/nchs/ccqder/technology-products/index.html",
  ],
  [
    urlReplacement("https://www.webarchive.org.uk/wayback/archive/20150218195719/http://www.gov.scot/Topics/Research/About/Social-Research/Methods-Guides/Guide-7"),
    "the Scottish Government social research methods archive",
  ],
  [urlReplacement("http://www.bmj.com/content/324/7347/1183"), "doi:10.1136/bmj.324.7347.1183"],
  [
    urlReplacement("https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.MR000008.pub4/full?highlightAbstract=methodolog%7Creview%7Cmethodological"),
    "doi:10.1002/14651858.MR000008.pub4",
  ],
  [urlReplacement("https://www.journalslibrary.nihr.ac.uk/hta/hta5310/#/abstract"), "doi:10.3310/hta5310"],
  [urlReplacement("https://doi.org/10.1093/intqhc/mzg031"), "doi:10.1093/intqhc/mzg031"],
  [urlReplacement("http://www.quantitativeskills.com/sisa/calculations/resprhlp.htm"), "https://aapor.org/response-rates/"],
  [
    urlReplacement("http://www.aapor.org/Standards-Ethics/Standard-Definitions-(1).aspx"),
    "https://aapor.org/standards-and-ethics/standard-definitions/",
  ],
  [
    urlReplacement("http://www.royalmail.com/marketing-services-regular/deliver-your-campaign/business-reply-freepost-plus"),
    "https://www.royalmail.com/business/mail/replies-responses/business-reply-freepost-plus",
  ],
  [urlReplacement("http://www.royalmail.com/delivery/returning-mail-and-goods-uk"), "https://www.royalmail.com/business/parcels/returns"],
  [
    urlReplacement("https://personal.help.royalmail.com/app/answers/detail/a_id/277/~/addresses-we-cant-deliver-to"),
    "the current Royal Mail personal-help guidance",
  ],
  [
    urlReplacement("http://www.royalmail.com/personal/help-and-support/what-is-track-and-trace-and-how-do-I-use-it/"),
    "https://www.royalmail.com/track-your-item",
  ],
  [
    urlReplacement("http://www.royalmail.com/business/services/sending/letters-uk/business-mail"),
    "https://www.royalmail.com/business/mail/business-mail",
  ],
  [
    urlReplacement("https://gss.civilservice.gov.uk/wp-content/uploads/2016/11/The-coverage-of-the-PAF-and-AddressBase-and-targeting-ineligible-addresses-using-the-AddressBase-Classificatio.pdf"),
    "the current ONS and GSS address-frame guidance",
  ],
  [
    urlReplacement("http://www.ons.gov.uk/ons/guide-method/method-quality/general-methodology/data-collection-methodology/reports-and-publications/survey-methodology-bulletin-58---august-2006.html"),
    "the ONS methodology archive",
  ],
  [urlReplacement("http://slideplayer.com/slide/786313/"), "the ONS methodology archive"],
  [urlReplacement("https://www.unh.edu/institutional-research/sites/default/files/pamphlet.pdf"), "the American Statistical Association survey-methods resources"],
  [urlReplacement("http://www.statisticalassociates.com/sampling.pdf"), "the National Audit Office sampling guide"],
  [
    urlReplacement("http://www.fantaproject.org/monitoring-and-evaluation/sampling"),
    "the FANTA sampling guidance archive",
  ],
  [
    urlReplacement("http://www.medicine.mcgill.ca/epidemiology/joseph/pbelisle/CodebookCookbook/CodebookCookbook.pdf"),
    "https://www.icpsr.umich.edu/sites/icpsr/manage-data",
  ],
  [urlReplacement("https://www.iser.essex.ac.uk/bhps/documentation/vola/index.html"), "https://www.understandingsociety.ac.uk/documentation/"],
  [
    urlReplacement("https://www.iser.essex.ac.uk/bhps/documentation/pdf_versions/survey_docs/index.html"),
    "https://www.understandingsociety.ac.uk/documentation/mainstage/",
  ],
  [urlReplacement("https://www.iser.essex.ac.uk/bhps/documentation/volb/index.html"), "https://www.understandingsociety.ac.uk/documentation/"],
  [
    urlReplacement("http://www.cls.ioe.ac.uk/Publications.aspx?sitesectionid=83&amp;sitesectiontitle=Coding+Frames"),
    "the Centre for Longitudinal Studies documentation resources",
  ],
  [urlReplacement("http://members.tripod.com/frede_dast/conseil1_a.html"), ""],
];

const normalizeResourceLinks = (html: string) =>
  resourceLinkReplacements.reduce(
    (currentHtml, [pattern, replacement]) => currentHtml.replace(pattern, replacement),
    html,
  );

const linkifyUrls = (html: string) =>
  html.replace(/https?:\/\/[^\s<]+/g, (rawUrl) => {
    const trailingPunctuation = rawUrl.match(/[),.;]+$/)?.[0] ?? "";
    const url = trailingPunctuation ? rawUrl.slice(0, -trailingPunctuation.length) : rawUrl;

    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>${trailingPunctuation}`;
  });

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

const shouldPromoteParagraphToListItem = (paragraphHtml: string) => {
  const text = stripHtml(paragraphHtml);

  if (!text || text.length > 240) {
    return false;
  }

  if (/^(Box|Table|Figure|Summary|References|Further reading|In this section)\b/i.test(text)) {
    return false;
  }

  if (/^(However|Finally|Nonetheless|Therefore|Once again|Sometimes|It is|There is|There are|The |This |These )\b/.test(text)) {
    return false;
  }

  return /[;:.?]$/.test(text) || /^[a-z]/.test(text);
};

const promoteLooseParagraphLists = (html: string) =>
  html.replace(
    /(<p>[\s\S]*?(?:to:-|include:-|includes:-|following:-|include the following\.|are the following:-|such as:-)<\/p>)((?:\s*<p>[\s\S]*?<\/p>){2,})/g,
    (_match, leadParagraph: string, paragraphRun: string) => {
      const paragraphs = [...paragraphRun.matchAll(/\s*(<p>[\s\S]*?<\/p>)/g)].map((match) => match[1]);
      const listItems: string[] = [];
      const rest: string[] = [];
      let stillPromoting = true;

      for (const paragraph of paragraphs) {
        const inner = paragraph.replace(/^<p>/, "").replace(/<\/p>$/, "");

        if (stillPromoting && shouldPromoteParagraphToListItem(inner)) {
          listItems.push(`<li>${inner}</li>`);
        } else {
          stillPromoting = false;
          rest.push(paragraph);
        }
      }

      if (listItems.length < 2) {
        return `${leadParagraph}${paragraphRun}`;
      }

      return `${leadParagraph}<ul class="structuredList">${listItems.join("")}</ul>${rest.join("")}`;
    },
  );

const enhanceGuideStructure = (html: string) =>
  promoteLooseParagraphLists(html)
    .replace(/<p>\s*(?:<b><\/b>)?\s*Summary of key points\s*<\/p>/gi, '<h3 class="summaryHeading">Summary of key points</h3>')
    .replace(
      /(<h3 class="summaryHeading">Summary of key points<\/h3>)((?:\s*<p>[\s\S]*?<\/p>){2,})/gi,
      (_match, heading: string, paragraphRun: string) => {
        const listItems = [...paragraphRun.matchAll(/\s*<p>([\s\S]*?)<\/p>/g)]
          .map((match) => `<li>${match[1]}</li>`)
          .join("");

        return `${heading}<ul class="summaryList">${listItems}</ul>`;
      },
    )
    .replace(/<p>\s*(?:<b>)?(Box\s+\d+)(?:<\/b>)?([\s\S]*?)<\/p>/gi, (_match, label: string, rest: string) => {
      const cleanedRest = rest.replace(/<b>([\s\S]*?)<\/b>/g, "<strong>$1</strong>").trim();
      return `<p class="figureLabel"><strong>${label}</strong>${cleanedRest ? ` ${cleanedRest}` : ""}</p>`;
    })
    .replace(/<p>\s*(?:<b>)?(Table\s+\d+)(?:<\/b>)?([\s\S]*?)<\/p>/gi, (_match, label: string, rest: string) => {
      const cleanedRest = rest.replace(/<b>([\s\S]*?)<\/b>/g, "<strong>$1</strong>").trim();
      return `<p class="figureLabel tableLabel"><strong>${label}</strong>${cleanedRest ? ` ${cleanedRest}` : ""}</p>`;
    })
    .replace(/<p>\s*(?:<b>)?(Figure\s+\d+)(?:<\/b>)?([\s\S]*?)<\/p>/gi, (_match, label: string, rest: string) => {
      const cleanedRest = rest.replace(/<b>([\s\S]*?)<\/b>/g, "<strong>$1</strong>").trim();
      return `<p class="figureLabel"><strong>${label}</strong>${cleanedRest ? ` ${cleanedRest}` : ""}</p>`;
    })
    .replace(
      /(<p class="figureLabel"><strong>Box 1<\/strong>[\s\S]*?Steps in a survey[\s\S]*?<\/p>)\s*<ul>([\s\S]*?)<\/ul>/i,
      '$1<ol class="numberedList">$2</ol>',
    );

const preparePublishedHtml = (html: string) =>
  linkifyUrls(enhanceGuideStructure(normalizeResourceLinks(normalizeGuideMarkup(cleanExportMarkup(html)))))
    .replace(/<p>\s*<\/p>/g, "")
    .replace(/<li>\s*<\/li>/g, "");

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

let transformedQuestionnaireContentPromise: Promise<{ html: string }> | null = null;

const getTransformedQuestionnaireContent = async () => {
  if (!transformedQuestionnaireContentPromise) {
    transformedQuestionnaireContentPromise = (async () => {
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
        html: preparePublishedHtml(section),
      };
    })();
  }

  return transformedQuestionnaireContentPromise;
};

const headingRegex = /<(h[234]) id="([^"]+)">([\s\S]*?)<\/\1>/g;

export const getQuestionnaireDocumentHtml = async () => {
  const { html } = await getTransformedQuestionnaireContent();
  return html;
};

export const getQuestionnaireSectionHtml = async (id: string) => {
  const outlineItem = questionnaireDesignOutline.find((item) => item.id === id);

  if (!outlineItem) {
    return null;
  }

  if (id === "introduction") {
    return {
      title: outlineItem.displayText,
      html: questionnaireDesignIntroductionHtml,
    };
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

  const { html } = await getTransformedQuestionnaireContent();
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
