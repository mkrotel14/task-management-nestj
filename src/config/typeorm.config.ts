import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '172.20.0.2',
  port: 5432,
  username: 'postgres',
  password: 't3cn0sp33d@00550',
  database: 'taskmanagement',
  autoLoadEntities: true,
  synchronize: true,
};
