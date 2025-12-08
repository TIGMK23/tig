'use client'

import React, { Suspense } from 'react';
import Image from 'next/image';
import { ShieldCheck, Lightbulb, BarChart3, type LucideIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import ContactForm with loading state
const ContactForm = dynamic(() => import('./components/ContactForm'), {
  loading: () => <LoadingPlaceholder className="h-96" />
});

// Reusable loading placeholder component
const LoadingPlaceholder: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-100 rounded-lg ${className}`} />
);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

// Types
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}

// Data
const features = [
  {
    icon: ShieldCheck,
    title: "Governance & Risk Management",
    description: "Expert guidance in procurement governance, cyber compliance, and third-party risk management, helping organizations build robust frameworks for sustainable growth."
  },
  {
    icon: BarChart3,
    title: "Business Transformation",
    description: "Comprehensive services including target operating models, process optimization, and cost reduction programs, delivered with strategic insight and practical expertise."
  },
  {
    icon: Lightbulb,
    title: "Digital Innovation",
    description: "Pioneering solutions through AI/LLM implementations, SaaS platforms, and innovative digital tools that drive operational excellence."
  }
] as const;

const achievements = [
  "Current State Assessments",
  "Operating Models",
  "Process Optimization",
  "Risk Management",
  "Cost Reduction",
  "Digital Innovation"
] as const;

// Components
const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay }}
    className="group rounded-xl p-8 transition-all duration-300 
               hover:translate-y-[-2px] hover:shadow-lg bg-white/90 
               backdrop-blur-sm border border-gray-100"
  >
    <Icon className="h-12 w-12 mb-6 text-purple-600/90 transition-transform 
                    duration-300 group-hover:scale-110" />
    <h3 className="text-xl font-medium tracking-tight mb-4 bg-gradient-to-r 
                   from-gray-900 to-gray-700 bg-clip-text text-transparent">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

const GradientText: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <span className={`bg-gradient-to-r from-gray-900 to-gray-700 
                    bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

const Page: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.header 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
          className="py-6"
        >
          <Image
            src="/logo.png"
            alt="The Innovator"
            width={180}
            height={72}
            className="h-16 w-auto"
            priority
          />
        </motion.header>

        {/* Hero Section */}
        <motion.section 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="py-16 md:py-24"
        >
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight max-w-4xl">
            <GradientText>
              Transforming Business Through Strategic Excellence
            </GradientText>
          </h1>
          <p className="mt-8 text-xl text-gray-600 max-w-2xl leading-relaxed">
            Delivering exceptional outcomes in governance, risk management, and digital 
            transformation through strategic insight and proven expertise.
          </p>
        </motion.section>

        {/* Features Grid */}
        <section className="py-12 md:py-16" aria-label="Core Services">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={feature.title} 
                {...feature} 
                delay={index * 0.2} 
              />
            ))}
          </div>
        </section>

        {/* Vision Statement */}
        <motion.section 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-12 py-16 bg-white/80 backdrop-blur-sm rounded-2xl 
                     border border-gray-100"
        >
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-semibold text-center leading-tight">
              <GradientText>
                Leading with integrity,<br />
                delivering with excellence
              </GradientText>
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
              {achievements.map((achievement, index) => (
                <React.Fragment key={achievement}>
                  <span className="text-sm font-medium text-gray-600 
                                 hover:text-purple-600 transition-colors 
                                 duration-300 cursor-default">
                    {achievement}
                  </span>
                  {index < achievements.length - 1 && (
                    <span className="w-1 h-1 bg-gray-300 rounded-full" 
                          aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Trust Section */}
        <motion.section 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">
              <GradientText>A Partner You Can Trust</GradientText>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Known for being diligent, flexible, and leading by example. 
              Bringing strategic insights and innovative approaches to every engagement, 
              while building long-term relationships based on trust and proven results.
            </p>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-12" 
          aria-label="Contact Us"
        >
          <div className="max-w-2xl mx-auto">
            <Suspense fallback={<LoadingPlaceholder className="h-96" />}>
              <ContactForm />
            </Suspense>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Copyright © 2016-{currentYear}. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Page;