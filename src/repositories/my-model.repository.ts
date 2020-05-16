import {DefaultCrudRepository} from '@loopback/repository';
import {MyModel, MyModelRelations} from '../models';
import {PgDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MyModelRepository extends DefaultCrudRepository<
  MyModel,
  typeof MyModel.prototype.id,
  MyModelRelations
> {
  constructor(
    @inject('datasources.pg') dataSource: PgDataSource,
  ) {
    super(MyModel, dataSource);
  }
}
