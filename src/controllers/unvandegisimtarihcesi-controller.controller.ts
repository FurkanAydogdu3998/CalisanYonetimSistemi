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
import {Unvandegisimleritarihcesi} from '../models';
import {UnvandegisimleritarihcesiRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class UnvandegisimtarihcesiControllerController {
  constructor(
    @repository(UnvandegisimleritarihcesiRepository)
    public unvandegisimleritarihcesiRepository : UnvandegisimleritarihcesiRepository,
  ) {}

  @post('/unvandegisimleritarihcesi', {
    responses: {
      '200': {
        description: 'Unvan Degisim Bilgisi Eklemeyi Saglayan Servis',
        content: {'application/json': {schema: getModelSchemaRef(Unvandegisimleritarihcesi)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unvandegisimleritarihcesi, {
            title: 'NewUnvandegisimleritarihcesi',
            exclude: ['id'],
          }),
        },
      },
    })
    unvandegisimleritarihcesi: Omit<Unvandegisimleritarihcesi, 'id'>,
  ): Promise<Unvandegisimleritarihcesi> {
    return this.unvandegisimleritarihcesiRepository.create(unvandegisimleritarihcesi);
  }

  @get('/unvandegisimleritarihcesi/count', {
    responses: {
      '200': {
        description: 'Unvandegisimleritarihcesi model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Unvandegisimleritarihcesi) where?: Where<Unvandegisimleritarihcesi>,
  ): Promise<Count> {
    return this.unvandegisimleritarihcesiRepository.count(where);
  }

  @get('/unvandegisimleritarihcesi', {
    responses: {
      '200': {
        description: 'Unvan Degisim Bilgilerini Listeleyen Servis',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Unvandegisimleritarihcesi, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Unvandegisimleritarihcesi) filter?: Filter<Unvandegisimleritarihcesi>,
  ): Promise<Unvandegisimleritarihcesi[]> {
    return this.unvandegisimleritarihcesiRepository.find(filter);
  }

  @patch('/unvandegisimleritarihcesi', {
    responses: {
      '200': {
        description: 'Unvandegisimleritarihcesi PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unvandegisimleritarihcesi, {partial: true}),
        },
      },
    })
    unvandegisimleritarihcesi: Unvandegisimleritarihcesi,
    @param.where(Unvandegisimleritarihcesi) where?: Where<Unvandegisimleritarihcesi>,
  ): Promise<Count> {
    return this.unvandegisimleritarihcesiRepository.updateAll(unvandegisimleritarihcesi, where);
  }

  @get('/unvandegisimleritarihcesi/{id}', {
    responses: {
      '200': {
        description: 'Unvandegisimleritarihcesi model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Unvandegisimleritarihcesi, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Unvandegisimleritarihcesi, {exclude: 'where'}) filter?: FilterExcludingWhere<Unvandegisimleritarihcesi>
  ): Promise<Unvandegisimleritarihcesi> {
    return this.unvandegisimleritarihcesiRepository.findById(id, filter);
  }

  @patch('/unvandegisimleritarihcesi/{id}', {
    responses: {
      '204': {
        description: 'Belirli Bir Unvan Degisim Bilgisini Guncelleyen Servis',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unvandegisimleritarihcesi, {partial: true}),
        },
      },
    })
    unvandegisimleritarihcesi: Unvandegisimleritarihcesi,
  ): Promise<void> {
    await this.unvandegisimleritarihcesiRepository.updateById(id, unvandegisimleritarihcesi);
  }

  @put('/unvandegisimleritarihcesi/{id}', {
    responses: {
      '204': {
        description: 'Unvandegisimleritarihcesi PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() unvandegisimleritarihcesi: Unvandegisimleritarihcesi,
  ): Promise<void> {
    await this.unvandegisimleritarihcesiRepository.replaceById(id, unvandegisimleritarihcesi);
  }

  @del('/unvandegisimleritarihcesi/{id}', {
    responses: {
      '204': {
        description: 'Unvandegisimleritarihcesi DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.unvandegisimleritarihcesiRepository.deleteById(id);
  }
}
