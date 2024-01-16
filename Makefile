SHELL := /bin/bash

FZF_DEFAULT_OPTS ?='--height 50% --layout=reverse --border --exact'

.DEFAULT:
_recipe-list:
	@recipe=$$(grep -oE '^[a-z][a-zA-Z0-9-]+:' Makefile | tr -d ':' | \
	fzf --preview 'make --silent -n {} | head -n 5' --preview-window=50%:down); \
	[[ -n "$$recipe" ]] && make --silent $$recipe

# Interactive NPM
npmi:
	# Interactive npm scripts
	script=$$(jq -r '.scripts | to_entries[] | "\(.key) => \(.value)"' < package.json | sort | fzf | cut -d' ' -f1); \
	[ -n "$$script" ] && npm run $$script

# Migrations
migration-create:
	@read -p "New migration name: " name; \
	npm run migration:create src/data/migrations/$$name
migration-generate:
	@read -p "Name to scan from domain: " name; \
	npm run migration:generate src/data/migrations/$$name
