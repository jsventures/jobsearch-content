# Senior Engineer Job Search Content

Repo for course.jobsearch.dev

### Building the static site (web_content)

To build the site, make sure you have rust installed, then install mdbook.

1. Go to [this site](https://www.rust-lang.org/tools/install) for a quick curl to install rust & cargo
2. Then run `cargo install mdbook`
3. Once done, you can run `make dev`, and view the beauty on localhost:3000

### Deploying the static site

We use github pages to host our static content. Deploying is easy:

```
make deploy
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

### Building transcripts (deprecated)
*Previously we would use this to re-generate individual PDFs of our content. This is somewhat deprecated now given that we use mdbook
to serve a static site and have no need to link to individual transcripts. Nonetheless will keep this for now and potentially
delete it later.*

You can build all the transcripts by running the following command
```
make all-transcripts
```
You can build an individual transcript by doing the following
```
FILE=path/to/raw/file.md make transcript
```

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
- Use mdbook to host a GH site of the contenet
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
