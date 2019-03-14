MAKEFLAGS = --no-print-directory --always-make --silent
MAKE = make $(MAKEFLAGS)

.PHONY: clean pre-process md-to-pdf book

BUILD_DIR = 'build'

BUILDER = 'builder.mdpp'
PREPROCESS = 'preprocessed.md'
BOOK_OUTPUT = 'Mastering The Job Search.pdf'

BUILDER_PATH = $(BUILDER)
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
	pandoc -o $(BOOK_PATH) $(PREPROCESSED_PATH) \
		--toc --toc-depth=2 \
		--include-in-header titlesec.tex

book:
	@echo "Creating book..."
	mkdir -p $(BUILD_DIR)
	$(MAKE) pre-process
	$(MAKE) md-to-pdf
	open $(BOOK_PATH)
