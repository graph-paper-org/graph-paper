#! /bin/bash

mkdir packages/$1
cp template/package.json packages/$1
sed "s/__COMPONENT_NAME__/$1/g" template/package.json > packages/$1/package.json
mkdir packages/$1/stories

cp template/index.js packages/$1/

cp template/template.base.js packages/$1/
sed "s/__COMPONENT_NAME__/$1/g" packages/$1/template.base.js > packages/$1/base.js
rm packages/$1/template.base.js

cp template/style.css packages/$1/style.css

cp template/template.svelte packages/$1/$1.svelte

cp template/template.stories.js packages/$1/stories/
sed "s/__COMPONENT_NAME__/$1/g" packages/$1/stories/template.stories.js > packages/$1/stories/$1.stories.js
rm packages/$1/stories/template.stories.js