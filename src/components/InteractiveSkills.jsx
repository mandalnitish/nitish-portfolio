import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ==================================================
   Central Skills Data
================================================== */

const skills = [
  {
    name: "React",
    level: 90,
    experience: "1 years",
    projects: 8,
    category: "Frontend",
  },
  {
    name: "Node.js",
    level: 80,
    experience: "1 years",
    projects: 6,
    category: "Backend",
  },
  {
    name: "Firebase",
    level: 75,
    experience: "1.5 years",
    projects: 5,
    category: "Backend",
  },
  {
    name: "Tailwind CSS",
    level: 85,
    experience: "2 years",
    projects: 7,
    category: "Frontend",
  },
  {
    name: "Python",
    level: 70,
    experience: "1.5 years",
    projects: 4,
    category: "Core",
  },
];

/* ==================================================
   Main Component
================================================== */

export default function InteractiveSkills() {
  return (
    <section
      id="skills"
      data-nav
      className="py-20 max-w-6xl mx-auto px-4"
    >
      <h2 className="text-3xl font-bold mb-12">
        Tech Stack
      </h2>

      {/* Radar Chart + Skill Bars */}
      <div className="grid md:grid-cols-2 gap-12">
        <SkillsRadar />
        <SkillBars />
      </div>
    </section>
  );
}

/* ==================================================
   Radar Chart
================================================== */

function SkillsRadar() {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer>
        <RadarChart data={skills}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis domain={[0, 100]} />
          <Radar
            dataKey="level"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.35}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ==================================================
   Animated Skill Bars
================================================== */

function SkillBars() {
  return (
    <div className="space-y-6">
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">
              {skill.name}
            </span>
            <span className="text-gray-500">
              {skill.level}%
            </span>
          </div>

          <div className="relative h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            />
          </div>

          <div className="mt-1 text-xs text-gray-500">
            {skill.experience} · {skill.projects} projects
          </div>
        </div>
      ))}
    </div>
  );
}
