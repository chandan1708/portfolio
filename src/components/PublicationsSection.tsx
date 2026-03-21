// import { motion } from "framer-motion";
// import { ArrowUpRight, FileText, Mic } from "lucide-react";

// const publications = [
//   {
//     type: "paper",
//     title: "Real-time Surveillance Intelligence Using Deep Learning",
//     venue: "IEEE Conference / Preprint",
//     year: "2024",
//     description: "Proposed a multi-modal deep learning framework for automated phone usage detection and waste monitoring in institutional settings.",
//     link: "#",
//   },
//   {
//     type: "blog",
//     title: "Building Production-Grade RAG Pipelines",
//     venue: "Technical Blog",
//     year: "2024",
//     description: "A comprehensive guide to designing scalable RAG architectures using GraphRAG, RAFT, and CAG methodologies with real-world benchmarks.",
//     link: "#",
//   },
//   {
//     type: "talk",
//     title: "From LoRA to Production: Fine-Tuning LLMs at Scale",
//     venue: "AI Community Talk",
//     year: "2024",
//     description: "Shared practical insights on efficient LLM fine-tuning techniques and deployment strategies for resource-constrained environments.",
//     link: "#",
//   },
// ];

// const iconMap = {
//   paper: FileText,
//   blog: FileText,
//   talk: Mic,
// };

const PublicationsSection = () => {
  return null;
  // <section id="publications" className="section-padding">
  //   <div className="container">
  //     <motion.div
  //       initial={{ opacity: 0, y: 20 }}
  //       whileInView={{ opacity: 1, y: 0 }}
  //       transition={{ duration: 0.5 }}
  //       viewport={{ once: true }}
  //       className="text-center mb-12"
  //     >
  //       <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
  //         Publications & Talks
  //       </h2>
  //       <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
  //         Showcasing my contributions to research, technical blogs, and community
  //         engagements.
  //       </p>
  //     </motion.div>

  //     <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  //       {publications.map((pub, index) => {
  //         const Icon = iconMap[pub.type];
  //         return (
  //           <motion.div
  //             key={index}
  //             initial={{ opacity: 0, y: 20 }}
  //             whileInView={{ opacity: 1, y: 0 }}
  //             transition={{ duration: 0.5, delay: index * 0.1 }}
  //             viewport={{ once: true }}
  //             className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
  //           >
  //             <div className="flex items-center mb-4">
  //               <Icon className="w-8 h-8 text-primary-500 mr-3" />
  //               <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase">
  //                 {pub.type}
  //               </span>
  //             </div>
  //             <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
  //               {pub.title}
  //             </h3>
  //             <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
  //               <span className="font-medium">{pub.venue}</span> • {pub.year}
  //             </p>
  //             <p className="text-gray-700 dark:text-gray-400 mb-4 text-base">
  //               {pub.description}
  //             </p>
  //             <a
  //               href={pub.link}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
  //             >
  //               View Details
  //               <ArrowUpRight className="ml-1 w-4 h-4" />
  //             </a>
  //           </motion.div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // </section>
};

export default PublicationsSection;
