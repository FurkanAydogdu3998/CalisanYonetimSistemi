import {DefaultCrudRepository} from '@loopback/repository';
import {Calisan, CalisanRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CalisanRepository extends DefaultCrudRepository<
  Calisan,
  typeof Calisan.prototype.id,
  CalisanRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Calisan, dataSource);
  }
}
