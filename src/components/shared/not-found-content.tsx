"use client";

/*
      - Not Found Content

      • Client-only component — intentionally not a Server Component because it depends on :
            - `framer-motion` for entrance animations (incompatible with RSC) - Interactive UI elements (Button, Link)
      
      • IMPORTANT :
            - Never import this component through a server barrel file (e.g. index.ts). 
            - Doing so breaks the "use client" boundary and causes runtime errors.
*/

import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Undo2Icon } from 'lucide-react';

/*
      • Props contract for the NotFoundContent component.
            - All display content is injected from the server-level `not-found.tsx` file.
            - Keeping the component purely presentational makes it reusable and easy to localise or drive from a CMS in the future.
*/

export type NotFoundProps = {
      data: {
            status_code: string;       /* HTTP-like status code displayed as a prominent heading (e.g. "404"). */

            status_title: string;      /* Short, user-facing title that explains the error. */

            status_description: string;      /* Longer description that provides context and guidance for recovery. */

            status_back_label: string;       /* Visible label for the recovery CTA button. */

            status_back_link: string;        /* Destination URL for the recovery CTA. Must be a valid internal path. */
      }
};

function NotFoundContent({ data }: NotFoundProps) {

      const { status_code, status_title, status_description, status_back_label, status_back_link, } = data;

      return (
            <div aria-label={`Error ${status_code}: ${status_title}`} className="px-4 flex items-center justify-center min-h-screen">
                  <motion.div
                        /*
                              • Motion wrapper for entrance animation.
                                    - Subtle entrance animation improves perceived quality without harming performance or accessibility.
                                    - Animation runs only once on mount.
                        */

                        className="flex flex-col items-center text-center"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                  >
                        {/*
                              ---------------------------------------------------------------------------------------
                              Status Header: Prominent Code + Vertical Separator + Title
                              ---------------------------------------------------------------------------------------
                        */}
                        <div 
                              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 mb-5 sm:mb-3" aria-label={`${status_code} — ${status_title}`}
                              
                              /* Announce the combined heading as a single unit for screen readers. */
                              role="group"
                             
                        >
                              {/* Status code (e.g. 404) */}
                              <h1 className="text-2xl tracking-wider font-medium text-zinc-800">{status_code}</h1>

                              {/* Decorative separator — hidden from assistive technology */}
                              <div className="hidden sm:block border-l border-border h-10" aria-hidden="true" />

                              {/* Status title rendered as a paragraph to avoid redundant headings */}
                              <p className="text-[1rem] tracking-wide font-medium text-zinc-800">{data.status_title}</p>
                        </div>

                        {/*
                              ---------------------------------------------------------------------------------------
                              Status Description
                              ---------------------------------------------------------------------------------------
                        */}
                        <p className="max-w-lg text-zinc-600 text-[0.92rem] tracking-wider mb-6" aria-label={status_description}>{data.status_description}</p>

                        {/*
                              ---------------------------------------------------------------------------------------
                              • Recovery CTA
                                    - `asChild` lets Button pass its styles to the <Link> element, preserving correct <a> semantics for navigation.
                              ---------------------------------------------------------------------------------------
                        */}
                        <Button asChild variant="ghost" className="text-zinc-800 text-[0.9rem] tracking-wider rounded select-none hover:bg-transparent">
                              <Link
                                    href={status_back_link} className="hover:underline"

                                    /* Descriptive label for screen readers that conveys intent clearly */
                                    aria-label={status_back_label}
                              >
                                    <Undo2Icon 
                                          size={20} className="mr-2"
                                          
                                          /* Icon is decorative; the adjacent text already describes the action */
                                          aria-hidden="true"
                                    />

                                    {/* Label text must be rendered here — omitting it makes the button visually empty. */}
                                    {status_back_label}
                              </Link>
                        </Button>
                  </motion.div>
            </div>
      );
}

export default NotFoundContent;