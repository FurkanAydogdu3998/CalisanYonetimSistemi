import {
  AnyObject,
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
import {Calisan} from '../models';
import {CalisanRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class CalisanControllerController {
  constructor(
    @repository(CalisanRepository)
    public calisanRepository : CalisanRepository,
  ) {}

  @post('/calisanekle', {
    responses: {
      '200': {
        description: 'Yeni Calisan Ekleme İslemini Gerceklestiren Servis',
        content: {'application/json': {schema: getModelSchemaRef(Calisan)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Calisan, {
            title: 'NewCalisan',
            exclude: ['id'],
          }),
        },
      },
    })
    calisan: Omit<Calisan, 'id'>,
  ): Promise<Calisan> {
    return this.calisanRepository.create(calisan);
  }

  @get('/calisanlarilistele', {
    responses: {
      '200': {
        description: 'Sirketin Calisanlarini Listeleyen Servis',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Calisan, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Calisan) filter?: Filter<Calisan>,
  ): Promise<Calisan[]> {
    return this.calisanRepository.find(filter);
  }

  @patch('/calisanguncelle/{id}', {
    responses: {
      '204': {
        description: 'Bir Calisana Ait Bilgileri Guncelleyen Servis',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Calisan, {partial: true}),
        },
      },
    })
    calisan: Calisan,
  ): Promise<void> {
    await this.calisanRepository.updateById(id, calisan);
  }

  @get('yoneticilerincalisanlari', {
    responses: {
      '200': {
        description: 'Yoneticilerin Calisanlarini Listeleyen Servis',
      },
    },
  })
  async yoneticilerinCalisanlari(): Promise<AnyObject> {
    interface MyObj {
      ad: string;
      soyad: string;
      yoneticisi: string;
    }
    interface MyObj1 {
      yonetici: string;
      calisanlari: Array<string>;
    }
    let calisanVerileri: MyObj[] = JSON.parse(JSON.stringify(await this.calisanRepository.find({
      fields: {
        yoneticisi: true,
        ad: true,
        soyad: true,
      }
    })));
    let yoneticilerinCalisanlari: MyObj1[] = JSON.parse('[{"yonetici": "deneme", "calisanlari": ["deneme"]}]');
    yoneticilerinCalisanlari.shift();
    let yoneticiler: Array<string> = ['deneme'];
    for(let i: number = 0; i < calisanVerileri.length; i++) {
      if(i == 0) {
        yoneticiler[0] = calisanVerileri[i].yoneticisi;
      }
      else {
        if(!(yoneticiler.includes(calisanVerileri[i].yoneticisi))) {
          yoneticiler.push(calisanVerileri[i].yoneticisi);
        }
      }
    }
    for(let i: number = 0; i < yoneticiler.length; i++) {
      let yoneticiyeAitCalisanlar: Array<string> = ['deneme'];
      yoneticiyeAitCalisanlar.shift();
      for(let j: number = 0; j < calisanVerileri.length; j++) {
        if(yoneticiler[i] == calisanVerileri[j].yoneticisi) {
          yoneticiyeAitCalisanlar.push(calisanVerileri[j].ad + ' ' + calisanVerileri[j].soyad);
        }
      }
      yoneticilerinCalisanlari.push({
        yonetici: yoneticiler[i],
        calisanlari: yoneticiyeAitCalisanlar,
      });
    }
    return yoneticilerinCalisanlari;
  }

  @get('departmanmaasortalamalari', {
    responses: {
      '200': {
        description: 'Departmanlarin Maas Ortalamalarini Hesaplayan Servis',
      },
    },
  })
  async departmanMaasOrtalamalari(): Promise<AnyObject> {
    interface MyObj {
      departman: string;
      maas: number;
    }
    interface MyObj1 {
      departman_adi: string;
      maas_ortalamasi: number; 
    }
    let calisanVerileri: MyObj[] = JSON.parse(JSON.stringify(await this.calisanRepository.find({
      fields: {
        departman: true,
        maas: true
      }
    })));
    let departmanMaasOrtalamalari: MyObj1[] = JSON.parse('[{"departman_adi": "Yazilim Gelistirme Departmani", "maas_ortalamasi": 2000}]');
    departmanMaasOrtalamalari.shift();
    let hesaplananDepartmanlarListesi: Array<string> = ['deneme'];
    hesaplananDepartmanlarListesi.shift();
    let maasToplami: number = 0;
    let departmandakiKisiSayisi: number = 0;
    for(let i: number = 0; i < calisanVerileri.length; i++) {
      if(!(hesaplananDepartmanlarListesi.includes(calisanVerileri[i].departman))) {
        maasToplami = 0;
        departmandakiKisiSayisi = 0;
        for(let j: number = 0; j < calisanVerileri.length; j++) {
          if(calisanVerileri[i].departman == calisanVerileri[j].departman) {
            maasToplami = maasToplami + calisanVerileri[j].maas;
            departmandakiKisiSayisi = departmandakiKisiSayisi + 1;
          }
        }
        departmanMaasOrtalamalari.push({
          departman_adi: calisanVerileri[i].departman,
          maas_ortalamasi: maasToplami/departmandakiKisiSayisi,
        });
        hesaplananDepartmanlarListesi.push(calisanVerileri[i].departman);
      }
    }
    return departmanMaasOrtalamalari;
  }

  /*@get('/calisan/count', {
    responses: {
      '200': {
        description: 'Calisan model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Calisan) where?: Where<Calisan>,
  ): Promise<Count> {
    return this.calisanRepository.count(where);
  }*/

  /*@patch('/calisan', {
    responses: {
      '200': {
        description: 'Calisan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Calisan, {partial: true}),
        },
      },
    })
    calisan: Calisan,
    @param.where(Calisan) where?: Where<Calisan>,
  ): Promise<Count> {
    return this.calisanRepository.updateAll(calisan, where);
  }*/

  /*@get('/calisan/{id}', {
    responses: {
      '200': {
        description: 'Calisan model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Calisan, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Calisan, {exclude: 'where'}) filter?: FilterExcludingWhere<Calisan>
  ): Promise<Calisan> {
    return this.calisanRepository.findById(id, filter);
  }*/

  /*@put('/calisan/{id}', {
    responses: {
      '204': {
        description: 'Calisan PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() calisan: Calisan,
  ): Promise<void> {
    await this.calisanRepository.replaceById(id, calisan);
  }*/

  /*@del('/calisan/{id}', {
    responses: {
      '204': {
        description: 'Calisan DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.calisanRepository.deleteById(id);
  }*/
}
