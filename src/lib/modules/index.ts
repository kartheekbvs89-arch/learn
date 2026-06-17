import { Module } from '../types';
import { pythonModule } from './python';
import { fastapiModule } from './fastapi';
import { sqlalchemyModule } from './sqlalchemy';
import { dockerModule } from './docker';
import { mlModule } from './ml';
import { devopsModule } from './devops';
import { kubernetesModule } from './kubernetes';
import { dataScienceModule } from './datascience';
import { tensorflowModule } from './tensorflow';

export const allModules: Module[] = [
  pythonModule,
  fastapiModule,
  sqlalchemyModule,
  dataScienceModule,
  mlModule,
  tensorflowModule,
  dockerModule,
  kubernetesModule,
  devopsModule,
];

export type { Module } from '../types';
