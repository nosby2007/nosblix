# Innovacare Academy

Responsive Angular 20 frontend integrated with the canonical Innovacare Training Firebase project.

## Local development

```powershell
npm install
npm run build
npm test
npm start -- --host 127.0.0.1 --port 4200
```

Open http://localhost:4200.

Academy provides public discovery, account access, learner dashboards, catalogue/detail views, progress summaries, organization overview, profile settings and explicit handoffs to Innovacare Training. It does not duplicate quizzes, exams, scoring, answer keys, progress writes or certificates.

See [the integration contract](docs/INNOVACARE_TRAINING_INTEGRATION.md) for collection schemas, routes, authorization boundaries and release blockers.
