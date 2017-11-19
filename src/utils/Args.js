'use strict';

import ArgParse from 'minimist';

const argv = ArgParse(process.argv.slice(2));

export const REGEN_LOCAL_DB = process.env.NODE_ENV !== 'production' && argv['regenDb'] === true;
