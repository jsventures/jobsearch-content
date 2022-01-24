# Senior Engineer Job Search Content

Repo for course.jobsearch.dev

### Developing static site

We run on next. 

```
npm i
npm run dev
```

### Deploying the static site

The site is deployed on vercel

```
git push
```

### Building the pdf e-book (content -> build)

We offer an accompanying pdf of all our content. Building the e-book requires the following (examples given for OSX machines):

```
# Install pandoc
brew install pandoc

# Install latex
# For OSX machines we can just install basictex
# Note: You may need to update your $PATH variable after installation to include the texbin utilities
# on my machine this meant including /Library/TeX/texbin in $PATH
brew install basictex

# Install titlesec
# Titlesec is a package used by latex for formatting. We use it to provide some custom styling
sudo tlmgr install titlesec

# Install python packages
# We use markdown-pp to concatenate all our individual markdown files and apply chapter titles
# You will need to install python and pip on your machine if you haven't already
pip install MarkdownPP
```

After installing all dependencies you can re-generate a fresh copy of the book by running

```
make book
```

The book should now open up in preview. If it doesn't you can find it under the `build` folder

## Notes

#### V0: April 2019 (The beginning)
Everything is on wordpress. we have pdf generation. All the content lives in `content` and `build`
- `content` stores raw markdown, `build` keeps the pdfs
- we copy this repo inside our wordpress theme, which lets us link to the pdfs

#### V1: December 2019 (Remove sign-ups)
We decide to remove signup. This means:
- We'll keep wordpress _just_ for the landing page
    - (note: we _could_ have this be a static page, but there's no hurry)
    - We still have sign-ups / course-links on wordpress, but there are no direct links to them
        - [Someday/Maybe]: Hard remove sign-up / course-links from wordpress
- Use mdbook v0.3.1 to host a GH site of the contenet
- To achieve this:
    - we introduce new directories and files to support mdbook
        - `web_content`, is a copy of our content with slight modifications that aren't compatible with our pdf generation
            - we include iframe urls in every md file
            - we updated `05_communicating_signal` to include a few links
        - `web_build`, the mdbook-built version of `web_content`
        - `theme` to insert a top header
        - `book.toml` to configure mdbook
    - book pdf still works the same:
        - `titlesec.tex`, `builder.mdpp`, `content` as the source, `build` is what outputs the individual and book pdf files
    - We use CloudFlare for DNS configuration.
    - We use Wordpress with WPEngine to host the landing page and email sign up
    - We use mailchimp to collect emails
    - We use Github pages with a custom to host the static content

#### V2: January 2022 (Revamp)
- Merge jobsearch.dev and course.jobsearch.dev
- Use next.js instead of mdbook and friends