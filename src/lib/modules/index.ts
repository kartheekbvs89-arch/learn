import { Module } from '../types';
import { pythonModule } from './python';
import { fastapiModule } from './fastapi';
import { sqlalchemyModule } from './sqlalchemy';
import { dockerModule } from './docker';
import { mlModule } from './ml';
import { devopsModule } from './devops';

export const allModules: Module[] = [
  pythonModule,
  fastapiModule,
  sqlalchemyModule,
  dockerModule,
  mlModule,
  devopsModule,
];

export type { Module } from '../types';
