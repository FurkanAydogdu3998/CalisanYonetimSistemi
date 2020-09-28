import {DefaultCrudRepository} from '@loopback/repository';
import {Lokasyon, LokasyonRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class LokasyonRepository extends DefaultCrudRepository<
  Lokasyon,
  typeof Lokasyon.prototype.lokasyonadi,
  LokasyonRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Lokasyon, dataSource);
  }
}
