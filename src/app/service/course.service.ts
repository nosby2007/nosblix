import { Injectable } from '@angular/core';
export interface Lesson { id: string; title: string; minutes: number; content: string; }
export interface Course { id: string; title: string; category: string; level: string; description: string; duration: string; lessons: Lesson[]; }
@Injectable({ providedIn: 'root' })
export class CourseService {
  // Demonstration catalog. Replace with reviewed, versioned content from the existing Innovacare Training system.
  private readonly courses: Course[] = [
    { id: 'skin-anatomy', title: 'Foundations of Skin Anatomy', category: 'Foundations', level: 'Beginner', duration: '35 min', description: 'Explore the epidermis, dermis, subcutaneous tissue and their roles in skin integrity.', lessons: [
      { id: 'layers', title: 'The layers of the skin', minutes: 12, content: 'The epidermis forms the outer barrier. The dermis contains connective tissue, blood vessels and nerves. Subcutaneous tissue lies below the dermis and provides cushioning and insulation.' },
      { id: 'healing', title: 'Skin integrity and healing', minutes: 13, content: 'Skin integrity depends on adequate perfusion, nutrition, moisture balance and protection from pressure and shear. Healing is influenced by systemic and local factors.' },
      { id: 'review', title: 'Knowledge review', minutes: 10, content: 'Review the anatomical layers and explain how pressure, friction and moisture can affect skin integrity.' }
    ]},
    { id: 'pressure-injury', title: 'Pressure Injury Prevention', category: 'Prevention', level: 'Intermediate', duration: '40 min', description: 'Understand risk factors, prevention principles and documentation fundamentals.', lessons: [
      { id: 'risk', title: 'Risk assessment', minutes: 15, content: 'Assess mobility, perfusion, moisture, nutrition, sensation and device-related pressure. Use validated tools alongside clinical judgment.' },
      { id: 'prevention', title: 'Prevention planning', minutes: 15, content: 'Individualize repositioning, support surfaces, skin care and offloading to the patient’s condition and care setting.' },
      { id: 'documentation', title: 'Documentation essentials', minutes: 10, content: 'Document assessment findings, preventive measures, patient education and reassessment.' }
    ]},
    { id: 'wound-documentation', title: 'Wound Assessment & Documentation', category: 'Clinical Skills', level: 'Intermediate', duration: '45 min', description: 'Build a structured approach to describing and monitoring wounds.', lessons: [
      { id: 'assessment', title: 'Structured assessment', minutes: 20, content: 'Record wound location, dimensions, tissue appearance, drainage, surrounding skin, symptoms and changes over time.' },
      { id: 'followup', title: 'Follow-up documentation', minutes: 15, content: 'Use consistent measurements and document response to the care plan and escalation of concerns.' },
      { id: 'communication', title: 'Clinical communication', minutes: 10, content: 'Communicate significant changes promptly to the responsible licensed clinician.' }
    ]}
  ];
  list(): Course[] { return this.courses; }
  find(id: string | null): Course | undefined { return this.courses.find(course => course.id === id); }
  search(query: string): Course[] { const q = query.trim().toLowerCase(); return this.courses.filter(c => [c.title,c.category,c.description].some(v => v.toLowerCase().includes(q))); }
}
