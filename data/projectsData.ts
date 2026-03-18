export interface Project {
  slug: string;
  title: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  tech: string[];
  github: string;
  live: string;
  screenshots?: string[];
}

const projects: Project[] = [
  {
    slug: "smart-parking-system",
    title: "Smart Parking System",
    description:
      "Real-time parking slot monitoring, QR-based check-in, YOLOv8 number plate recognition, and IoT sensor integration.",
    overview:
      "A comprehensive smart parking solution that leverages computer vision and IoT sensors to automate parking management. The system provides real-time slot availability, automated vehicle identification through license plate recognition, and a seamless QR-based check-in experience.",
    problem:
      "Traditional parking systems rely on manual monitoring, leading to inefficiency, long wait times, and poor space utilization. Drivers waste time and fuel searching for available spots, especially in high-traffic urban areas.",
    solution:
      "Built an intelligent parking system using YOLOv8 for real-time number plate recognition and IoT ultrasonic sensors for slot detection. The web dashboard displays live availability, while QR codes enable instant check-in/check-out without human intervention.",
    tech: [
      "React",
      "Tailwind",
      "Firebase",
      "YOLOv8",
      "OpenCV",
      "Jupyter Notebook",
      "JavaScript",
    ],
    github: "https://github.com/satish-kumar07/Smart-Parking-System",
    live: "https://smart-parking.ramdev.xyz/",
  },
  {
    slug: "campus-management-system",
    title: "Campus Management System",
    description:
      "AI face recognition attendance, automated email notifications, food ordering module, and backend optimization.",
    overview:
      "An all-in-one campus management platform that modernizes attendance tracking, communication, and food ordering using AI and automation. Designed to reduce administrative overhead and improve the student experience.",
    problem:
      "University campuses often rely on outdated attendance systems (manual roll calls), scattered communication channels, and inefficient canteen ordering processes. This leads to proxy attendance, missed announcements, and long food queues.",
    solution:
      "Implemented AI-powered face recognition for tamper-proof attendance, automated email notifications for real-time campus updates, and a streamlined food ordering module. The Django backend is optimized for handling concurrent requests efficiently.",
    tech: ["Python", "Django", "OpenCV", "SQLite", "HTML", "CSS"],
    github: "https://github.com/satish-kumar07/Campus-Management-System",
    live: "https://campus-management-system-6mbh.onrender.com/",
  },
  {
    slug: "rag-on-dsa",
    title: "RAG on DSA",
    description:
      "A developer-focused AI assistant that uses Retrieval-Augmented Generation to provide accurate explanations for Data Structures and Algorithms queries by combining semantic search with LLM reasoning.",
    overview:
      "An intelligent coding assistant that combines the power of Large Language Models with a curated DSA knowledge base. It uses Retrieval-Augmented Generation to deliver precise, contextual explanations and code examples for any DSA topic.",
    problem:
      "Generic LLMs can hallucinate or provide outdated information when asked about specific DSA concepts. Developers need accurate, well-structured explanations with proper code implementations, not vague or incorrect answers.",
    solution:
      "Built a RAG pipeline that indexes a curated DSA corpus using semantic embeddings, retrieves the most relevant passages for a query, and augments the LLM prompt with verified context — resulting in accurate, hallucination-free responses.",
    tech: [
      "Python",
      "Jupyter Notebook",
      "LLM",
      "RAG",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    github: "https://github.com/satish-kumar07/RAG_ON_DSA",
    live: "https://github.com/satish-kumar07/RAG_ON_DSA",
  },
  {
    slug: "ivy-league-opportunities",
    title: "Real-Time Ivy League OI SCI",
    description:
      "A comprehensive platform that aggregates real-time academic opportunities from Ivy League universities and matches them to student profiles using AI-powered analysis.",
    overview:
      "An AI-driven platform that scrapes, aggregates, and curates academic opportunities (scholarships, research positions, internships) from top Ivy League institutions. It uses intelligent matching to connect students with the most relevant opportunities.",
    problem:
      "Students seeking academic opportunities at Ivy League universities face information overload — scattered across multiple websites, with varying deadlines and eligibility criteria. Finding the right fit is time-consuming and error-prone.",
    solution:
      "Developed a real-time aggregation engine that collects opportunities from multiple sources, normalizes the data, and uses AI-powered profile matching to recommend the best-fit opportunities for each student's background and interests.",
    tech: ["Python", "HTML", "CSS", "JavaScript"],
    github:
      "https://github.com/satish-kumar07/Real-Time-Ivy-League-OI-SCI-main",
    live: "https://ivy-league-frontend-met5.onrender.com/",
  },
  {
    slug: "fake-account-detection",
    title: "Fake Social Media Accounts Detection",
    description:
      "A fake social media account is an inauthentic profile created for deception, spam, or manipulation, as opposed to genuine user accounts representing real individuals or legitimate organizations.",
    overview:
      "A machine learning system that analyzes social media profiles to detect fake, bot, or inauthentic accounts. It examines behavioral patterns, profile metadata, and engagement metrics to classify accounts with high accuracy.",
    problem:
      "Fake social media accounts undermine platform integrity through spam, misinformation, and social engineering attacks. Manual detection is impossible at scale, and existing automated systems have high false-positive rates.",
    solution:
      "Trained a classification model on a labeled dataset of real and fake accounts, analyzing features like follower-to-following ratio, post frequency, account age, bio patterns, and engagement metrics to achieve robust detection.",
    tech: ["Python", "Jupyter Notebook"],
    github:
      "https://github.com/satish-kumar07/Fake-Social-Media-Accounts-Detection",
    live: "https://github.com/satish-kumar07/Fake-Social-Media-Accounts-Detection",
  },
];

export default projects;
