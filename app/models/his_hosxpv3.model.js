"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HisHosxpv3Model {
    getHospital(db) {
        return db('opdconfig as o')
            .select('o.hospitalcode as hcode', 'o.hospitalname as hname');
    }
    getServices(db, hn, dateServe) {
        return db('ovst as v')
            .select(db.raw(`v.vstdate as date_serve, v.vsttime as time_serve, k.department as clinic,
          v.vn as seq, v.vn`))
            .innerJoin('kskdepartment as k', 'k.depcode', 'v.main_dep')
            .where('v.hn', hn)
            .where('v.vstdate', dateServe);
    }
    getAllergyDetail(db, hn) {
        return db('opd_allergy')
            .select('agent as drug_name', 'symptom')
            .where('hn', hn);
    }
    getDisease(db, hn) {
        return db('person_chronic as pc')
            .select('pc.regdate as start_date', 'pc.icd10 as icd10_code', 'i.name as icd_name')
            .leftOuterJoin('person as pe', 'pe.person_id', '=', 'pc.person_id')
            .leftOuterJoin('patient as pa', 'pa.cid', '=', 'pe.cid')
            .leftOuterJoin('icd101 as i', 'i.code', '=', 'pc.icd10')
            .where('pa.hn', hn);
    }
    getDiagnosis(db, vn) {
        return db('ovstdiag as o')
            .select('o.vn', 'o.vstdate as date_serv', 'o.vsttime as time_serv', 'o.icd10 as icd10_code', 'i.name as icd10_desc', 't.name as diag_type')
            .leftOuterJoin('icd101 as i', 'i.code', '=', 'o.icd10')
            .leftOuterJoin('diagtype as t', 't.diagtype', 'o.diagtype')
            .where('vn', vn);
    }
    getProcedure(db, vn) {
        return db.raw(`SELECT d.er_oper_code as procedure_code,e.name as procedure_name,date(d.begin_date_time) as start_date, 
    time(d.begin_date_time) as start_time,
    date(d.end_date_time) as end_date,TIME(d.end_date_time) as end_time
    FROM doctor_operation as d
    LEFT OUTER JOIN ovst o on o.vn=d.vn
    LEFT OUTER JOIN er_oper_code as e on e.er_oper_code=d.er_oper_code
    WHERE o.hn = '?'
    UNION
    SELECT e.er_oper_code as procedure_code,c.name as procedure_name,o.vstdate as start_date, 
    time(e.begin_time) as start_time,o.vstdate as end_date,TIME(e.end_time) as end_date
    FROM er_regist_oper as e
    LEFT OUTER JOIN ovst o on o.vn=e.vn
    LEFT OUTER JOIN er_oper_code as c on c.er_oper_code=e.er_oper_code
    WHERE o.hn = '?'
    `);
    }
    getRefer(db, vn) {
        return db('referout as r')
            .select('o.vn as seq', 'o.vstdate as date_serv', 'o.vsttime as time_serv', 'r.refer_hospcode as to_provider_code', 'h.name as to_provider_name', 'c.name as refer_cause')
            .innerJoin('refer_cause as c', 'c.id', 'r.refer_cause')
            .innerJoin('ovst as o ', 'o.vn', 'r.vn')
            .innerJoin('hospcode as h', 'h.hospcode', 'r.refer_hospcode')
            .where('r.vn', vn);
    }
    getDrugs(db, vn) {
        return db('opitemrece as o')
            .select('o.vn', 'o.vstdate as date_serv', 'o.vsttime as time_serv', 'o.icode as drugcode', 's.name as drug_name', 'o.qty', 's.units as unit', 'u.name1 as usage_line1', 'u.name2 as usage_line2', 'u.name3 as usage_line3')
            .innerJoin('s_drugitems as s', 's.icode', 'o.icode')
            .innerJoin('drugusage as u', 'u.drugusage', 'o.drugusage')
            .where('o.vn', vn);
    }
    getLabs(db, vn) {
        return db('lab_order as l')
            .select('o.vstdate as date_serv', 'o.vsttime as time_serv', 'o.vn', 'l.lab_items_name_ref as lab_name', 'l.lab_order_result as lab_result', 'l.lab_items_normal_value_ref as standard_resul')
            .innerJoin('lab_head as h', 'h.lab_order_number', 'l.lab_order_number')
            .innerJoin('ovst as o', 'o.vn', 'h.vn')
            .where('h.vn', vn);
    }
    getVaccine(db, hn) {
        return db('person_vaccine_list as l')
            .select(db.raw(`l.vaccine_date as date_serve,'' as time_serve,v.vaccine_code,v.vaccine_name`))
            .innerJoin('person as p', 'p.person_id', 'l.person_id')
            .innerJoin('patient as e', 'e.cid', 'p.cid')
            .innerJoin('ovst as o', 'o.hn', 'e.hn')
            .innerJoin('person_vaccine as v', 'v.person_vaccine_id', 'l.person_vaccine_id')
            .where('o.hn', hn)
            .union(function () {
            this.select(db.raw(`o.vstdate as date_serve,o.vsttime as time_serve,v.vaccine_code,v.vaccine_name`))
                .innerJoin('ovst as o', 'o.vn', 'l.vn')
                .innerJoin('person_vaccine as v', 'v.person_vaccine_id', 'l.person_vaccine_id')
                .from('ovst_vaccine as l')
                .where('o.hn', hn);
        });
    }
    getAppointment(db, vn) {
        return db('oapp as o')
            .select('o.vn', 'v.vstdate as date_serv', 'v.vsttime as time_serv', 'c.name as department', 'o.nextdate as date', 'o.nexttime as time', 'o.app_cause as detail')
            .innerJoin('ovst as v', 'v.vn', 'o.vn')
            .innerJoin('clinic as c', 'c.clinic', 'o.clinic')
            .where('o.vn', vn);
    }
}
exports.HisHosxpv3Model = HisHosxpv3Model;
//# sourceMappingURL=his_hosxpv3.model.js.map