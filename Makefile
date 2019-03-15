MAKEFLAGS = --no-print-directory --always-make --silent
MAKE = make $(MAKEFLAGS)

.PHONY: clean pre-process md-to-pdf book all-transcripts transcript

# Raw content files
RAW_CONTENT_DIR = 'content'
RAW_EXT = '.md'
RAW_CONTENT_FILES := $(shell find $(RAW_CONTENT_DIR) -name "*.md")

# Generated files
BUILD_DIR = 'build'

## Transcripts
TRANSCRIPTS_EXT = '.pdf'
TRANSCRIPTS_DIR = $(BUILD_DIR)\/transcripts

## E-book
BUILDER = 'builder.mdpp'
PREPROCESS = 'preprocessed.md'
BOOK_OUTPUT = 'job_search.pdf'
METADATA = 'metadata.yaml'
BUILDER_PATH = $(BUILDER)
META_PATH = $(METADATA)
BOOK_DIR = $(BUILD_DIR)/book
PREPROCESSED_PATH = $(BOOK_DIR)/$(PREPROCESS)
BOOK_PATH = $(BOOK_DIR)/$(BOOK_OUTPUT)

clean:
	@echo "Deleting files..."
	find $(BUILD_DIR) -name "*.md" -print -delete
	find $(BUILD_DIR) -name "*.pdf" -print -delete
	rm -rfv $(BUILD_DIR)

pre-process:
	# Intermediate step in building book, compiles individual markdown files
	# into one
	@echo "Converting mdpp to md..."
	markdown-pp $(BUILDER_PATH) -o $(PREPROCESSED_PATH)

md-to-pdf:
	# Intermediate step in building book, converts compiled markdown to pdf
	@echo "Converting md to pdf..."
	pandoc -o $(BOOK_PATH) $(META_PATH) $(PREPROCESSED_PATH) \
		--toc --toc-depth=2 \
		--include-in-header titlesec.tex

book:
	# Used for building book
	@echo "Creating book..."
	mkdir -p $(BUILD_DIR)
	mkdir -p $(BOOK_DIR)
	$(MAKE) pre-process
	$(MAKE) md-to-pdf
	open $(BOOK_PATH)

all-transcripts:
	# Used for building all transcripts
	@echo "Creating transcripts from raw content..."
	mkdir -p $(BUILD_DIR)
	mkdir -p $(TRANSCRIPTS_DIR)
	for file in $(RAW_CONTENT_FILES); do \
		NEW_FILE=$$(sed -e 's/$(RAW_CONTENT_DIR)/$(TRANSCRIPTS_DIR)/; s/$(RAW_EXT)/$(TRANSCRIPTS_EXT)/' <<< $$file); \
		echo "Creating $$NEW_FILE from $$file..."; \
		NEW_DIR=$$(dirname $$NEW_FILE); \
		mkdir -p $$NEW_DIR; \
		pandoc $$file -o $$NEW_FILE; \
	done

transcript:
	# Used for building one transcript
	mkdir -p $(BUILD_DIR)
	mkdir -p $(TRANSCRIPTS_DIR)
	for file in $(FILE); do \
		NEW_FILE=$$(sed -e 's/$(RAW_CONTENT_DIR)/$(TRANSCRIPTS_DIR)/; s/$(RAW_EXT)/$(TRANSCRIPTS_EXT)/' <<< $$FILE); \
		echo "Creating $$NEW_FILE from $$file"; \
		NEW_DIR=$$(dirname $$NEW_FILE); \
		echo $$NEW_DIR; \
		mkdir -p $$NEW_DIR; \
		pandoc $$file -o $$NEW_FILE; \
	done
