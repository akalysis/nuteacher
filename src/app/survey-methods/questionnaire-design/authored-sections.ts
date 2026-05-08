export const questionnaireDesignAuthoredSections: Record<string, string> = {
  "digital-first-questionnaire-design": `
    <p>
      Questionnaire design now needs to be treated as the design of a complete response journey.
      Many respondents arrive from email, SMS, QR code, app notification, panel portal, search, or
      social-platform recruitment rather than from a paper pack or a desktop-only web form. The
      instrument therefore begins before the first question and continues through consent,
      eligibility, completion, break-off, return, and follow-up.
    </p>
    <h3>Start with coverage and fit</h3>
    <p>
      A digital mode should be chosen because it fits the population, the sampling frame, and the
      fieldwork plan. The first question is not whether an online approach feels contemporary, but
      whether the intended respondents can be reached well, whether contact information is good
      enough to support digital fieldwork, and whether the topic can be handled in a
      self-administered environment without unacceptable error.
    </p>
    <p>
      Where coverage is uneven, a web-first design may still be sensible, but it should usually be
      supported by another route back in for people who are less reachable or less comfortable
      online. Inclusion is part of design, not a clean-up task at the end.
    </p>
    <h3>Design the full response journey</h3>
    <p>
      The opening screen needs to establish legitimacy quickly, explain purpose, expected length,
      confidentiality, and any incentive, and make the next step obvious. The questionnaire itself
      should then move in short, legible stages, with stable progress cues, clear routing, and as
      few surprises as possible.
    </p>
    <p>
      A well-designed digital questionnaire is resumable, tolerant of temporary connection loss, and
      capable of restoring the respondent to the right place. Randomisation, piping, and validation
      should reduce burden and improve data quality rather than advertise technical cleverness. The
      aim is low-friction completion.
    </p>
    <h3>Programming is part of questionnaire design</h3>
    <p>
      Routing, fills, validation rules, answer carry-forward, randomisation, and device rendering
      shape measurement directly. The programmed instrument is the questionnaire. If the programmed
      behaviour is confusing, brittle, or exclusionary, the design is not finished.
    </p>
    <p>
      Before launch, the questionnaire should be tested as respondents will encounter it, on phones,
      tablets, and larger screens, and across the actual invitation routes that will be used. Logic,
      randomisations, and stored outputs should be checked with trial cases rather than assumed to be
      correct because the wording is correct.
    </p>
  `,
  "mobile-sms-and-app-based-surveys": `
    <p>
      A questionnaire that works on a laptop but degrades on a phone is badly designed. Many
      respondents will open the survey on a smartphone even when they were recruited elsewhere.
      Mobile design is therefore not a specialist variation. It is often the primary design case.
    </p>
    <h3>Design for the small screen first</h3>
    <p>
      Mobile questionnaires should favour short stems, short option lists, single-column layouts,
      strong visual hierarchy, and large tap targets. Grids, side-by-side answer sets,
      hover-dependent help, drag interactions, and long scrolling batteries create avoidable burden
      and should be used only when genuinely necessary.
    </p>
    <p>
      Open-ended responses remain useful, but they should be deployed selectively because typed
      burden is higher on phones. If a measure depends on subtle visual comparison across many
      options, it should be redesigned rather than simply squeezed onto a smaller screen.
    </p>
    <h3>Use SMS and app prompts deliberately</h3>
    <p>
      SMS and app notification can be effective contact modes, especially for reminders and
      time-sensitive work, but they perform best when they build on prior legitimacy. A short,
      recognisable message with a clear study identity and a secure link is usually stronger than a
      compressed pseudo-questionnaire sent by text alone.
    </p>
    <p>
      Timing matters. Repeated low-value messages quickly become noise. If a study uses app-based
      participation, passive capture, location, images, recordings, or sensor-derived data, those
      requests should be separated clearly from the core questionnaire and justified in plain
      language.
    </p>
    <h3>Expect interrupted completion</h3>
    <p>
      Mobile respondents are more likely to be interrupted, switch networks, move between contexts,
      and complete in short bursts. The questionnaire therefore needs auto-save, clean return links,
      stable state management, and recovery behaviour that does not punish ordinary digital use.
    </p>
    <p>
      A mobile questionnaire should fail gracefully. If respondents lose their place, lose their
      answers, or meet validation loops that are easy on desktop but awkward on a phone, the design
      is working against the respondent rather than with them.
    </p>
  `,
  "social-platform-recruitment-and-tiktok-era-fieldwork": `
    <p>
      Social platforms are now part of the fieldwork environment. TikTok, Instagram, Facebook,
      Reddit, WhatsApp, YouTube, Snapchat, X, and similar services can help reach populations that
      are otherwise slow to contact or difficult to identify. They are usually best treated as
      recruitment channels rather than as evidence that the resulting sample is representative.
    </p>
    <h3>Separate recruitment from measurement</h3>
    <p>
      In most cases, the cleaner design is to use the platform to recruit attention and then move
      respondents into a controlled questionnaire environment. This gives better control of consent,
      screening, duplicate prevention, questionnaire logic, and data security. Platform-native polls
      and stickers may be useful for rapid feedback or engagement work, but they are rarely a strong
      basis for inference on their own.
    </p>
    <p>
      Recruitment material should look like recruitment material, not like a disguised
      questionnaire. The landing page should identify the study clearly, explain why the person has
      been invited, and distinguish the survey from the platform on which the invitation appeared.
    </p>
    <h3>Assume delivery is shaped by the platform</h3>
    <p>
      Social-platform recruitment is not neutral delivery. Placement rules, optimisation, sharing
      behaviour, and platform governance shape who sees the invitation and when they see it. The
      achieved sample may therefore drift away from the intended population even when the targeting
      looks sensible at the outset.
    </p>
    <p>
      Good practice is to record source, campaign, creative, and timing so that recruitment pathways
      can be reviewed later. Sensitive topics require particular care because targeting alone may
      reveal something about why a person was shown the study.
    </p>
    <h3>Match claims to the design</h3>
    <p>
      Samples recruited through social media, communities, or personal networks are commonly
      nonprobability samples. They may still be analytically useful, but the claims made for them
      should match the design. Recruitment should be described plainly, likely sources of bias should
      be stated, and language implying stronger population inference than the design can support
      should be avoided.
    </p>
  `,
  "data-quality-bots-and-ai-generated-responses": `
    <p>
      Questionnaire design now has to account for machine-generated responses, organised survey
      farming, sophisticated duplicates, and opportunistic fraud. Online data quality cannot be
      protected by a single attention check or a late-stage deletion rule. It requires layered
      design.
    </p>
    <h3>Build quality control into the design</h3>
    <p>
      Before launch, the study should specify how respondents will be authenticated, how duplicate
      attempts will be flagged, what metadata will be retained, and what exclusion rules will be
      documented. During fieldwork, completion times, straightlining, item non-response, repeated
      device signatures, suspicious source traffic, and open-ended text quality should be monitored
      as part of routine survey management.
    </p>
    <p>
      One indicator is rarely enough. Fast completion may indicate expertise, bad faith, or simply a
      short questionnaire. Repeated IP addresses may reflect fraud or a shared setting. Stronger
      judgements come from combining evidence across multiple signals and keeping an audit trail of
      what was removed and why.
    </p>
    <h3>Open-ended items need extra care</h3>
    <p>
      Generative tools make it easier to fabricate plausible open-text answers. That does not make
      open questions obsolete, but it does mean they cannot be treated as inherently authentic. Where
      open text matters, prompts should encourage grounded detail, answers should be checked against
      other responses, and review rules should be in place for templated or generic language.
    </p>
    <p>
      Incentives also need calibration. When the reward becomes more salient than the task, the
      questionnaire becomes a target for opportunistic completion. The aim is not to avoid
      incentives, but to design the study so that authenticity is rewarded more than speed or
      exploitation.
    </p>
    <h3>Report quality controls openly</h3>
    <p>
      Sample source, recruitment, validation, exclusions, break-offs, and major post-collection
      removals should be described as part of the survey method. Data quality belongs in the account
      of the study itself, not in an afterthought.
    </p>
  `,
  "accessibility-consent-and-privacy-online": `
    <p>
      A questionnaire that excludes respondents through inaccessible design has a methodological
      problem before it has a compliance problem. Accessibility, consent, and privacy are part of the
      instrument itself and should be designed in from the start.
    </p>
    <h3>Accessible forms produce better data</h3>
    <p>
      Questions and instructions need to be perceivable and operable across assistive technologies,
      keyboards, phones, and ordinary browsers. Labels should be explicit, grouped inputs should be
      structured properly, required fields should be identified clearly, and essential instructions
      should not depend on placeholder text, colour alone, or fleeting visual cues.
    </p>
    <p>
      Accessibility also includes literacy, language, and cognitive burden. Plain language, shorter
      screens, stable layouts, sound translation practice, and clear skip options improve inclusion
      and reduce avoidable measurement error.
    </p>
    <h3>Consent should match the data environment</h3>
    <p>
      Online questionnaires often collect more than answers. Timestamps, device type, partial
      completes, paradata, referral source, and linked data may all be part of the study process.
      Consent material should therefore state plainly what is collected, what is essential for
      participation, what is optional, who will hold the data, and how long it will be retained.
    </p>
    <p>
      Where third-party platforms are used in recruitment or hosting, respondents should be moved
      into a controlled survey environment as early as possible, especially where the topic is
      sensitive or the population is vulnerable.
    </p>
    <h3>Protect refusal, pause, and withdrawal</h3>
    <p>
      Respondents should be able to refuse a question, stop, return later, or withdraw where the
      design allows it. A questionnaire that coerces completion through forced responses or confusing
      exits may raise nominal completion while damaging trust and data quality.
    </p>
  `,
  "mixed-mode-and-adaptive-fieldwork": `
    <p>
      The practical question is often not whether to use web, mail, phone, or text, but how to
      combine them. Questionnaire design therefore has to connect instrument decisions with fieldwork
      sequencing, because response, cost, and measurement are all affected by how modes are mixed.
    </p>
    <h3>Web-first is often efficient, not sufficient</h3>
    <p>
      A web-first approach can reduce cost and speed completion, but it does not remove coverage or
      non-response problems. Where important groups are less likely to respond online, the design
      should include planned recovery routes such as paper, phone, interviewer follow-up, or text
      reminders.
    </p>
    <p>
      The aim is not to maximise web share at all costs. The aim is to obtain usable and defensible
      data from the target population.
    </p>
    <h3>Sequence modes deliberately</h3>
    <p>
      Mixed-mode contact works best when each step has a clear purpose. A mailed invitation may
      establish legitimacy, an email or SMS may prompt fast response, and a later paper or phone
      option may bring in respondents who would otherwise be missed. Repeating the same ignored
      contact in the same mode is often less useful than a considered mode switch.
    </p>
    <p>
      Equivalence also matters. The same concept may behave differently across self-administered web,
      paper, and interviewer-administered modes. Concepts should be preserved across modes rather
      than assuming one visual design can simply be copied unchanged into every route.
    </p>
    <h3>Use paradata during fieldwork</h3>
    <p>
      Device mix, break-off points, response by subgroup, completion timing, reminder yield, and
      missingness patterns can all inform field decisions. These indicators can be used to adjust
      contact timing, switch mode, target reminders, and identify parts of the questionnaire that are
      failing in real time.
    </p>
    <p>
      Adaptive fieldwork is not a substitute for design, but it is part of competent survey
      management. A questionnaire should be built so that emerging problems can be seen and acted on
      before fieldwork closes.
    </p>
  `,
};
