# Innovacare Academy — Foundation Preview

A clinical learning catalog prototype migrated from the NOSBLIX Angular 15 movie-discovery frontend.

## Run
- Install a Node.js version compatible with Angular 15.
- Run `npm ci`
- Run `npm start` and visit http://localhost:4200
- Run `npm run build` for a production build.

## Implemented
- Responsive academy catalog and navigation
- Local typed course/lesson dataset (3 illustrative courses)
- Search by course title, category and description
- Course detail and selectable text lessons
- Removal of TMDB dependencies and the previously exposed API key from application source

## Not yet implemented
Authentication, real content import from Innovacare Training, instructor administration, videos, assessments, progress persistence, payment processing, enrollment, certificates, support workflows, CI/CD deployment, accreditation.

**Important:** This is an educational UI preview, not a clinical guideline or accredited CE/CNE course. Review all medical content before publishing.

## Next integration
Audit the existing Innovacare Training course JSON/quiz schemas and implement an adapter before adding Firebase persistence. Do not duplicate the existing learning engine. Keep payment entitlements and certificate issuance server-side.
