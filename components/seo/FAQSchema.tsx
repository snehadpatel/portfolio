/** ===================================================================
 *  components/seo/FAQSchema.tsx — FAQ JSON-LD for Featured Snippets
 *  ===================================================================
 *  Inject on services page to target Google "People also ask" and
 *  Featured Snippet boxes.
 *  ----------------------------------------------------------------- */

interface FAQItem {
    question: string;
    answer: string;
}

export function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ─── Pre-built FAQ data for the Services page ──────────────────────
export const SERVICE_FAQS: FAQItem[] = [
    {
        question: "What AI and machine learning services does Sneha Patel offer?",
        answer: "Sneha specializes in computer vision pipelines (object detection, visual forensics, medical image triaging), context-aware AI copilots (AST parsing, token streaming, RAG), graph-augmented NLP (Neo4j, transformers), and edge AI hardware deployment. All solutions are built with production-grade frameworks like PyTorch, TensorFlow, FastAPI, and Next.js.",
    },
    {
        question: "Can Sneha build a deepfake detection or visual forensics system?",
        answer: "Yes. Sneha built DeepShield AI, a dual-domain visual forensics pipeline combining Vision Transformers (ViT-Base-16) with frequency-domain analysis (Error Level Analysis and Discrete Cosine Transform) and Grad-CAM explainability. It was evaluated on FaceForensics++ and DFDC benchmarks, with documented robustness analyses under social media compression.",
    },
    {
        question: "Does Sneha work with IoT and embedded hardware?",
        answer: "Absolutely. Sneha engineers physical edge prototypes integrating Raspberry Pi and Arduino with optimized ML models. Her NeuraBin / GreenSort project (Top 6 / 160 at SustainX 2026) runs YOLOv8 on a Raspberry Pi 4 with Arduino Uno servo gate actuation, achieving 90 mAP across 4 waste streams at a 1.7s total cycle time with a ₹5,000 hardware budget.",
    },
    {
        question: "What programming languages and frameworks does Sneha use?",
        answer: "Sneha is proficient in Python, Java, C/C++, TypeScript, JavaScript, and SQL/Cypher. For AI/ML: PyTorch, TensorFlow, Keras, Scikit-Learn, YOLOv8, and OpenCV. For web & APIs: Next.js 15, React, FastAPI, Flask, and Tailwind CSS. For databases: Neo4j, MongoDB, and MySQL. For embedded systems: Arduino, Raspberry Pi, and serial protocols.",
    },
    {
        question: "Is Sneha available for internship or engineering roles?",
        answer: "Yes. Sneha is actively seeking AI/ML engineering and software engineering internships, research fellowships, and technical project collaborations. You can reach out directly via sneha.dpatel@outlook.com or through her contact page.",
    },
    {
        question: "What certifications does Sneha hold?",
        answer: "Sneha holds 5 verified credentials: AWS Academy Graduate (Machine Learning Foundations), Google Cloud Academy (GCP Data Engineering), Neo4j Certified Professional, IBM (Data Analysis with Python), and Cisco Networking Academy (IoT & Cybersecurity).",
    },
];
