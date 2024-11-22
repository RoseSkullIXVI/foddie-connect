import { Injectable } from '@nestjs/common';
const nodemailer = require("nodemailer");

@Injectable()
export class EmailsService {
    constructor() {}
    const transporter =  nodemailer.createTransport();
}
