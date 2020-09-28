import {DefaultCrudRepository} from '@loopback/repository';
import {Unvandegisimleritarihcesi, UnvandegisimleritarihcesiRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UnvandegisimleritarihcesiRepository extends DefaultCrudRepository<
  Unvandegisimleritarihcesi,
  typeof Unvandegisimleritarihcesi.prototype.id,
  UnvandegisimleritarihcesiRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Unvandegisimleritarihcesi, dataSource);
  }
}
