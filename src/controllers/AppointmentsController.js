/* eslint-disable quotes */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable camelcase */
import db from '../models';
import { sendErrorResponse, sendSuccessResponse } from '../utils/sendResponse';
import { verifyToken } from '../utils/processToken';

const { Appointments } = db;

const AppointmentsController = {

  async getAll(req, res) {
    try {
      const { uuid, role } = await verifyToken(req.params.token);
      let query = '';
      if (role === 'consultant') {
        query = 'SELECT "Appointments"."dateTime", "Users"."firstName", "Users"."surName", "Users"."role", "Users"."gender", "Users"."stateOfOrigin", "Users"."nationality", "Users"."avatar", "Users"."phone", "Users"."email", "Users"."address"  FROM "Appointments" INNER JOIN "Users" ON "Appointments"."patient_uuid" = "Users"."uuid" AND "Appointments"."consultant_uuid" = ? WHERE "Appointments"."dateTime" IS NOT NULL ';
      } else {
        query = 'SELECT "Appointments"."dateTime", "Users"."firstName", "Users"."surName", "Users"."role", "Users"."gender", "Users"."stateOfOrigin", "Users"."nationality", "Users"."avatar", "Users"."phone", "Users"."email", "Users"."address"  FROM "Appointments" INNER JOIN "Users" ON "Appointments"."consultant_uuid" = "Users"."uuid" AND "Appointments"."patient_uuid" = ? WHERE "Appointments"."dateTime" IS NOT NULL  ';
      }

      const appointments = await db.sequelize.query(
        query,
        {
          replacements: [uuid],
          type: db.sequelize.QueryTypes.SELECT
        }
      );
      if (!appointments) return sendErrorResponse(res, 404, 'You do not have an appointment scheduled!!');
      return sendSuccessResponse(res, 200, appointments);
    } catch (e) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  },
  async book(req, res) {
    try {
      const { uuid } = await verifyToken(req.params.token);
      const { consultant_uuid, date_time } = req.body;
      await Appointments.create({
        consultant_uuid, dateTime: date_time, patient_uuid: uuid, status: 'upcoming'
      });
      return sendSuccessResponse(res, 200, 'Appointment booking successful');
    } catch (error) {
      return sendErrorResponse(res, 500, 'INTERNAL SERVER ERROR');
    }
  }
};

export default AppointmentsController;
