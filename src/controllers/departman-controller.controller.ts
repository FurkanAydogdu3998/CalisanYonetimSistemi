import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Departman} from '../models';
import {DepartmanRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class DepartmanControllerController {
  constructor(
    @repository(DepartmanRepository)
    public departmanRepository : DepartmanRepository,
  ) {}

  @post('/departman', {
    responses: {
      '200': {
        description: 'Departman Eklemeyi Saglayan Servis',
        content: {'application/json': {schema: getModelSchemaRef(Departman)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departman, {
            title: 'NewDepartman',
            
          }),
        },
      },
    })
    departman: Departman,
  ): Promise<Departman> {
    return this.departmanRepository.create(departman);
  }

  @get('/departman/count', {
    responses: {
      '200': {
        description: 'Departman model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Departman) where?: Where<Departman>,
  ): Promise<Count> {
    return this.departmanRepository.count(where);
  }

  @get('/departman', {
    responses: {
      '200': {
        description: 'Departmanlari Listeleyen Servis',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Departman, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Departman) filter?: Filter<Departman>,
  ): Promise<Departman[]> {
    return this.departmanRepository.find(filter);
  }

  @patch('/departman', {
    responses: {
      '200': {
        description: 'Departman PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departman, {partial: true}),
        },
      },
    })
    departman: Departman,
    @param.where(Departman) where?: Where<Departman>,
  ): Promise<Count> {
    return this.departmanRepository.updateAll(departman, where);
  }

  @get('/departman/{id}', {
    responses: {
      '200': {
        description: 'Departman model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Departman, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Departman, {exclude: 'where'}) filter?: FilterExcludingWhere<Departman>
  ): Promise<Departman> {
    return this.departmanRepository.findById(id, filter);
  }

  @patch('/departman/{id}', {
    responses: {
      '204': {
        description: 'Belirli Bir Departmanin Bilgilerini Guncelleyen Servis',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departman, {partial: true}),
        },
      },
    })
    departman: Departman,
  ): Promise<void> {
    await this.departmanRepository.updateById(id, departman);
  }

  @put('/departman/{id}', {
    responses: {
      '204': {
        description: 'Departman PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() departman: Departman,
  ): Promise<void> {
    await this.departmanRepository.replaceById(id, departman);
  }

  @del('/departman/{id}', {
    responses: {
      '204': {
        description: 'Departman DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.departmanRepository.deleteById(id);
  }
}
