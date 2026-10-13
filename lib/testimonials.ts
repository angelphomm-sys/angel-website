// Quotes about Angel's work, from people who saw it. Empty until she supplies real ones with permission.
// The About page section renders only when this list has at least one entry. Never write a quote here
// that the person did not say and approve.
export type Testimonial = {
  quote: string;   // their words, trimmed to one or two sentences
  name: string;    // full name as they want it shown
  role: string;    // title and organization, for example "Program director, Hope Scholars at UVU"
};

export const testimonials: Testimonial[] = [];
