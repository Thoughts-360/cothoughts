import NotFoundContent from "@/components/shared/not-found-content";
import { Metadata } from "next";

/*
      • Server component — intentionally has no "use client" directive.
      - All data is defined here and passed down to the client component as props - This keeps NotFoundContent purely presentational and CMS/i18n-ready.
*/

export const metadata: Metadata = {
      title: 'Page Not Found | CoThoughts',
      description: 'The page you are looking for does not exist or has been moved',

      robots: {
            index: false,
            follow: true,
            googleBot: {
                  index: false,
                  follow: true,
                  noimageindex: true,
            },
      },

      /* Canonical points to the homepage — signals to crawlers that "/" is the authoritative destination when someone lands on a broken URL. */
      alternates: {
            canonical: '/',
      },

      /* Controls how a mistakenly shared 404 URL appears in social previews. Prevents the broken URL from being surfaced or cached by platforms. */
      openGraph: {
            title: 'Page Not Found | CoThoughts',
            description: 'The page you are looking for does not exist or has been moved.',
            url: '/',
            siteName: 'CoThoughts',
      },
};

function NotFound() {
      return (
            <NotFoundContent
                  data={{
                        status_code: "404",
                        status_title: "Oops! That Page Isn't Here.",
                        status_description: "Sorry, this page doesn’t exist. It may possibly have been moved, or the url you entered is incorrect.",
                        status_back_label: "Back to Home",
                        status_back_link: "/",
                  }}
            />
      );
}

export default NotFound;