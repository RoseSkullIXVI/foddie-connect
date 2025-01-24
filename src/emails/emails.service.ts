import { BadRequestException, Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailsService {
    constructor() {}

   async sendResetPasswordEmail(link:string , Email:string){
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: 465,
                auth:{
                    user : process.env.EMAIL_USERNAME,
                    pass : process.env.EMAIL_PASSWORD,
                },
            });
            
            const htmlBody = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }
                        a {
                            background-color: #28a745;
                            color: white;
                            padding: 10px 15px;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        a:hover {
                            background-color: #218838;
                        }
                    </style>
                </head>
                <body>
                    <p>You requested to reset your password.</p>
                    <p>Please, click the link below to reset your password:</p> 
                    <a href="${link}">Reset Password</a>
                    <p>If you did not request this, please ignore this email.</p>
                    <p>Thank you,</p>
                    <p>Foodie Connect</p>
                </body>
            </html>
          `;

          await transporter.sendMail({
            from: `"Foodie Connect" <${process.env.FROM_EMAIL}>`, // Sender info
            to: Email, // Recipient
            subject: 'Password Reset Request', // Email subject
            html: htmlBody, // Email body
          });

        }catch(er){
            throw new BadRequestException("The email was not sent succesfully")
        }
        
        
    }
}
