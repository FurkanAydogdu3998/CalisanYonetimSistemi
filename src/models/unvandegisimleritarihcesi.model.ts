import {Entity, model, property} from '@loopback/repository';

@model(
  {
    settings: {
      postgresql: {
        table: 'UNVAN_DEGISIM_BILGILERI',
      },
      foreignKeys: {
        fk_cb_id: {
          name: 'fk_db_id',
          entity: 'Calisan',
          entityKey: 'id',
          foreignKey: 'CALISAN_ID',
        },
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
export class Unvandegisimleritarihcesi extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    postgresql: {
      columnName: 'ID',
    },
  })
  id?: number;

  @property({
    type: 'number',
    postgresql: {
      columnName: 'CALISAN_ID',
    },
  })
  calisanid?: number;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'BASLANGIC_TARIHI',
    },
  })
  baslangictarihi?: string;

  @property({
    type: 'date',
    postgresql: {
      columnName: 'BITIS_TARIHI',
    },
  })
  bitistarihi?: string;

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
      columnName: 'DEPARTMAN',
    },
  })
  departman?: string;


  constructor(data?: Partial<Unvandegisimleritarihcesi>) {
    super(data);
  }
}

export interface UnvandegisimleritarihcesiRelations {
  // describe navigational properties here
}

export type UnvandegisimleritarihcesiWithRelations = Unvandegisimleritarihcesi & UnvandegisimleritarihcesiRelations;
