# Innovacare Academy integration contract

Audited against `support975/innovacare-trainning` `main` at `64a0ff0836f52acf9734db873d0a90c4f193dacf`.

## Responsibility boundary

Academy is a discovery, profile, progress-summary and secure-handoff frontend. Innovacare Training remains authoritative for course authoring, course blocks, enrollment writes, lesson completion, quiz sessions, exam questions/submissions, scoring, certificates and organization administration. Academy never reads answer-key documents and contains no scoring engine.

## Firebase contracts

- Project: `innovacare-training` (the Training client configuration is used; Firebase web config is public but must have API/domain restrictions).
- Profile: `users/{uid}` with `role`, `active`, `orgId`, `accountType` and display fields.
- Self-registration: email/password Auth plus a new `users/{uid}` document with `role=learner`, `active=true`, `orgId=null`, `accountType=individual`, and `onboardingSource=academy-self-serve`. Registration never accepts role or organization input.
- Courses: `courses/{courseId}`. Public query requires `active == true` and `isPublic == true`. Organization visibility is the union of `assignedOrgIds array-contains orgId`, legacy `orgId == profile.orgId`, and active `organizationCourseAssignments` mappings. Inactive courses are removed after merge.
- Email restrictions: public courses with `allowedEmailDomains` are filtered for the signed-in profile email. Firestore rules remain the authorization boundary.
- Learning activity: read-only `users/{uid}/enrollments/{courseId}` for the signed-in learner.
- Organization summary: managers/admins query same-org learner profiles and enrollment collection-group records. Missing indexes or rules return an unavailable state; Academy does not relax rules.
- Certificates: Academy derives completion visibility from the learner enrollment and hands off to `/learner/certifications`. Canonical `certificates` records remain in Training.

## Canonical routes

- Course overview: `/learner/courses/:id`
- Course player: `/learner/courses/:id/view`
- Course exam: `/learner/courses/:id/exam/:examId` (launched by Training only)
- Learner certifications: `/learner/certifications`
- Learner dashboard: `/learner`
- Organization administration: `/manager`
- Super administration: `/super-admin`

The production base URL currently configured by Training is `https://innovacare-training.web.app`.

## Security findings and release gates

1. Current Training rules protect `courses/*/exams/*/answerKey/*` as super-admin only and self-scope learner enrollment/progress reads.
2. Angular guards improve navigation but do not authorize data; all data access depends on Training Firestore rules.
3. Different Firebase Hosting origins do not share browser Auth persistence. Academy uses an explicit handoff and tells the learner that Training may request another sign-in. No token is placed in a URL.
4. Firebase Console access is required to confirm the Academy localhost and future Hosting domains in Authentication > Settings > Authorized domains. This cannot be proven from repository files.
5. The repository exposes aliases for dev/staging Firebase projects, but their web client configurations are not committed. Local integration therefore targets the current Training Firebase client project and must not use production learner credentials or mutate production course data.
6. Before deployment, run Training rule emulator coverage against the exact deployed ruleset and configure a non-production Firebase environment for end-to-end auth/data tests.
