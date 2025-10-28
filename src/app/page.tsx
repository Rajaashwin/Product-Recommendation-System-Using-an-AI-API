
"use client";

import React from "react";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/icons";
import { MapPin, Phone, Mail } from "lucide-react";
import DATA from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { CertificationAccordion } from "@/components/certification-accordion";
import { LanguageAccordion } from "@/components/language-accordion";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Remove #projects hash when scrolling away from projects section
      if (window.location.hash === "#projects") {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          const rect = projectsSection.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;
          const currentScroll = window.scrollY;

          // Remove hash if scrolled past the projects section (with buffer)
          if (
            currentScroll > sectionBottom + 100 ||
            currentScroll < sectionTop - 100
          ) {
            window.history.replaceState(null, "", window.location.pathname);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Also remove hash when clicking scroll to top button
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] space-y-10 pb-12">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white shadow-lg hover:shadow-[#06B6D4]/50 transition-all hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-[#06B6D4] via-[#22D3EE] to-[#06B6D4] bg-clip-text text-transparent"
                  yOffset={8}
                  text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
                />
                <span className="text-3xl sm:text-5xl xl:text-6xl">👋</span>
              </div>
              <BlurFadeText
                className="max-w-[600px] md:text-xl text-muted-foreground"
                delay={BLUR_FADE_DELAY}
                text="AI/ML Developer specializing in NLP and data engineering."
              />
            </div>
            {/* avatar removed */}
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex gap-4 mt-6">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#06B6D4] text-[#06B6D4] font-medium hover:bg-[#06B6D4] hover:text-white transition-all hover:shadow-lg hover:shadow-[#06B6D4]/30"
              >
                Get Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white font-medium hover:shadow-lg hover:shadow-[#06B6D4]/50 transition-all"
              >
                Contact Me
              </a>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
                About
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
                  Driven by curiosity and precision, I turn data into intelligent systems
                </span>
              </h2>
              <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From building NLP models with Transformers to engineering scalable data pipelines with Docker and Flask, 
                each project and certification has shaped my journey toward mastering the AI–ML ecosystem. 
                My achievements aren&apos;t measured in numbers—they&apos;re reflected in every model that learns, adapts, and performs better than before.
              </p>
            </div>
          </div>
        </BlurFade>
      </section>

      <section id="work">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
                  Work Experience
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
                    My Professional Journey
                  </span>
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Building AI solutions and data pipelines across multiple roles and industries.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="flex min-h-0 flex-col gap-y-3 max-w-2xl mx-auto">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="education">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
                  Education
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
                    Academic Background
                  </span>
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My educational foundation in computer science and engineering.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="flex min-h-0 flex-col gap-y-3 max-w-2xl mx-auto">
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
                  Skills
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
                    Technical Expertise
                  </span>
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Technologies and tools I work with to build intelligent solutions.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="max-w-2xl mx-auto">
            {DATA.skillsByCategory ? (
              <div className="space-y-4">
                {DATA.skillsByCategory.map((group, gid) => (
                  <div key={group.category} className="space-y-2">
                    <BlurFade delay={BLUR_FADE_DELAY * 10 + gid * 0.05}>
                      <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        {group.category}
                      </h3>
                    </BlurFade>
                    <div className="flex flex-wrap gap-1">
                      {group.skills.map((skill, sid) => (
                        <BlurFade
                          key={skill}
                          delay={BLUR_FADE_DELAY * 11 + (gid + sid) * 0.02}
                        >
                            <span key={skill} className="px-3 py-1 border border-[#06B6D4] text-[#06B6D4] rounded-lg text-sm font-semibold bg-transparent">{skill}</span>
                        </BlurFade>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1">
                {DATA.skills.map((skill, id) => (
                  <BlurFade
                    key={skill}
                    delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                  >
                      <span key={skill} className="px-3 py-1 border border-[#06B6D4] text-[#06B6D4] rounded-lg text-sm font-semibold bg-transparent">{skill}</span>
                  </BlurFade>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
                    Check out my latest work
                  </span>
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve built a range of AI-driven solutions — from deep learning models to scalable backend systems — here are some of my key highlights.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="w-full max-w-[800px] mx-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="gap-3">
                  {DATA.projects.map((project, id) => (
                    <td key={project.title} className="align-top p-1.5 w-1/2">
                      <BlurFade delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
                        <ProjectCard
                          href={project.href}
                          title={project.title}
                          description={project.description}
                          dates={project.dates}
                          tags={project.technologies}
                          image={project.image}
                          video={project.video}
                          links={project.links}
                        />
                      </BlurFade>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="achievements">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
                  Relevant Coursework
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
                    Certifications
                  </span>
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I completed every certification with one goal — to keep learning, exploring, and pushing the boundaries of what I can create with AI and data.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <div className="flex flex-col gap-2 justify-center max-w-[700px] mx-auto">
              {DATA.certifications?.map((cert, idx) => (
                <CertificationAccordion key={cert.title + cert.year} cert={cert} idx={idx} />
              ))}
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="languages" className="w-full py-12">
  <div className="space-y-8 max-w-2xl mx-auto text-center">
    <div>
      <span className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
        Languages
      </span>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight mt-2">
        <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
          Languages I Speak
        </span>
      </h2>
      <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-2">
        Communication is key. Here are the languages I use every day.
      </p>
    </div>
    <div className="flex flex-col gap-4 items-center">
      {DATA.languages.map((lang, idx) => (
        <LanguageAccordion
          key={lang.name}
          lang={lang}
          idx={idx}
        />
      ))}
    </div>
  </div>
</section>

      <section id="contact">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
                  Contact
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
                    Get in Touch
                  </span>
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Want to chat? Just shoot me a dm with a direct question and I&apos;ll respond whenever I can. I will ignore all soliciting.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Contact Info Badges */}
            <BlurFade delay={BLUR_FADE_DELAY * 17}>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] p-3 rounded-full shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <a 
                    href={`mailto:${DATA.email}`} 
                    className="text-base font-normal text-slate-900 dark:text-[#E5E7EB] hover:text-[#06B6D4] transition-colors"
                  >
                    {DATA.email}
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] p-3 rounded-full shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <a 
                    href={`tel:${DATA.phone}`} 
                    className="text-base font-normal text-slate-900 dark:text-[#E5E7EB] hover:text-[#06B6D4] transition-colors"
                  >
                    {DATA.phone}
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] p-3 rounded-full shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <a 
                    href={DATA.locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-normal text-slate-900 dark:text-[#E5E7EB] hover:text-[#06B6D4] transition-colors"
                  >
                    {DATA.location}
                  </a>
                </div>
              </div>
            </BlurFade>
            {/* Contact Form */}
            <form 
              action="https://formsubmit.co/aswinraja98@gmail.com" 
              method="POST"
              className="space-y-6"
            >
              {/* Honeypot for spam protection */}
              <input type="text" name="_honey" style={{ display: 'none' }} />
              
              {/* Disable captcha */}
              <input type="hidden" name="_captcha" value="false" />
              
              {/* Success page redirect */}
              <input type="hidden" name="_next" value="https://aswinraja-portfolio.github.io/" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-[#E5E7EB]">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="w-full p-3 rounded-lg bg-slate-50 dark:bg-[#1E293B] border-2 border-slate-200 dark:border-[#1F2937] focus:border-[#06B6D4] outline-none transition-all text-slate-900 dark:text-[#E5E7EB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900 dark:text-[#E5E7EB]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@doe.com"
                    required
                    className="w-full p-3 rounded-lg bg-slate-50 dark:bg-[#1E293B] border-2 border-slate-200 dark:border-[#1F2937] focus:border-[#06B6D4] outline-none transition-all text-slate-900 dark:text-[#E5E7EB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-[#E5E7EB]">
                  Message
                </label>
                <textarea 
                  name="message"
                  placeholder="Type your message...."
                  required
                  className="w-full p-4 rounded-lg bg-slate-50 dark:bg-[#1E293B] border-2 border-slate-200 dark:border-[#1F2937] focus:border-[#06B6D4] outline-none transition-all resize-none min-h-[120px] text-slate-900 dark:text-[#E5E7EB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF]"
                />
              </div>
              <div className="flex justify-between items-center">
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-[#06B6D4]/50 transition-all"
                >
                  Send
                  <Icons.email className="h-4 w-4" />
                </button>
                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  <a
                    href={DATA.contact.social.GitHub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-slate-100 dark:bg-[#1E293B] hover:bg-[#06B6D4] dark:hover:bg-[#06B6D4] transition-all hover:scale-110"
                  >
                    <Icons.github className="h-5 w-5 text-slate-700 dark:text-[#E5E7EB] hover:text-white" />
                  </a>
                  <a
                    href={DATA.contact.social.LinkedIn.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-slate-100 dark:bg-[#1E293B] hover:bg-[#06B6D4] dark:hover:bg-[#06B6D4] transition-all hover:scale-110"
                  >
                    <Icons.linkedin className="h-5 w-5 text-slate-700 dark:text-[#E5E7EB] hover:text-white" />
                  </a>
                  <a
                    href="https://medium.com/@aswinraja98"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-slate-100 dark:bg-[#1E293B] hover:bg-[#06B6D4] dark:hover:bg-[#06B6D4] transition-all hover:scale-110"
                  >
                    <Icons.medium className="h-5 w-5 text-slate-700 dark:text-[#E5E7EB] hover:text-white" />
                  </a>
                  <a
                    href="https://www.kaggle.com/ashwin0001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-slate-100 dark:bg-[#1E293B] hover:bg-[#06B6D4] dark:hover:bg-[#06B6D4] transition-all hover:scale-110"
                  >
                    <Icons.kaggle className="h-5 w-5 text-slate-700 dark:text-[#E5E7EB] hover:text-white" />
                  </a>
                  <a
                    href={`mailto:${DATA.email}`}
                    className="p-3 rounded-full bg-slate-100 dark:bg-[#1E293B] hover:bg-[#06B6D4] dark:hover:bg-[#06B6D4] transition-all hover:scale-110"
                  >
                    <Icons.email className="h-5 w-5 text-slate-700 dark:text-[#E5E7EB] hover:text-white" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-slate-200 dark:border-[#1F2937]">
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-[#9CA3AF]">
            © Developer Portfolio by Ashwin Rajakannan
          </p>
        </div>
      </footer>
    </div>
  );
}
