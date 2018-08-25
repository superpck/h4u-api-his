import Knex = require('knex');
const dbName = process.env.DB_NAME;

// ตัวอย่าง query แบบ knex
// getHospital(db: Knex) {
//   return db('opdconfig as o')
//     .select('o.hospitalcode as hcode', 'o.hospitalname as hname')
// }
// ตัวอย่างการคิวรี่โดยใช้ raw MySqlConnectionConfig
// async getHospital(db: Knex) {
//   let data = await knex.raw(`select * from opdconfig`);
// return data[0];
// }
export class HisModel {
  getTableName(knex: Knex) {
    return knex
      .select('TABLE_NAME')
      .from('information_schema.tables')
      .where('TABLE_SCHEMA', '=', dbName);
  }

  getHospital(db: Knex) {
    // ชื่อสถานพยาบาล
    // return [{provider_code:'',provider_name:''}]
  }

  getAllergyDetail(db: Knex, hn: any) {
    // แพ้ยา
    // return [{drug_name:'',symptom:''}]
  }

  getChronic(db: Knex, hn: any) {
    // แพ้ยา โรคเรื้อรัง
    // return [{icd_code:'',icd_desc:'',start_date:''}]
  }


  getDiagnosis(db: Knex, hn: any, seq: any) {
    // return [{icd_code:'',icd_desc:'',diage_type:''}]
  }

  getRefer(db: Knex, hn: any, seq: any) {
    // return [{hcode_to:'',name_to:'',reason:''}]
  }


  getDrugs(db: Knex, hn: any, seq: any) {
    // return [{drug_name:'',qty:'',unit:'',usage_line1:'',usage_line2:'',usage_line3:''}]
  }

  getLabs(db: Knex, hn: any, seq: any) {
    // return [{lab_name:'',lab_result:'',standard_result:'',seq:'',time_serv:'',date_serve:''}]
  }


  getAppointment(db: Knex, hn: any, seq: any) {
    // return [{date:'',time:'',department:'',detail:''}]
  }

  getVaccine(db: Knex, hn: any) {
    // return [{date_serve:'',time_serve:'',vaccine_code:'',vaccine_name:''}]]
  }

}