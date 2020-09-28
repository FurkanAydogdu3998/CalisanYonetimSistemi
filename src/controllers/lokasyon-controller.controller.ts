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
import {Lokasyon} from '../models';
import {LokasyonRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class LokasyonControllerController {
  constructor(
    @repository(LokasyonRepository)
    public lokasyonRepository : LokasyonRepository, 
  ) {}

  @post('/lokasyon', {
    responses: {
      '200': {
        description: 'Lokasyon Eklemeyi Saglayan Servis',
        content: {'application/json': {schema: getModelSchemaRef(Lokasyon)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lokasyon, {
            title: 'NewLokasyon',
            
          }),
        },
      },
    })
    lokasyon: Lokasyon,
  ): Promise<Lokasyon> {
    return this.lokasyonRepository.create(lokasyon);
  }

  @get('/lokasyon/count', {
    responses: {
      '200': {
        description: 'Lokasyon model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Lokasyon) where?: Where<Lokasyon>,
  ): Promise<Count> {
    return this.lokasyonRepository.count(where);
  }

  @get('/lokasyon', {
    responses: {
      '200': {
        description: 'Lokasyonlari Listeleyen Servis',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Lokasyon, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Lokasyon) filter?: Filter<Lokasyon>,
  ): Promise<Lokasyon[]> {
    return this.lokasyonRepository.find(filter);
  }

  @patch('/lokasyon', {
    responses: {
      '200': {
        description: 'Lokasyon PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lokasyon, {partial: true}),
        },
      },
    })
    lokasyon: Lokasyon,
    @param.where(Lokasyon) where?: Where<Lokasyon>,
  ): Promise<Count> {
    return this.lokasyonRepository.updateAll(lokasyon, where);
  }

  @get('/lokasyon/{id}', {
    responses: {
      '200': {
        description: 'Lokasyon model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Lokasyon, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Lokasyon, {exclude: 'where'}) filter?: FilterExcludingWhere<Lokasyon>
  ): Promise<Lokasyon> {
    return this.lokasyonRepository.findById(id, filter);
  }

  @patch('/lokasyon/{id}', {
    responses: {
      '204': {
        description: 'Belirli Bir Lokasyonun Bilgilerini Guncelleyen Servis',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lokasyon, {partial: true}),
        },
      },
    })
    lokasyon: Lokasyon,
  ): Promise<void> {
    await this.lokasyonRepository.updateById(id, lokasyon);
  }

  @put('/lokasyon/{id}', {
    responses: {
      '204': {
        description: 'Lokasyon PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lokasyon: Lokasyon,
  ): Promise<void> {
    await this.lokasyonRepository.replaceById(id, lokasyon);
  }

  @del('/lokasyon/{id}', {
    responses: {
      '204': {
        description: 'Lokasyon DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.lokasyonRepository.deleteById(id);
  }
}
