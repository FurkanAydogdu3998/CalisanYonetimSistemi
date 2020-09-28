import {Entity, model, property} from '@loopback/repository';

@model(
  {
    settings: {
      postgresql: {
        table: 'LOKASYON_BILGILERI',
      },
    },
  }
)
export class Lokasyon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    postgresql: {
      columnName: 'lokasyon_adi',
    },
  })
  lokasyonadi?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'LOKASYON_ADRESI',
    },
  })
  adresi?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'POSTA_KODU',
    },
  })
  postakodu?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'SEHIR',
    },
  })
  sehir?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'ULKE',
    },
  })
  ulke?: string;


  constructor(data?: Partial<Lokasyon>) {
    super(data);
  }
}

export interface LokasyonRelations {
  // describe navigational properties here
}

export type LokasyonWithRelations = Lokasyon & LokasyonRelations;
