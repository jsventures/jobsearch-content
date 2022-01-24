import fs from "fs";
import { marked } from "marked";

const CONTENT = [
  [
    ["Introduction", "01_introductions/01_course_intro.md", "5-Cq91iGfdQ"],
    ["Audience", "01_introductions/02_audience.md"],
    ["Study Plan", "01_introductions/03_study_plan.md"],
  ],
  [
    ["Mental Game", "02_mental_game/00_mental_game_intro.md", "KhHaBRl84sM"],
    ["Attitude", "02_mental_game/01_attitude.md", "sVbCslWivzk"],
    ["Narrative", "02_mental_game/02_narrative.md", "GtpHy0AslOs"],
    ["Example Narrative", "02_mental_game/03_example_narrative.md"],
    ["Community", "02_mental_game/04_community.md", "NYk1y707g1w"],
    ["Commitment", "02_mental_game/05_commitment.md", "p1hJ-Qnqdwk"],
  ],
  [
    [
      "Communication",
      "03_communication/01_communication_intro.md",
      "Y1_XaVzO1bA",
    ],
    ["Signal & Scope", "03_communication/02_signal_scope.md", "uKGzkt1QiZo"],
    ["Leveling", "03_communication/03_leveling.md", "uzGXnyjB2oA"],
    ["Leveling Guide", "03_communication/04_leveling_guide.md"],
    [
      "Communicating Signal",
      "03_communication/05_communicating_signal.md",
      "jWZPNza4Ms4",
    ],
  ],
  [
    ["Interview Phases", "04_interview_phases/01_overview.md", "AHZ9P7JvoV8"],
    ["Ramp Up", "04_interview_phases/02_ramp_up.md", "k4DNVI2WvK0"],
    [
      "Recruiter Screen",
      "04_interview_phases/03_recruiter_screen.md",
      "1LS6-9YAp5M",
    ],
    [
      "Technical Screen",
      "04_interview_phases/04_technical_screen.md",
      "q-SJZyn9AoE",
    ],
    ["Onsites", "04_interview_phases/05_onsites.md", "O4_EWcrzaPc"],
  ],
  [
    ["Offer Stage", "05_offer_stage/01_choosing.md", "AbIPg_HOSE8"],
    ["Negotiating", "05_offer_stage/02_negotiating.md", "4lBaOCzaSrg"],
    ["Concluding", "05_offer_stage/03_concluding.md", "RaJKY--onrs"],
  ],
  [
    [
      "Algorithm Interview",
      "06_algorithm_interview/01_foundations.md",
      "MITOJgHG_GQ",
    ],
    [
      "Mock & Real Interviews",
      "06_algorithm_interview/02_mock_real_interviews.md",
      "9MLXuHCoWgY",
    ],
  ],
  [["UI Interview", "07_ui_interview/01_all.md", "tyBqWvHLon4"]],
  [
    [
      "System Design Interview",
      "08_system_interview/01_system_pre_interview.md",
      "jhseQBR8RjY",
    ],
    [
      "Functional Spec",
      "08_system_interview/02_system_functional_spec.md",
      "F5pl83ZNJxo",
    ],
    [
      "Technical Spec",
      "08_system_interview/03_system_technical_spec.md",
      "aPAEKN-U6GA",
    ],
    ["Going Deep", "08_system_interview/04_system_deep.md", "aB5ov6apSZU"],
    [
      "Final Advice",
      "08_system_interview/05_system_final_advice.md",
      "Aa2ot32wVRI",
    ],
  ],
  [
    [
      "Experience Interview",
      "09_experience_interview/01_experience_purpose.md",
      "cQ-JVbDTm-M",
    ],
    ["Fit", "09_experience_interview/02_experience_fit.md", "xgopARFzAxU"],
    [
      "Leveling",
      "09_experience_interview/03_experience_leveling.md",
      "JbqiX7li8GI",
    ],
    [
      "Followup",
      "09_experience_interview/04_experience_follow_up.md",
      "2gOxBrFDkBg",
    ],
  ],
  [["Takeaways", "10_conclusions/01_take_aways.md", "JpYtpr-K7Sw"]],
];

const HOME_MD = `
Both of us are senior engineers who completed a 100-day-long job search. We went through a combined 20 onsites, and landed L5 and L6 offers.

Throughout the process, we spoke to each other every day and shared what we learned.

We discovered that though there is a lot of great information online on interview prep — from cracking algorithm interviews to negotiating compensation. However, the concepts that made the biggest difference in our job search just weren’t out there.

These were concepts like signal & scope — the two key ideas you need to communicate the level you want. 

We saw a lot of information about offer negotiations, but rarely did they include discussing level, which makes the biggest difference for large companies.

There was a lot information on algorithm interviews, but rarely information on system design and experience interviews, especially the signal that’s needed to convey your seniority.

There was a lot of conversations about referrals, but rarely did people talk about how to build a team of mentors, referrals, and peers for your job search.

As we shared these ideas with our friends, we began to see massive changes in their results. We saw total compensation changes that were 30-100% higher than either their previous roles or previous offers.

So, we decided to make this course. We recruited our friends Luba and Aamir, and even made videos. We initially planned to charge for the course, but decided that it would be best to expand the pie knowledge instead. So, we're proud to bring you the whole of jobsearch.dev, for free.

Joe & Stopa
`.trim();

function extractChapterTitle(md) {
  const [chTitleMd, ...rest] = md.trim().split("\n");
  const chTitle = chTitleMd
    .split("#")
    .filter((x) => x)[0]
    .trim();
  const restMd = rest.join("\n");
  return [chTitle, restMd];
}

export default function getAllContent() {
  const content = CONTENT.map((items) =>
    items.map(([navTitle, p, videoSlug]) => {
      const [chapterTitle, md] = extractChapterTitle(
        fs.readFileSync(`./web_content/${p}`, {
          encoding: "utf8",
        })
      );
      return {
        slug: navTitle.split(" ").join("-").toLocaleLowerCase(),
        navTitle,
        chapterTitle,
        html: marked(md),
        videoSlug: videoSlug || null,
      };
    })
  );
  return {
    home: {
      chapterTitle: "Senior Engineer Jobsearch",
      slug: "top",
      html: marked(HOME_MD),
    },
    content,
  };
}
