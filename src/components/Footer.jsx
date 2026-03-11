export function Footer() {
  return (
    <footer className="pt-2 text-[0.7rem] text-zinc-500 space-y-2 border-t border-zinc-900 mt-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
        <div className="flex gap-4">
          <button className="hover:text-accent transition-colors">
            About
          </button>
          <button className="hover:text-accent transition-colors">
            Contact
          </button>
          <button className="hover:text-accent transition-colors">
            Policies
          </button>
        </div>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/vedant_trivedi_8"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            X
          </a>
          <a
            href="https://github.com/Vedant08-blip/Lace-Up-Labs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Github
          </a>
        </div>
      </div>
      <p className="text-xs text-zinc-600">
        © {new Date().getFullYear()} Lace Up Labs. All rights reserved.
      </p>
      <p className="text-xs text-red-500 hover:text-zinc-600 transition-colors cursor-pointer">
        Managed and Developed by Vedant Trivedi
      </p>
    </footer>
  );
}

export default Footer;

