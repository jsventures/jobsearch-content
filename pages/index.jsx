import Head from "next/head";
import { useState } from "react";
import getIndexProps from "../lib/getIndexProps";

// ---
// Data

const PDF_HREF = `https://docs.google.com/viewer?url=https://github.com/nezaj/jobsearch-content/raw/master/build/book/job_search.pdf`;
const CONTACT_HREF = `http://eepurl.com/gkf9pj`;
const TOP_NAV = [
  ["PDF", PDF_HREF],
  ["Stay in touch", CONTACT_HREF],
].map(([title, href]) => ({ title, href }));

// ---
// Components

function svgIconURI(icon) {
  return `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${icon}</text></svg>`;
}

function NavLink({ className, ...props }) {
  return (
    <a
      className={`text-slate-700 hover:text-slate-900 ${className}`}
      {...props}
    />
  );
}

function NavSection({ items }) {
  const [first, ...rest] = items;
  return (
    <>
      <NavLink
        className="block mb-3 lg:mb-2 font-semibold text-slate-900"
        href={`#${first.slug}`}>
        {first.navTitle}
      </NavLink>
      {rest.length ? (
        <ul className="space-y-4 lg:space-y-2 border-l border-slate-100">
          {rest.map(({ navTitle, slug }, idx) => {
            return (
              <li key={idx}>
                <NavLink
                  className="block border-l pl-4 -ml-px border-transparent hover:border-slate-400"
                  href={`#${slug}`}>
                  {navTitle}
                </NavLink>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}

function Prose({ html }) {
  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}

function VideoViewer({ slug, title, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div {...props}>
      {isOpen ? (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${slug}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      ) : (
        <button
          className="
            rounded-lg
            bg-gray-200 hover:bg-gray-300
            hover:drop-shadow-sm
            transition duration-200 ease-in-out
          "
          onClick={() => setIsOpen(true)}>
          <img
            className="w-full rounded-t-lg"
            src={"//i.ytimg.com/vi/" + slug + "/sddefault.jpg"}
          />
          <span className="text-lg font-medium text-slate-700 block w-full p-2">
            Watch "{title}"
          </span>
        </button>
      )}
    </div>
  );
}

function Content({ item, ...props }) {
  return (
    <div {...props}>
      <a name={item.slug}></a>
      <h1 className="text-3xl font-bold mb-4">{item.chapterTitle}</h1>
      {item.videoSlug && (
        <VideoViewer
          className="mb-4"
          slug={item.videoSlug}
          title={item.chapterTitle}
        />
      )}
      <Prose html={item.html} />
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function Home({ content, home }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div>
      <Head>
        <title>Senior Engineer Jobsearch</title>
        <link rel="icon" href={svgIconURI("🌅")} />
        <meta
          name="description"
          content="Land your dream offer in 100 days. Jobsearch course for engineers in major tech hubs. Training in the Mental Game, Communication, and nailing the Algorithms, UI, System Design, Experience Interviews."
        />
      </Head>
      <div className="relative h-screen md:flex">
        <div
          className={`
          h-full
          overflow-scroll
          bg-white
          sidebar 
          w-60
          absolute 
          insavet-y-0 left-0 transform 
          md:relative md:translate-x-0 
          transition duration-200 ease-in-out
          border-r
          ${isMobileMenuOpen ? null : "-translate-x-full"}
        `}>
          <div className="md:hidden text-black sticky right-0 top-0 z-10 bg-white flex px-4 pb-4 pt-4">
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <XIcon />
            </button>
          </div>
          <ul className="text-xs relative px-4 -mt-4 md:mt-0">
            {content.map((items, idx) => (
              <li className="mt-4" key={idx}>
                <NavSection key={idx} items={items} />
              </li>
            ))}
          </ul>
        </div>
        <div className="h-full overflow-scroll flex-1 p-4">
          <div style={{ maxWidth: 650 }}>
            <div className="text-sm mb-4 font-medium text-slate-700 flex items-center -ml-4">
              <button
                className="md:hidden ml-4"
                onClick={(x) => setIsMobileMenuOpen(true)}>
                <MenuIcon />
              </button>
              {TOP_NAV.map(({ title, href }, idx) => (
                <NavLink className="ml-4" key={idx} href={href} target="_blank">
                  {title}
                </NavLink>
              ))}
            </div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">
                The Senior Engineer Jobsearch
              </h1>
              <div className="mb-8">
                <Prose html={home.html} />
              </div>
              <hr />
            </div>
            <div className="space-y-8">
              {content.flat().map((item, idx) => {
                return (
                  <div key={idx}>
                    <Content className="mb-8" item={item} />
                    <hr />
                  </div>
                );
              })}
            </div>
            <div className="border border-slate-400 p-4 mb-4 text-xl">
              <p>
                Want to keep on top new stuff we make?{" "}
                <a
                  className="text-blue-500 hover:text-blue-800"
                  href={CONTACT_HREF}
                  target="_blank">
                  Join our waitlist :)
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: getIndexProps(),
  };
}
