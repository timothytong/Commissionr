#!/bin/bash
rm -r build
rm -r node_modules
rm -r flow-typed

yarn install
gulp build
