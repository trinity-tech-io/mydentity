import { sample } from "lodash";

const adjectives = [
  "Creative",
  "Ambitious",
  "Organized",
  "Dedicated",
  "Energetic",
  "Innovative",
  "Reliable",
  "Efficient",
  "Compassionate",
  "Confident",
  "Patient",
  "Articulate",
  "Analytical",
  "Outgoing",
  "Resourceful",
  "Hardworking",
  "Charismatic",
  "Adventurous",
  "Friendly",
  "Proactive",
  "Sociable",
  "Precise",
  "Punctual",
  "Adaptable",
  "Independent",
  "Meticulous",
  "Persuasive",
  "Observant",
  "Inquisitive",
  "Methodical",
  "Sensible",
  "Versatile",
  "Curious",
  "Diplomatic",
  "Diligent",
  "Dynamic",
  "Enterprising",
  "Enthusiastic",
  "Expressive",
  "Inventive",
  "Logical",
  "Modest",
  "Patient"
];

const jobNames = [
  "Writer",
  "Manager",
  "Clerk",
  "Nurse",
  "Seller",
  "Designer",
  "Mechanic",
  "Programmer",
  "Lawyer",
  "Teacher",
  "Presenter",
  "Analyst",
  "Host",
  "Manager",
  "Laborer",
  "Salesman",
  "Guide",
  "Editor",
  "Attendant",
  "Coordinator",
  "Entertainer",
  "Surveyor",
  "Courier",
  "Consultant",
  "Freelancer",
  "Researcher",
  "Marketer",
  "Investigator",
  "Archivist",
  "Advisor",
  "Operator",
  "Explorer",
  "Mediator",
  "Therapist",
  "Promoter",
  "Coach",
  "Performer",
  "Inventor",
  "Engineer"
];

export function generateRandomTempName(mode: "full" | "firstname" | "lastname" = "full"): string {
  switch (mode) {
    case "full":
      return sample(adjectives) + " " + sample(jobNames);
    case "firstname":
      return sample(jobNames);
    case "lastname":
      return sample(adjectives);
  }
}
