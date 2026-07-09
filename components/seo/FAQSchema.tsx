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
        answer: "Sneha offers custom computer vision pipelines (image classification, deepfake detection, visual forensics), NLP and sentiment analysis systems, recommendation engines, IoT hardware prototyping with edge AI deployment, and end-to-end data pipeline consulting. All solutions are built with production-grade frameworks like PyTorch, TensorFlow, and FastAPI.",
    },
    {
        question: "Can Sneha build a deepfake detection system?",
        answer: "Yes. Sneha built DeepShield AI, a visual forensics pipeline achieving 97.5% accuracy on compressed GAN holdout sets. It uses Error Level Analysis, DCT frequency extraction, and a Vision Transformer (ViT) with Grad-CAM explainability. She also implements FGSM adversarial noise injection to proactively immunize photos against deepfakes.",
    },
    {
        question: "Does Sneha work with IoT and embedded hardware?",
        answer: "Absolutely. Sneha engineers physical prototypes integrating Raspberry Pi and Arduino with edge ML models. Her GreenSort project runs quantized YOLOv8 on a Raspberry Pi 4 for real-time waste sorting with under 180ms loop latency. She handles sensor integration, serial communication, and actuator coordination.",
    },
    {
        question: "What programming languages and frameworks does Sneha use?",
        answer: "Sneha is proficient in Python, Java, C/C++, JavaScript, TypeScript, and SQL. For AI/ML she uses PyTorch, TensorFlow, Keras, Scikit-Learn, and YOLO. For web development: Next.js, React, FastAPI, Flask, and Node.js. For databases: Neo4j, MongoDB, and MySQL. For hardware: Arduino and Raspberry Pi.",
    },
    {
        question: "Is Sneha available for freelance or contract work?",
        answer: "Yes. Sneha is currently open to internships, freelance projects, and contract collaborations in Computer Vision, Machine Learning, IoT prototyping, and Data Engineering. You can reach out through her contact page to discuss project requirements.",
    },
    {
        question: "What certifications does Sneha hold?",
        answer: "Sneha holds certifications from AWS (Machine Learning Foundations), Google Cloud (Data Engineer track), Neo4j (Certified Professional), IBM (Data Analysis with Python), and Cisco Networking Academy (IoT & Cybersecurity). All certifications are verifiable through her portfolio.",
    },
];
