# Innovacare Academy — Canonical Training integration

Source of truth: `support975/innovacare-trainning`, nested application at `innovacare-trainning-main`.

## Audit
- Angular 20 + AngularFire 20, Firebase project `innovacare-training`.
- Canonical collections: `courses`, `users`, `organizationCourseAssignments`.
- Existing learner flows: course catalog, course detail, course player, exams, grading, progress, certificates.
- Course schema: `sections[].lessons[].blocks[]` with text, video, image, quiz, file, embed.
- `CoursesRepo.visibleForProfile` enforces organization-specific visibility in application logic; **do not assume this is sufficient as Firestore security**.
- Exam runner grades through existing platform; never duplicate answers/answer keys or score calculation in Academy.

## Academy implementation
- Uses the same Firebase project for sign-in and read-only `courses` collection.
- Displays only `active=true AND isPublic=true` courses for authenticated users.
- No direct writes to course, exam, enrollment, progress or certificate collections.
- Opens canonical Training learner course route for actual delivery.
- Existing Training account is required. Auth sessions across different web origins may require a second sign-in; true SSO requires a reviewed session handoff.
- The Training app's production URL and learner route need confirmation before launch.

## Security and release blockers
1. **Do not deploy until Firestore rules are audited.** A client query is not an authorization boundary; rules must enforce visibility, org assignments, and sensitive exam content.
2. Add the Academy hosting domain to Firebase Auth authorized domains.
3. Verify public catalog read permissions against production rules using emulator tests.
4. Do not expose answer keys, paid course blocks, protected video URLs, or private course content through public reads.
5. The current Firebase config is copied from the existing Training client config. Prefer dev/staging Firebase projects for tests.
6. **Dependency lockfile needs regeneration**: run `npm install --package-lock-only` with network access, commit the resulting lockfile, then `npm ci && npm run build`.
7. Add logout UI, route guards, loading/error states, email verification and automated tests.
8. Check the canonical course URL; currently assumed `/learner/courses/:courseId`.
9. The original Angular 15 frontend requires migration before long-term production use.

## Integration contract
Academy is a discovery shell, not a fork of Training's learning engine. Course creation, enrollment, quizzes, exams, scoring, certificates and progress remain canonical in Training. Do not migrate or duplicate Firestore collections.
