import {Entity, model, property} from '@loopback/repository';

@model(
  {
    settings: {
      postgresql: {
        table: 'CALISAN_BILGILERI',
      },
      foreignKeys: {
        fk_db_departmanAdi: {
          name: 'fk_db_departmanAdi',
          entity: 'Departman',
          entityKey: 'departman_adi',
          foreignKey: 'DEPARTMAN',
        },
      },
    },
  }
)
export class Calisan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'id',
    },
  })
  id?: number;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'AD',
    },
  })
  ad?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'SOYAD',
    },
  })
  soyad?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'EPOSTA',
    },
  })
  eposta?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'TELEFON',
    },
  })
  telefon?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'ISE_GIRIS_TARIHI',
    },
  })
  isegiristarihi?: string;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'MAAS',
    },
  })
  maas?: number;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'DEPARTMAN',
    },
  })
  departman?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'UNVAN',
    },
  })
  unvan?: string;

  @property({
    type: 'string',
    postgresql: {
      columnName: 'YONETICISI',
    },
  })
  yoneticisi?: string;


  constructor(data?: Partial<Calisan>) {
    super(data);
  }
}

export interface CalisanRelations {
  // describe navigational properties here
}

export type CalisanWithRelations = Calisan & CalisanRelations;
