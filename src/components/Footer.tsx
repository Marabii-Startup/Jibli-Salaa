import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Jibli. All rights reserved.</p>
        <div className="mt-4">
          <Link href="/terms" className="hover:underline mx-2">
            Terms of Service
          </Link>
          |
          <Link href="/privacy" className="hover:underline mx-2">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
