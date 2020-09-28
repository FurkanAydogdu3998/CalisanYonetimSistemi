import {DefaultCrudRepository} from '@loopback/repository';
import {Departman, DepartmanRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DepartmanRepository extends DefaultCrudRepository<
  Departman,
  typeof Departman.prototype.departmanadi,
  DepartmanRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Departman, dataSource);
  }
}
