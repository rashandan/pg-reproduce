import {Entity, model, property} from '@loopback/repository';

@model()
export class MyModel extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  someArray?: string[];


  constructor(data?: Partial<MyModel>) {
    super(data);
  }
}

export interface MyModelRelations {
  // describe navigational properties here
}

export type MyModelWithRelations = MyModel & MyModelRelations;
