"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  impact?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  links?: readonly {
    type: string;
    href: string;
    icon?: React.ReactNode;
  }[];
  redacted?: boolean;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  impact,
  href,
  badges,
  period,
  description,
  links,
  redacted,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggle = () => setIsExpanded((v) => !v);

  const card = (
    <Card className="flex border-border/60 bg-card/40">
      <div className="flex-none">
        <Avatar className={cn(
          "border size-12 m-auto bg-muted-background dark:bg-foreground",
          redacted && "rounded-lg"
        )}>
          <AvatarImage
            src={logoUrl}
            alt={altText}
            className={cn("object-contain", redacted && "scale-75")}
          />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="group ml-4 flex min-w-0 flex-grow flex-col items-center">
        <CardHeader className="w-full px-0 py-3">
          <div className="flex items-center justify-between gap-x-2 text-base">
            <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm gap-x-2">
              <span className={cn(redacted && "blur-[3px] select-none")}>{title}</span>
              {badges && (
                <span className="inline-flex gap-x-1">
                  {badges.map((badge, index) => (
                    <Badge
                      variant="secondary"
                      className="align-middle text-xs"
                      key={index}
                    >
                      {badge}
                    </Badge>
                  ))}
                </span>
              )}
              <ChevronRightIcon
                className={cn(
                  "size-4 translate-x-0 transform opacity-70 transition-all duration-300 ease-out",
                  isExpanded ? "rotate-90" : "rotate-0"
                )}
              />
            </h3>
            <div className="text-right text-xs tabular-nums text-muted-foreground sm:text-sm">
              {period}
            </div>
          </div>
          {subtitle && <div className="pt-1 font-sans text-xs text-muted-foreground">{subtitle}</div>}
          {impact && (
            <div className="w-full truncate pt-0.5 font-sans text-xs text-muted-foreground/80">
              {impact}
            </div>
          )}
        </CardHeader>
        {description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? "auto" : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden pb-2 text-xs text-muted-foreground sm:text-sm"
          >
            {description}
            {links && links.length > 0 && (
              <div className="mt-2 flex flex-row flex-wrap items-start gap-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    tabIndex={isExpanded ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Badge className="flex gap-2 px-2 py-1 text-[10px]">
                      {link.icon}
                      {link.type}
                    </Badge>
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  );

  if (description) {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        className="block cursor-pointer"
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
      >
        {card}
      </div>
    );
  }

  return (
    <Link href={href || "#"} className="block cursor-pointer">
      {card}
    </Link>
  );
};
