# Senior Engineer Job Search Content
Repo for the text accompaniment for www.jobsearch.dev

### Building the e-book
Building the e-book requires the following (examples given for OSX machines):

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
pip install markdown-pp
```

After installing all dependencies you can re-generate a fresh copy of the book by running
```
make book
```

The book should now open up in preview. If it doesn't you can find it under the `build` folder

### Building transcripts
You can build all the transcripts individually by running the following command
```
make transcripts
```
