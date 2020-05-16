import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {MyModel} from '../models';
import {MyModelRepository} from '../repositories';

export class MyControllerController {
  constructor(
    @repository(MyModelRepository)
    public myModelRepository : MyModelRepository,
  ) {}

  @post('/my-models', {
    responses: {
      '200': {
        description: 'MyModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(MyModel)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyModel, {
            title: 'NewMyModel',
            exclude: ['id'],
          }),
        },
      },
    })
    myModel: Omit<MyModel, 'id'>,
  ): Promise<MyModel> {
    return this.myModelRepository.create(myModel);
  }

  @get('/my-models/count', {
    responses: {
      '200': {
        description: 'MyModel model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(MyModel)) where?: Where<MyModel>,
  ): Promise<Count> {
    return this.myModelRepository.count(where);
  }

  @get('/my-models', {
    responses: {
      '200': {
        description: 'Array of MyModel model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MyModel, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(MyModel)) filter?: Filter<MyModel>,
  ): Promise<MyModel[]> {
    return this.myModelRepository.find(filter);
  }

  @patch('/my-models', {
    responses: {
      '200': {
        description: 'MyModel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyModel, {partial: true}),
        },
      },
    })
    myModel: MyModel,
    @param.query.object('where', getWhereSchemaFor(MyModel)) where?: Where<MyModel>,
  ): Promise<Count> {
    return this.myModelRepository.updateAll(myModel, where);
  }

  @get('/my-models/{id}', {
    responses: {
      '200': {
        description: 'MyModel model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MyModel, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(MyModel)) filter?: Filter<MyModel>
  ): Promise<MyModel> {
    return this.myModelRepository.findById(id, filter);
  }

  @patch('/my-models/{id}', {
    responses: {
      '204': {
        description: 'MyModel PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MyModel, {partial: true}),
        },
      },
    })
    myModel: MyModel,
  ): Promise<void> {
    await this.myModelRepository.updateById(id, myModel);
  }

  @put('/my-models/{id}', {
    responses: {
      '204': {
        description: 'MyModel PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() myModel: MyModel,
  ): Promise<void> {
    await this.myModelRepository.replaceById(id, myModel);
  }

  @del('/my-models/{id}', {
    responses: {
      '204': {
        description: 'MyModel DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.myModelRepository.deleteById(id);
  }
}
