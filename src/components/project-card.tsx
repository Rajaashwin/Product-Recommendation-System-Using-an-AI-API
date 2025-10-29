import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { Globe, Github, FileText } from "lucide-react";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon?: string;
    title: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  // Helper function to get the right icon
  const getIcon = (iconName?: string) => {
    switch (iconName?.toLowerCase()) {
      case 'github':
        return <Github className="h-3.5 w-3.5" />;
      case 'filetext':
      case 'paper':
        return <FileText className="h-3.5 w-3.5" />;
      case 'globe':
      case 'website':
        return <Globe className="h-3.5 w-3.5" />;
      default:
        return <Globe className="h-3.5 w-3.5" />;
    }
  };

  // Check if this is a paper-only project (has Paper link but no Demo/Website)
  const isPaperOnly = links?.some(link => link.title.toLowerCase() === 'paper') && 
                      !links?.some(link => ['demo', 'website', 'live'].includes(link.title.toLowerCase()));

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden bg-slate-50 dark:bg-[#121417] border border-slate-200 dark:border-transparent hover:shadow-lg hover:shadow-[#06B6D4]/20 transition-all duration-300 ease-out h-full",
        className
      )}
    >
      {/* Image/Video Section */}
      {(video || image) && (
        <>
          {!isPaperOnly ? (
            <Link
              href={href || "#"}
              className="block cursor-pointer"
            >
              {video && (
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none mx-auto h-48 w-full object-cover object-top"
                />
              )}
              {image && !video && (
                <Image
                  src={image}
                  alt={title}
                  width={500}
                  height={300}
                  className="h-48 w-full overflow-hidden object-cover object-top"
                />
              )}
            </Link>
          ) : (
            <div className="block">
              {video && (
                <video
                  src={video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pointer-events-none mx-auto h-48 w-full object-cover object-top"
                />
              )}
              {image && !video && (
                <Image
                  src={image}
                  alt={title}
                  width={500}
                  height={300}
                  className="h-48 w-full overflow-hidden object-cover object-top"
                />
              )}
            </div>
          )}
        </>
      )}

      {/* Header Section */}
      <CardHeader className="px-4 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-[#E5E7EB]">
            {title}
          </CardTitle>
          {dates && (
            <time className="font-sans text-xs text-slate-700 dark:text-[#E5E7EB]">
              {dates}
            </time>
          )}
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="px-4 pb-2 flex-grow">
        <Markdown className="prose max-w-full text-pretty font-sans text-sm text-slate-700 dark:text-[#E5E7EB] dark:prose-invert">
          {description}
        </Markdown>
        
        {/* Technology Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-2 py-0.5 text-[10px] bg-slate-100 dark:bg-[#1E293B] text-[#06B6D4] border border-[#06B6D4]/50 dark:border-[#06B6D4]/30 hover:bg-[#06B6D4]/10"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {/* Footer with Action Buttons */}
      <CardFooter className="px-4 pb-4 pt-2">
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-2 w-full">
            {links?.map((link, idx) => (
              <Link 
                href={link?.href} 
                key={idx} 
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-medium rounded-md bg-transparent text-[#06B6D4] border border-[#06B6D4] hover:bg-[#06B6D4] hover:text-white transition-all duration-200"
              >
                {getIcon(link.icon)}
                <span>{link.title}</span>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
