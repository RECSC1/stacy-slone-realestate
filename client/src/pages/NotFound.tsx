import { Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="section-dark flex min-h-[70vh] w-full items-center justify-center px-5 py-20">
      <div className="w-full max-w-lg text-center">
        <p className="eyebrow text-accent-light">Page Not Found</p>
        <h1 className="mt-4 font-serif text-6xl text-[#fbf6ef]">404</h1>
        <div className="mx-auto mt-6 h-px w-20 bg-accent" />
        <p className="mt-6 leading-relaxed text-[#fbf6ef]/75">
          The page you are looking for doesn&apos;t exist. It may have been moved
          or renamed. Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/">
            <button className="btn-on-dark inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back Home
            </button>
          </Link>
          <Link href="/contact">
            <button className="btn-outline-light">Contact Stacy</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
