import { questionnaireDesignOutline } from "./outline";

export type QuestionnaireDesignGroup = {
  title: string;
  summary: string;
  href: string;
  sectionIds: string[];
};

export const questionnaireDesignNavigationGroups: QuestionnaireDesignGroup[] = [
  {
    title: "Foundations and survey mode",
    summary:
      "Start here for the purpose of questionnaire design, survey error, and choosing the right method of data collection.",
    href: "/survey-methods/questionnaire-design/introduction",
    sectionIds: [
      "introduction",
      "the-quantitative-social-survey-method",
      "measurement-error-in-survey-research",
      "choosing-the-method-of-data-collection",
    ],
  },
  {
    title: "Content and measurement",
    summary:
      "Define what must be measured, identify variables, choose measurement scales, and use existing question sources properly.",
    href: "/survey-methods/questionnaire-design/identifying-the-variables-for-survey-research",
    sectionIds: [
      "identifying-the-variables-for-survey-research",
      "approaches-to-determining-questionnaire-content",
      "determining-the-variables-to-be-included",
      "defining-variables",
      "types-of-data",
      "choosing-a-suitable-scale-of-measurement",
      "sources-of-survey-questions",
      "the-uk-data-service",
      "ons-harmonised-questions",
      "questions-from-us-polls-and-surveys",
      "core-outcomes",
      "questions-on-health-status-and-quality-of-life",
      "questions-on-patient-satisfaction",
    ],
  },
  {
    title: "Question design",
    summary:
      "Work through behaviour questions, attitude measurement, response options, wording, order, and cognitive response processes.",
    href: "/survey-methods/questionnaire-design/devising-survey-questions",
    sectionIds: [
      "devising-survey-questions",
      "communicative-and-scientific-aims-of-quantitative-surveys",
      "cognitive-aspects-of-survey-methodology",
      "asking-about-behaviour",
      "distortions-of-recall-and-reporting-of-events-and-behaviour",
      "forgetting",
      "deliberate-omissions-and-distortions",
      "unconscious-omissions-and-distortions",
      "rationalisation",
      "distortion-of-the-perception-of-elapsed-time",
      "challenges-of-posing-questions-about-behaviour-and-events",
      "the-form-and-wording-of-questions-to-measure-behaviour",
      "enhancing-accuracy-and-completeness-of-response",
      "asking-about-assessments-attitudes-values-motives-intentions-etc",
      "optimising-response-to-knowledge-questions",
      "obtaining-valid-and-reliable-measures-of-attitudes",
      "question-forms",
      "question-wording",
      "question-ordering",
    ],
  },
  {
    title: "Layout, testing and usability",
    summary:
      "Turn the questionnaire into a usable instrument through structure, visual layout, navigation, pre-testing and pilots.",
    href: "/survey-methods/questionnaire-design/structure-and-layout-of-questionnaires",
    sectionIds: [
      "structure-and-layout-of-questionnaires",
      "formatting-questionnaires",
      "aiding-navigation-through-the-questionnaire",
      "choice-of-type-face-and-paper",
      "design-principles-for-user-friendly-questionnaires",
      "pre-testing-and-piloting-questionnaires",
      "why-pre-test-and-pilot-questionnaires",
      "different-types-of-pre-test-and-pilot",
      "cognitive-pre-testing",
      "rehearsal-pilots",
    ],
  },
  {
    title: "Fieldwork and response",
    summary:
      "Plan contact, response-rate strategy, non-response handling, survey administration and fieldwork management.",
    href: "/survey-methods/questionnaire-design/maximising-response-rates",
    sectionIds: [
      "maximising-response-rates",
      "definition-and-analysis-of-unit-and-item-response",
      "reasons-for-unit-non-response",
      "compensating-for-unit-non-response",
      "survey-management",
    ],
  },
  {
    title: "Sampling, processing and resources",
    summary:
      "Connect questionnaire design to sampling, coding, processing, conclusions, and the curated resource list.",
    href: "/survey-methods/questionnaire-design/sampling-for-survey-research",
    sectionIds: [
      "sampling-for-survey-research",
      "why-do-we-sample",
      "coding-and-data-processing-in-survey-research",
      "conclusions",
      "useful-web-sites",
      "further-reading",
    ],
  },
  {
    title: "Digital survey practice",
    summary:
      "Apply the same design standards to web, mobile, SMS, app-based, social-platform and mixed-mode fieldwork.",
    href: "/survey-methods/questionnaire-design/digital-first-questionnaire-design",
    sectionIds: [
      "digital-first-questionnaire-design",
      "mobile-sms-and-app-based-surveys",
      "social-platform-recruitment-and-tiktok-era-fieldwork",
      "data-quality-bots-and-ai-generated-responses",
      "accessibility-consent-and-privacy-online",
      "mixed-mode-and-adaptive-fieldwork",
    ],
  },
];

export const getQuestionnaireDesignGroupSections = (sectionIds: string[]) =>
  sectionIds
    .map((id) => questionnaireDesignOutline.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
