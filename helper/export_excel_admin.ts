import { excelInserter } from '../helper/excel_inserter';
import * as moment from 'moment';
import * as path from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

export async function generateExcel(data, type) {
  try {
    const filename = `${moment().format('YYYYMMDDHHMM')}-${type}.xlsx`;
    const filepath = path.join(__dirname + '../../../uploads/excel/', filename);
    console.log(data,"ini datanya")
    await DataToExcel(filepath, data, type);
    return filename;
  }catch (e) {
    console.log(e,'generateExcel')
    throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

}

const hitLogApiData = [
  {
    title: 'nama_event',
    dataIndex: 'nama_event',
    width: 20,
  },
  {
    title: 'tanggal_event',
    dataIndex: 'tanggal_event',
    width: 20,
  },
  {
    title: 'alamat',
    dataIndex: 'alamat',
    width: 20,
  },
//   {
//     title: 'total_tiket_terjual',
//     dataIndex: 'total_tiket_terjual',
//     width: 20,
//   },
];



async function setDataHitLogApi(dataHitLogApi) {
  try {
    const dataFiltered = [];

    await dataHitLogApi.forEach((element) => {
      const filterElement = [];

      filterElement['nama_event'] = element?.nama;
      filterElement['tanggal_event'] = element?.tanggalEvent;
      filterElement['alamat'] = element?.alamat;
      filterElement['total_tiket_terjual'] = element?.totalTiketTerjual;

      dataFiltered.push(filterElement);
    });

    return dataFiltered;
  } catch (e) {
    console.log(e, 'setDataHitLogAPI');
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export async function DataToExcel(filepath, data, type) {
  try {
    if (type === 'admin') {
      const dataFiltered = await setDataHitLogApi(data);

      await excelInserter({
        filename: filepath,
        sheets: [
          {
            name: 'Data Hit Log Api',
            startRowFrom: 1,
            headers: hitLogApiData,
            data: dataFiltered,
          },
        ],
      });
    } else if (type === 'XXX 1') {
      //kode yang sama tapi beda set header dan data nya
    } else if (type === 'Customer-Register') {
      //kode yang sama tapi beda set header dan data nya
    } else if (type === 'Summary-Services') {
      //kode yang sama tapi beda set header dan data nya
    } else if (type === 'Top-Rate') {
      //kode yang sama tapi beda set header dan data nya
    }
  } catch (e) {
    console.log(e, 'dataToExcel');
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
