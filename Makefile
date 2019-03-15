MAKEFLAGS = --no-print-directory --always-make --silent
MAKE = make $(MAKEFLAGS)

.PHONY: clean pre-process md-to-pdf book transcripts

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
PREPROCESSED_PATH = $(BUILD_DIR)/$(PREPROCESS)
BOOK_PATH = $(BUILD_DIR)/$(BOOK_OUTPUT)

clean:
	@echo "Deleting files..."
	find $(BUILD_DIR) -name "*.md" -print -delete
	find $(BUILD_DIR) -name "*.pdf" -print -delete
	rm -rfv $(BUILD_DIR)

pre-process:
	@echo "Converting mdpp to md..."
	markdown-pp $(BUILDER_PATH) -o $(PREPROCESSED_PATH)

md-to-pdf:
	@echo "Converting md to pdf..."
	pandoc -o $(BOOK_PATH) $(META_PATH) $(PREPROCESSED_PATH) \
		--toc --toc-depth=2 \
		--include-in-header titlesec.tex

book:
	@echo "Creating book..."
	mkdir -p $(BUILD_DIR)
	$(MAKE) pre-process
	$(MAKE) md-to-pdf
	open $(BOOK_PATH)

transcripts:
	@echo "Creating individual transcripts from raw content..."
	mkdir -p $(TRANSCRIPTS_DIR)
	for file in $(RAW_CONTENT_FILES); do \
		NEW_FILE=$$(sed -e 's/$(RAW_CONTENT_DIR)/$(TRANSCRIPTS_DIR)/; s/$(RAW_EXT)/$(TRANSCRIPTS_EXT)/' <<< $$file); \
		echo "Creating $$NEW_FILE from $$file..."; \
		NEW_DIR=$$(dirname $$NEW_FILE); \
		mkdir -p $$NEW_DIR; \
		pandoc $$file -o $$NEW_FILE; \
	done
