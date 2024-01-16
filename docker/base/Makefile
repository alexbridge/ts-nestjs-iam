SHELL := /bin/bash

.DEFAULT:
_recipe-list:
	@recipe=$$(grep -oE '^[a-z][a-zA-Z0-9-]+:' Makefile | tr -d ':' | \
	fzf --preview 'make --silent -n {} | head -n 5' --preview-window=50%:down); \
	[[ -n "$$recipe" ]] && make --silent $$recipe

local-start: local-stop local-config
	docker compose -f docker-compose.local.yml up -d --wait

local-stop: 
	docker compose -f docker-compose.local.yml down --volumes

local-config:
	docker compose -f docker-compose.local.yml config > /dev/null 2>&1 || exit 1
	echo "Docker compose config ok ✔"
