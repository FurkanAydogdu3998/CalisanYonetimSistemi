import {Entity, model, property} from '@loopback/repository';

@model(
  {
    settings: {
      postgresql: {
        table: 'DEPARTMAN_BILGILERI',
      },
      foreignKeys: {
        fk_lb_lokasyonAdi: {
          name: 'fk_db_lokasyonAdi',
          entity: 'Lokasyon',
          entityKey: 'lokasyon_adi',
          foreignKey: 'DEPARTMAN_LOKASYONU',
        },
      },
    },
  }
)
export class Departman extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    postgresql: {
      columnName: 'departman_adi',
    },
  })
  departmanadi?: String;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'DEPARTMAN_YONETICISI',
    },
  })
  yoneticisi?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'DEPARTMAN_LOKASYONU',
    },
  })
  lokasyonu?: string;


  constructor(data?: Partial<Departman>) {
    super(data);
  }
}

export interface DepartmanRelations {
  // describe navigational properties here
}

export type DepartmanWithRelations = Departman & DepartmanRelations;
